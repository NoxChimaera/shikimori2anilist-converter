export function node(type, name, elements) {
  return {
    type,
    name,
    elements,
  };
}

export function element(name, elements) {
  return node('element', name, elements);
}

export function term(name, value) {
  return {
    type: 'element',
    name,
    elements: [{ type: 'text', text: value }],
  };
}

export function cterm(name, value) {
  return {
    type: 'element',
    name,
    elements: [{ type: 'cdata', cdata: value }],
  };
}
