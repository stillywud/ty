/**
 * Element UI 换肤工具类
 * @author sunjianlei
 *
 */
import color from 'css-color-function'
import formula from './formula.json'
import originalJSON from './originalStyle'

const defaultPrimaryColor = window['DEFAULT_THEME_COLOR']
let colors = { primary: defaultPrimaryColor }

let originalStyle = getStyleTemplate(originalJSON.elementUIStyle + originalJSON.customStyle)

export function changeTheme(primaryColor) {
  if (colors.primary === primaryColor) {
    return
  }
  let reg = /^#([\da-fA-F]{3}){1,2}$/
  if (primaryColor && reg.test(primaryColor)) {
    colors.primary = primaryColor
  } else {
    colors.primary = defaultPrimaryColor
  }
  colors = Object.assign({}, colors, generateColors(colors.primary))
  writeNewStyle()
}

function writeNewStyle() {
  let cssText = originalStyle
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
  })

  const styleId = 'j-element-theme-style'
  let element = document.getElementById(styleId)
  if (element != null) {
    element.outerHTML = ''
  }
  let style = document.createElement('style')
  style.id = styleId
  style.innerText = cssText
  document.head.appendChild(style)
}

function generateColors(primary) {
  let colors = {}
  let baseBlack = ''
  let extraLightBlack = ''
  let extraLightSilver = ''
  Object.keys(formula).forEach(key => {
    const value = formula[key]
      .replace(/primary/g, primary)
      .replace(/baseBlack/g, baseBlack)
      .replace(/extraLightBlack/g, extraLightBlack)
      .replace(/extraLightSilver/g, extraLightSilver)
    colors[key] = color.convert(value)
    if (key === 'baseBlack') {
      baseBlack = colors[key]
    }
    if (key === 'extraLightBlack') {
      extraLightBlack = colors[key]
    }
    if (key === 'extraLightSilver') {
      extraLightSilver = colors[key]
    }
  })
  return colors
}

function getStyleTemplate(data) {
  const colorMap = {
    'primary': '#409EFF',
    'buttonHoverBorder': '#c6e2ff',
    'buttonBorder': '#b3d8ff',
    'secondary': '#409EFF',
    'darkWhite': '#f5f7fa',
    'baseBlack': '#000',
    'lightBlack': '#324157',
    'extraLightBlack': '#48576a',
    'baseSilver': '#c0c4cc',
    'lightSilver': '#909399',
    'extraLightSilver': '#c0c4cc',
    'baseGray': '#e4e7ed',
    'lightGray': '#409EFF',
    'extraLightGray': '#f5f7fa',
    'buttonActive': '#3a8ee6',
    'buttonHover': '#66b1ff',
    'tableBorder': '#ebeef5',
    'datepickerInRange': '#f2f6fc',
    'datepickerInRangeHover': '#f2f6fc',
    'selectOptionSelected': '#f5f7fa',
    'lightBackground': '#ecf5ff'
  }
  Object.keys(colorMap).forEach(key => {
    const hexColor = colorMap[key]
    data = data.replace(new RegExp(hexColor, 'ig'), key)
  })
  return data
}