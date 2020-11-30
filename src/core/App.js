import {Template} from '../templates/Template'

export class App {
  constructor(component) {
    this.component = component
    this.partials = {
      logo: [
        '<div>partial 1</div>',
        '<div>partial 2</div>'
      ]
    }
  }

  start() {
    new Template(this.partials)
  }
}
