export default function html(Type, props, ...children) {
  if (typeof Type === 'function') return new Type(props)
  return {type: Type, props, children}
}
