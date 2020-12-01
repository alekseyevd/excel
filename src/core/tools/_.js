export default {
  isFunction(functionToCheck) {
    return functionToCheck &&
        {}.toString.call(functionToCheck) === '[object Function]'
  },
}
