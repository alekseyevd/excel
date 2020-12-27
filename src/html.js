export function html(Type, props, ...children) {
  if (Type.prototype instanceof HTMLElement) {
    return Type.html(props)
  }
  if (typeof Type === 'function') return new Type(props)
  return {type: Type, props: props || {}, children}
}

export function el(node) {
  // if (typeof node === 'string') return document.createTextNode(node)
  if (!node.type) return document.createTextNode(node)

  let $el
  if (node.type === 'fragment') {
    $el = document.createDocumentFragment()
  } else {
    $el = document.createElement(node.type)
    setProps($el, node.props)
  }

  node.children
      .map(el)
      .forEach(child =>$el.appendChild(child))

  return $el
}

function setProps($el, props) {
  Object.keys(props).forEach(name => {
    setProp($el, name, props[name])
  })
}

function setProp($el, name, value) {
  if (value instanceof Object) value = JSON.stringify(value)
  if (name === 'className') {
    $el.setAttribute('class', value)
  } else {
    $el.setAttribute(name, value)
  }
}

function removeProp($el, name) {
  if (name === 'className') {
    $el.removeAttribute('class')
  } else {
    $el.removeAttribute(name)
  }
}

export function updateElement($parent, newNode, oldNode, index = 0) {
  if (oldNode === undefined) {
    $parent.appendChild(el(newNode))
  } else if (newNode === undefined) {
    $parent.removeChild($parent.childNodes[index])
  } else if (isNodeChanged(newNode, oldNode)) {
    $parent.replaceChild(el(newNode), $parent.childNodes[index])
  } else if (newNode.type) {
    updateProps($parent.childNodes[index], newNode.props, oldNode.props)
    const length = (newNode.children.length > oldNode.children.length)
        ? newNode.children.length
        : oldNode.children.length

    for (let i = 0; i < length; i++) {
      updateElement(
          newNode.type === 'fragment' ? $parent : $parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
      )
    }
  }
}

function isNodeChanged(newNode, oldNode) {
  return typeof newNode !== typeof oldNode ||
      !newNode.type && newNode !== oldNode ||
      newNode.type !== oldNode.type
}

function updateProps($element, newProps, oldProps) {
  const props = {...newProps, ...oldProps}
  Object.keys(props).forEach(prop => {
    updateProp($element, prop, newProps[prop], oldProps[prop])
  })
}

function updateProp($element, prop, newValue, oldValue) {
  if (!oldValue || (newValue !== oldValue)) {
    setProp($element, prop, newValue)
  } else if (!newValue) {
    removeProp($element, prop)
  }
}

// to-do - addevent listeners
