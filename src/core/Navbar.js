import {html} from '../html'
import register from '../register'
import {Component} from './Component'

class Navbar extends Component {
  initState() {
    return {
      opened: false
    }
  }

  toggle() {
    this.setState({
      opened: !this.state.opened
    })
  }

  template() {
    const styles = ['mdl-layout__drawer']
    if (this.state.opened) {
      styles.push('is-visible')
    }

    return (
      <>
        <header className="mdl-layout__header">
          <button className="mdl-layout__drawer-button"
            onClick={() => this.toggle()}>
            <i className="material-icons" onClick={() => this.toggle()}>menu</i>
          </button>
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Title</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <a className="mdl-navigation__link" href="#">Main</a>
              <a className="mdl-navigation__link" href="#test/1">Test 1</a>
              <a className="mdl-navigation__link" href="#test/2">Test 2</a>
              <a className="mdl-navigation__link" href="#test">Test</a>
            </nav>
          </div>
        </header>
        <div className={styles.join(' ')} >
          <span className="mdl-layout-title">Title</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
          </nav>
        </div>
        {this.state.opened
          ? <div class="mdl-layout__obfuscator is-visible"
            onClick={this.toggle.bind(this)}></div>
          : ''
        }
      </>
    )
  }
}

export default register('nav-bar', Navbar)
