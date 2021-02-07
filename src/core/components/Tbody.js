import {html} from '@/html'

export default function Tbody({rowsCount, colsCount}) {
  const trs = new Array(rowsCount)
      .fill('')
      .map((_, index) => {
        return (
          <tr>
            <th
              data-type="resizable"
              data-row={index}
              // style="height: ${getHeight(index, state)}"
            >
              {index + 1}
              <div class="row-resize" data-resize="row"></div>
            </th>
            <CreateTD colsCount={colsCount} rowIndex={index}/>
          </tr>
        )
      })

  return trs
}

function CreateTD({colsCount, rowIndex, state}) {
  const tds = new Array(colsCount)
      .fill('')
      .map((_, index) => {
        const id = `${rowIndex}:${index}`
        // const content = state.dataState[id] || ''
        // const styles = state.stylesState[id]
        //   ? toInlineStyles(state.stylesState[id])
        //   : ''
        return (
          <td
            class="cell"
            data-type="cell"
            data-id={id}
            // style="${styles}"
            contenteditable
          >
            {/* {content} */}
          </td>
        )
      })

  return tds
}
