// import * as vueCompiler from 'vue-template-compiler';

// const homeTpl = `
//   <ui-view class="home" bindtap="viewTap">
//     {{ text }}
//   </ui-view>
// `;
// const compileResult = vueCompiler.compile(homeTpl);
// console.log(compileResult); 

import { program } from 'commander';
import { build } from './commander/build';
const version = require('../package.json').version;

program
  .version(version)
  .usage('[command] [options]');


program.command('build [path]')
  .description('编译小程序源码')
  .action(build);

program.parse(process.argv);
