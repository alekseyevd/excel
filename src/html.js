export function html(Type, props, ...children) {
  if (Type.prototype instanceof HTMLElement) {
    return Type.html(props)
  }
  if (typeof Type === 'function') return new Type(props)
  return {type: Type, props: props || {}, children}
}

export function el(node, dispatcher) {
  // if (typeof node === 'string') return document.createTextNode(node)
  if (!node.type) return document.createTextNode(node)

  let $el
  if (node.type === 'fragment') {
    $el = document.createDocumentFragment()
  } else {
    $el = document.createElement(node.type)
    setProps($el, node.props, dispatcher)
  }

  node.children
      .map(child => el(child, dispatcher))
      .forEach(child =>$el.appendChild(child))

  return $el
}

function setProps($el, props, dispatcher) {
  Object.keys(props).forEach(name => {
    setProp($el, name, props[name], dispatcher)
  })
}

function setProp($el, name, value, dispatcher) {
  if (isEventProp(name)) {
    dispatcher.subscribe(extractEventName(name), $el, value)
  } else if (name === 'className') {
    $el.setAttribute('class', value)
  } else {
    if (value instanceof Object) value = JSON.stringify(value)
    $el.setAttribute(name, value)
  }
}

function isEventProp(name) {
  return /^on/.test(name);
}

function extractEventName(name) {
  return name.slice(2).toLowerCase();
}

function removeProp($el, name) {
  if (name === 'className') {
    $el.removeAttribute('class')
  } else {
    $el.removeAttribute(name)
  }
}

export function updateElement($parent, newNode, oldNode, index, dispatcher) {
  if (oldNode === undefined) {
    $parent.appendChild(el(newNode, dispatcher))
  } else if (newNode === undefined) {
    // to-do remove eventListeners form dispatcher
    $parent.removeChild($parent.childNodes[index])
  } else if (isNodeChanged(newNode, oldNode)) {
    // to-do remove eventListeners form dispatcher
    $parent.replaceChild(el(newNode, dispatcher), $parent.childNodes[index])
  } else if (newNode.type) {
    updateProps(
        $parent.childNodes[index],
        newNode.props, oldNode.props, dispatcher)

    const length = (newNode.children.length > oldNode.children.length)
        ? newNode.children.length
        : oldNode.children.length
    for (let i = 0; i < length; i++) {
      updateElement(
          newNode.type === 'fragment' ? $parent : $parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i,
          dispatcher
      )
    }
  }
}

function isNodeChanged(newNode, oldNode) {
  return typeof newNode !== typeof oldNode ||
      !newNode.type && newNode !== oldNode ||
      newNode.type !== oldNode.type
}

function updateProps($element, newProps, oldProps, dispatcher) {
  const props = {...newProps, ...oldProps}
  Object.keys(props).forEach(prop => {
    updateProp($element, prop, newProps[prop], oldProps[prop], dispatcher)
  })
}

function updateProp($element, prop, newValue, oldValue, dispatcher) {
  if (!oldValue || (newValue.toString() !== oldValue.toString())) {
    console.log('update');
    setProp($element, prop, newValue, dispatcher)
  } else if (!newValue) {
    removeProp($element, prop)
  }
}

