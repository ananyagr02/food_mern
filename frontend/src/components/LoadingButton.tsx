import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

export default function LoadingButton() {
  return (
    <Button disabled>
        <Loader2 className= "mr-2 h-4 w-4 animate-spin"/>  {/* to display loading button when form is being submitted*/}
        Loading {/* displays "Loading" on button */}
    </Button>
  )
}
