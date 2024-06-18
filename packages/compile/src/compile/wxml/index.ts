import fse from 'fs-extra';
import { toVueTemplate } from './toVueTemplate';
import { getWorkPath } from '../../env';
import * as vueCompiler from 'vue-template-compiler';
import { compileTemplate } from '@vue/component-compiler-utils';
import { writeFile } from './writeFile';

export function compileWxml(moduleDep: Record<string, any>) {
  const list: any[] = [];
  for (const path in moduleDep) {
    const code = compile(path, moduleDep[path].moduleId);
    list.push({
      path,
      code
    });
  }
  writeFile(list);
}

function compile(path: string, moduleId) {
  const fullPath = `${getWorkPath()}/${path}.wxml`;
  
  const wxmlContent = fse.readFileSync(fullPath, 'utf-8');
  const vueTemplate = toVueTemplate(wxmlContent);
  const compileResult = compileTemplate({
    source: vueTemplate,
    compiler: vueCompiler as any,
    filename: ''
  })
  const code = `
    modDefine('${path}', function() {
      ${compileResult.code}
      Page({
        path: '${path}',
        render: render,
        usingComponents: {},
        scopeId: 'data-v-${moduleId}',
      });
    })
  `;
  return code;
} 