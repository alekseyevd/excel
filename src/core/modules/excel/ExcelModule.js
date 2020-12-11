import {ExcelDashboardView} from './components/Dashboard';

export class ExcelModule {
  static routes = [
    {
      path: '',
      component: ExcelDashboardView
    },
    {
      path: '/[id]',
      component: 'dfg'
    }
  ]
}
