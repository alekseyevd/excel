import {html} from '@/html'

const CODES = {
  A: 65,
  Z: 90
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export default function Thead({colsCount, resize}) {
  // const colsCount = CODES.Z - CODES.A + 1
  const ths = new Array(colsCount + 1)
      .fill('')
      .map((_, index) => {
        // const width = getWidth(index - 1, state)
        if (index === 0) {
          return (
            <th className="column"></th>
          )
        } else {
          return (
            <th
              data-type="resizable"
              className="column"
              // data-col="${index - 1}"
              style="min-width: 250px;"
            >
              {toChar(_, index - 1)}
              <div class="col-resize" data-resize="col"
                onMousedown={(e) => resize(e)} >
              </div>
            </th>
          )
        }
      })

  return ths
}
