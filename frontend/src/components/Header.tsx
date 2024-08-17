
import { Link } from 'react-router-dom'
import MobilNav from './MobilNav'
import MainNav from './MainNav'
function Header() {
    return (
    <div className='border-b-2 border-b-orange-500 py-6'>
        <div className = "container mx-auto flex justify-between items-center">
        <Link to = "/" className="text-3xl font-serif font-bold tracking-tight text-orange-500">
        foodster</Link>
        <div className='md:hidden'>  {/*break point and media query -> hidden for medium sized screens => MobilNav will show up only in small screen*/}
            <MobilNav/>
        </div>
        <div className='hidden md:block'>  {/* by default hidden -> we have taken small screen to be default -> so by default hidden button on header, but for medium screens -> display block */}
            <MainNav/>
        </div>
        </div>
        
    </div>
    )
}

export default Header