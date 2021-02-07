import {html} from '@/html'
import register from '@/register'
import {Component} from '@core/Component.js'
import Thead from './Thead'

class Excel extends Component {
  constructor() {
    super()
    this.codes = {
      A: 65,
      Z: 90
    }
  }

  initState() {
    return {
      buttons: [
        {
          icon: 'format_align_left',
          active: true,
          value: {textAlign: 'left'}
        },
        {
          icon: 'format_align_center',
          active: false,
          value: {textAlign: 'center'}
        },
        {
          icon: 'format_align_right',
          active: false,
          value: {textAlign: 'right'}
        },
        {
          icon: 'format_bold',
          active: false,
          value: {fontWeight: 'normal'}
        },
        {
          icon: 'format_italic',
          active: false,
          value: {fontStyle: 'normal'}
        },
        {
          icon: 'format_underlined',
          active: false,
          value: {textDecoration: 'none'}
        }
      ]
    }
  }

  buttonClickHandler(i) {
    const buttons = [...this.state.buttons]
    if (i > 2) {
      buttons[i].active = !buttons[i].active
    } else {
      for (let j = 0; j < 3 && j !== i; j++) {
        buttons[j].active = false
      }
      buttons[i].active = !buttons[i].active
    }
    this.setState({buttons})
  }

  template() {
    return (
      <>
        <div className="excel__header">
          <input type="text" class="input" value=""
            placeholder="Новая страница" />
          <div>
            <div class="button" >
              <i class="material-icons" data-delete>delete</i>
            </div>
            <div class="button" >
              <i class="material-icons" data-exit>exit_to_app</i>
            </div>
          </div>
        </div>
        <div class="excel__toolbar">
          {
            this.state.buttons.map((button, i) => {
              const styles = ['button']
              if (button.active) styles.push('active')
              return (
                <div class={styles.join(' ')}>
                  <i class="material-icons"
                    onClick={()=>this.buttonClickHandler(i)}>{button.icon}</i>
                </div>
              )
            })
          }
        </div>
        <div class="excel__formula">
          <div class="info">fx</div>
          <div class="input" contenteditable spellcheck="f"></div>
        </div>
        <div class="excel__table">
          <table>
            <thead>
              <tr>
                <Thead />
                {/* <th></th>
                <th className="column" >1</th>
                <th className="column" >2</th>
                <th className="column" >3</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  data-type="resizable"
                  data-row="${index}"
                  className="row-info"
                >
                  1
                  <div class="row-resize" data-resize="row"></div>
                </th>
                <td
                  class="cell"
                  data-type="cell"
                  contenteditable
                >
                </td>
                <td
                  class="cell"
                  data-type="cell"
                  contenteditable
                >
                </td>
                <td
                  class="cell"
                  data-type="cell"
                  contenteditable
                >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  }
}

export default register('excel-component', Excel)
