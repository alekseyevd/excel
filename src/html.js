export function html(type, props, ...children) {
  // if (Type.prototype instanceof HTMLElement) {
  //   return Type.html(props)
  // }

  props = props ? props : {}

  // children = Array.isArray(children[0]) ? children[0] : children;
  const _children = children.reduce((acc, value) => {
    if (Array.isArray(value)) {
      return acc.concat(value)
    } else {
      acc.push(value)
      return acc
    }
  }, [])

  if (typeof type === 'function') return type(props, _children)

  return {type, props, children: _children}
}

export function el(node, dispatcher) {
  // if (typeof node === 'string') return document.createTextNode(node)
  // if (node === null) return
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
      .forEach(child => $el.appendChild(child))

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

function removeProp($el, name, dispatcher) {
  // to-do remove event listeners
  if (isEventProp(name)) {
    dispatcher.unSubscribe(extractEventName(name), $el)
  } else if (name === 'className') {
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

    const $elWillRemoved = $parent.childNodes[index]
    setTimeout(() => {
      $parent.removeChild($elWillRemoved)
    }, 0)
  } else if (isNodeChanged(newNode, oldNode)) {
    // to-do remove eventListeners form dispatcher

    if (oldNode.type && oldNode.type === 'fragment') {
      while ($parent.childNodes.length !== 1) {
        $parent.removeChild($parent.lastElementChild);
      }
    }
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
    setProp($element, prop, newValue, dispatcher)
  } else if (!newValue) {
    removeProp($element, prop, dispatcher)
  }
}

