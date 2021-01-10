import {html} from '../html'

export default function Layout(props) {
  return (
    <div>
      {props.top ? props.top() : ''}
    </div>
  )
}
