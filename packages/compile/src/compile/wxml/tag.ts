import { getCssExpressionValue, getFunctionExpressionInfo } from '../../utils/util';

const tagWhiteList = ['view', 'text', 'image', 'swiper-item', 'swiper', 'video'];

export function makeTagStart(opts) {
  const { tag, attrs, startTagStr } = opts;

  if (!tagWhiteList.includes(tag)) {
    throw new Error(`Tag "${tag}" is not allowed in miniprogram`);
  }

  const isCloseTag = /\/>/.test(startTagStr);
  const transTag = `ui-${tag}`;
  const propsStr = getPropsStr(attrs);

  let transStr = `<${transTag}`;
  if (propsStr.length) {
    transStr += ` ${propsStr}`;
  }

  return `${transStr}>${isCloseTag ? `</${transTag}>` : ''}`;
}

export function makeTagEnd(tag) {
  return `</ui-${tag}>`;
}
 
function getPropsStr(attrs) {
  const attrsList: any[] = [];
  attrs.forEach((attrInfo) => {
    const { name, value } = attrInfo;

    if (/^bind/.test(name)) {
      attrsList.push({
        name: `v-bind:${name}`,
        value: getFunctionExpressionInfo(value)
      });
      return;
    }

    if (name === 'wx:if') {
      attrsList.push({
        name: 'v-if',
        value: getExpression(value)
      });
      return;
    }

    if (name === 'wx:elif') {
      attrsList.push({
        name: 'v-else-if',
        value: getExpression(value)
      });
      return;
    }

    if (name === 'wx:else') {
      attrsList.push({
        name: 'v-else',
        value: ''
      });
      return;
    }

    if (name === 'wx:for') {
      attrsList.push({
        name: 'v-for',
        value: getForExpression(value)
      });
      return;
    }

    if (name === 'wx:key') {
      attrsList.push({
        name: 'v-bind:key',
        value: `item.${value}`
      });
      return;
    }

    if (name === 'style') {
      attrsList.push({
        name: 'v-bind:style',
        value: getCssRules(value),
      });
      return;
    }

  if (/^{{.*}}$/.test(value)) {
    attrsList.push({
      name: `v-bind:${name}`,
      value: getExpression(value),
    });
    return;
  }

    attrsList.push({
      name: name,
      value: value,
    });
  });
  return linkAttrs(attrsList);
}

function linkAttrs(attrsList) {
  const result: string[] = [];
  attrsList.forEach(attrInfo => {
    const { name, value } = attrInfo;

    if (!value) {
      result.push(name);
      return;
    }

    result.push(`${name}="${value}"`);
  });

  return result.join(' ');
}

function getExpression(wxExpression) {
  const re = /\{\{(.+?)\}\}/;
  const matchResult = wxExpression.match(re);
  const result = matchResult ? matchResult[1].trim() : '';
  return result;
}

function getForExpression(wxExpression) {
  const listVariableName = getExpression(wxExpression);
  return `(item, index) in ${listVariableName}`;
}

function getCssRules(cssRule) {
  const cssCode = cssRule.trim();
  const cssRules = cssCode.split(';');
  const list: string[] = [];
  
  cssRules.forEach(rule => {
    if (!rule) {
      return;
    }

    const [name, value] = rule.split(':');
    const attr = name.trim();
    const ruleValue = getCssExpressionValue(value.trim());

    list.push(`'${attr}':${ruleValue}`)
  });

  return `{${list.join(',')}}`;
}