const getStyle = (el, attr) => {
  if (el.currentStyle) {
    return el.currentStyle[attr]
  } else {
    return window.getComputedStyle(el, null)[attr]
  }
}

export default (ele, ancestor) => {
  var left = 0
  var top = 0
  while ((ele.offsetParent || getStyle(ele, 'position') === 'fixed') && ele !== ancestor) {
    left += ele.offsetLeft
    top += ele.offsetTop
    if (getStyle(ele, 'position') === 'fixed') {
      break
    }
    ele = ele.offsetParent
  }
  return {
    left: left,
    top: top,
  }
}