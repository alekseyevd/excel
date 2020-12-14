import {ExcelDashboardView} from './components/Dashboard';
import {ExcelItemView} from './components/Excel';

export class ExcelModule {
  static routes = [
    {
      path: '',
      component: ExcelDashboardView
    },
    {
      path: '/[id]',
      component: ExcelItemView
    }
  ]
}
