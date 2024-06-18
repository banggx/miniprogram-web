import fse from 'fs-extra';
import path from 'path';
import * as babel from '@babel/core';
import { getWorkPath } from '../../env';
import { walkAst } from './walkAst';

export function buildByPagePath(pagePath, compileResult) {
  const workPath = getWorkPath();
  const pageFullPath = `${workPath}/${pagePath}.js`;
  
  buildByFullPath(pageFullPath, compileResult);
}

export function buildByFullPath(filePath, compileResult) {
  // 判断当前文件是否已经被编译过
  if (hasCompileInfo(filePath, compileResult)) {
    return;
  }

  const jsCode = fse.readFileSync(filePath, 'utf-8');
  const moduleId = getModuleId(filePath);
  const compileInfo = {
    filePath,
    moduleId,
    code: '',
  }

  // 编译ast -> js代码
  const ast = babel.parseSync(jsCode);
  walkAst(ast, {
    CallExpression: (node) => {
      if (node.callee.name === 'Page') {
        // 给页面Page调用添加一个参数，值为当前页面的moduleId
        node.arguments.push({
          type: 'ObjectExpression',
          properties: [ 
            {
              type: 'ObjectProperty',
              method: false,
              key: {
                type: 'Identifier',
                name: 'path',
              },
              computed: false,
              shorthand: false,
              value: {
                type: 'StringLiteral',
                extra: {
                  rawValue: `'${moduleId}'`,
                  raw: `'${moduleId}'`,
                },
                value: `'${moduleId}'`
              }
            }
          ]
        });
      }
      // 对requrie引入的依赖进行深度解析
      if (node.callee.name === 'require') {
        const requirePath = node.arguments[0].value;
        const requireFullPath = path.resolve(filePath, '..', requirePath);
        const moduleId = getModuleId(requireFullPath);
        
        node.arguments[0].value = `'${moduleId}'`;
        node.arguments[0].extra.rawValue = `'${moduleId}'`;
        node.arguments[0].extra.raw = `'${moduleId}'`;
        
        buildByFullPath(requireFullPath, compileResult);
      }
    },
  });

  const { code: codeTrans } = babel.transformFromAstSync(ast, null, {});
  compileInfo.code = codeTrans;
  compileResult.push(compileInfo);
}

function getModuleId(filePath) {
  const workPath = getWorkPath();
  const after = filePath.split(`${workPath}/`)[1];
  return after.replace('.js', '');
}

function hasCompileInfo(filePath, compileResult) {
  for (let idx = 0; idx < compileResult.length; idx++) {
    if (compileResult[idx].filePath === filePath) {
      return true;
    }
  }
  return false;
}