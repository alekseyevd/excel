import {CustomHtml} from '../../components/customhtml/CustomHtml'

export class ContentModule {
  static routes = [
    {
      path: '',
      component: CustomHtml
    },
    {
      path: '/[id]',
      component: CustomHtml
    }
  ]

  static get itemView() {
    return this.constructor.routes[0].component
  }
}

