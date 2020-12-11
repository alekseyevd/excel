import {ContentItemView} from './components/Item'
import {ContentListView} from './components/List'

export class ContentModule {
  static routes = [
    {
      path: '',
      component: ContentListView
    },
    {
      path: '/[id]',
      component: ContentItemView
    }
  ]

  static get itemView() {
    return this.constructor.routes[0].component
  }
}

