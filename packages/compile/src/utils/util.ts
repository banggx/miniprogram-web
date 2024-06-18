export function uuid(len: number = 10) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export function getCssExpressionValue(input: string) {
  if (!/{{(\w+)}}(\w*)\s*/g.test(input)) {
    return `'${input}'`;
  }

  const result = input.replace(/{{(\w+)}}(\w*)\s*/g, (match, p1, p2, offset, string) => {
    let replacement = '+' + p1;
    
    if (offset === 0) {
      replacement = p1;
    }
    if (p2) {
      replacement += "+'" + p2 + "'";
    }
    if (offset + match.length < string.length) {
      replacement += "+' '";
    }
    return replacement;
  });
  return result;
}

export function getFunctionExpressionInfo(eventBindInfo) {
  const trimStr = eventBindInfo.trim();
  const infoList = trimStr.split('(');
  const methodName = infoList[0].trim();
  let paramsInfo = '';
  
  if (infoList[1]) {
    paramsInfo = infoList[1].split(')')[0];
  }

  paramsInfo = paramsInfo.replace(/\$event/, `'$event'`);

  return `{methodName: '${methodName}', params: [${paramsInfo}]}`;
}