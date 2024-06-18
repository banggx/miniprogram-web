export function uuid(len: number = 10) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export function sleep(time) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function closest(node: HTMLElement, className: string) {
  let current: HTMLElement = node;

  while(current && current.classList && !current.classList.contains(className)) {
    current = current.parentNode as HTMLElement;
  }

  if ((current as HTMLElement | Document) === document) {
    return null;
  }

  return current;
}

export function queryPath(path: string) {
  const paramStr = path.split('?')[1];
  const pagePath = path.split('?')[0];
  const result = {
    query: {},
    pagePath,
  };

  if (!paramStr) {
    return result;
  }

  let paramList = paramStr.split('&');

  paramList.forEach((param) => {
    let key = param.split('=')[0];
    let value = param.split('=')[1];

    result.query[key] = value;
  });

  return result;
}