import {$} from '@core/Dom'

export default function resizeHandler(event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'

    $resizer.css({
      opacity: 1,
      zIndex: 1000,
      [sideProp]: '-5000px'
    })

    let style = {}
    let value

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
        style = {
          width: value + 'px'
        }
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
        style = {
          height: value + 'px'
        }
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      $parent.css(style)

      resolve({
        value,
        id: type === 'col' ? $parent.data.col : $parent.data.row,
        type
      })

      $resizer.css({opacity: 0, bottom: 0, right: 0})
    }
  })
}

