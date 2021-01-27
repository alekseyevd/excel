import {html} from '../html'

export default function Layout(props) {
  console.log(props);
  const Component = props.view
  return (
    <>
      {props.top ? <div>top</div> : ''}
      <div>
        {props.view ? <Component /> : 'sdf'}
      </div>
    </>
  )
}
