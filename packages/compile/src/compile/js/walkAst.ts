export function walkAst(node, handler) {
  const { type } = node;
  if (handler[type]) {
    handler[type](node);
  }
  
  for (const prop in node) {
    const child = node[prop];
    
    if (typeof child === 'object' && child != null && prop !== 'loc' && prop!== 'range') {
      if (Array.isArray(child)) {
        child.forEach(n => {
          walkAst(n, handler);
        });
      } else {
        walkAst(child, handler);
      }
    }
  }
}