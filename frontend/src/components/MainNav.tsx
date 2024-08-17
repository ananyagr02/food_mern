import {Button} from './ui/button'
import { useNavigate } from 'react-router-dom'

export default function MainNav() {
  const navigate = useNavigate();
  return (
    <Button variant="ghost" className="font-bold hover:text-orange-500 hover:bg-white text-2xl font-serif"
    onClick={ () => navigate('/login') }>
        Log In
    </Button>
  )
}
