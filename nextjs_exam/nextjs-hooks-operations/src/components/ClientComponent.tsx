// app/client-component.js
import { myAction } from '@/actions/action'

export default function ClientComponent() {
  return (
    <form action={myAction}>
      <button type="submit">Add to Cart</button>
    </form>
  )
}