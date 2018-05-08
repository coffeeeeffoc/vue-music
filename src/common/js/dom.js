export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
export function getData(el, name, value) {
  name = 'data-' + name
  if (value) {
    return el.setAttribute(name, value)
  } else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style

let vender = (() => {
  let transformNames = {
    webkit: 'webkitTansform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()
export function prefixStyle(style) {
  if (vender === false) {
    return false
  }
  if (vender === 'standard') {
    return style
  }
  return vender + style.charAt(0).toUpperCase() + style.substr(1)
}
