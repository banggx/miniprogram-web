import { parseHTML } from '../../toolkit/parseHTML';
import { makeTagStart, makeTagEnd } from './tag';

export function toVueTemplate(wxml: string) {
  const list: any = [];
  parseHTML(wxml, {
    start(tag, attrs, unary, start, end) {
      const startTagStr = wxml.slice(start, end);
      const tagStr = makeTagStart({
        tag,
        attrs,
        startTagStr
      });
      list.push(tagStr);
    },
    chars(str) {
      list.push(str.trim());
    },
    end(tag) {
      list.push(makeTagEnd(tag));
    }
  });

  return list.join('');
}