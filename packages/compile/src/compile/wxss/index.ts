import fse from 'fs-extra'; 
import { getTargetPath, getWorkPath } from '../../env';
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

export async function compileWxss(moduleDeps) {
  let cssMergeCode = await getCompileCssCode({
    path: 'app',
    moduleId: '',
  });
  for (const path in moduleDeps) {
    cssMergeCode += await getCompileCssCode({
      path,
      moduleId: moduleDeps[path].moduleId,
    });
  }

  fse.writeFileSync(`${getTargetPath()}/style.css`, cssMergeCode);
}

async function getCompileCssCode(opts) {
  const { path, moduleId } = opts;
  const workPath = getWorkPath();
  const wxssFullPath = `${workPath}/${path}.wxss`;

  const wxssCode = fse.readFileSync(wxssFullPath, 'utf-8');
  // 转化样式文件为抽象语法树
  const ast = postcss.parse(wxssCode);
  ast.walk((node) => {
    if (node.type === 'rule') {
      node.walkDecls((decl) => {
        // 转化rpx单位为rem单位
        decl.value = decl.value.replace(/rpx/g, 'rem');
      })
    }
  });

  const tranUnitCode = ast.toResult().css;
  // 对转化后的样式代码添加厂商前缀
  const result = await transCode(tranUnitCode, moduleId);
  return result;
}

// 对css代码进行转化，添加厂商前缀，添加scopeId进行样式隔离
function transCode(cssCode, moduleId) {
  return new Promise<string>((resolve) => {
    postcss([
      addScopeId({ moduleId }),
      autoprefixer({ overrideBrowserslist: ['cover 99.5%'] })
    ])
     .process(cssCode, { from: undefined })
     .then(result => {
        resolve(result.css + '\n');
     })
  })
}

// postcss 插件， 添加scopeId
function addScopeId(opts) {
  const { moduleId } = opts;

  function func() {
    return {
      postcssPlugin: 'addScopeId',
      prepare() {
        return {
          OnceExit(root) {
            root.walkRules(rule => {
              if (!moduleId) {
                return;
              }
              if (/%/.test(rule.selector)) {
                return; 
              }
              // 伪类选择器
              if (/::/.test(rule.selector)) {
                rule.selector = rule.selector.replace(/::/g, `[data-v-${moduleId}]::`);
                return;
              }
              rule.selector += `[data-v-${moduleId}]`;
            })
          }
        }
      }
    }
  }

  func.postcss = true;
  return func;
}