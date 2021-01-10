import {html} from '../html'

export default function Layout({partials}) {
  return (
    <div>
      {partials.top ? partials.top() : ''}
    </div>
  )
}
