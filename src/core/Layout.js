import {html} from '../html'
import Navbar from './Navbar';

export default function Layout(props) {
  console.log(props);
  const Component = props.view

  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      {props.top
        ? <Navbar
          className=""/>
        : ''}
      <main className="mdl-layout__content">
        <div className="page-content">
          {props.view ? <Component /> : 'sdf'}
        </div>
      </main>
    </div>
  )
}
