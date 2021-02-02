import {html} from '@/html'
import register from '@/register'
import {Component} from '@core/Component.js'

class Excel extends Component {
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
            this.state.buttons.map(button => {
              const styles = ['button']
              if (button.active) styles.push('active')
              return (
                <div class={styles.join(' ')}>
                  <i class="material-icons">{button.icon}</i>
                </div>
              )
            })
          }
        </div>
      </>
    )
  }
}

export default register('excel-component', Excel)
