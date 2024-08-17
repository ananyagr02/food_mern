import {RxCaretDown} from "react-icons/rx"
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useState } from "react";
function Header1() {
  const [toggle, setToggle] = useState(false); 
  const showSideMenu = () => {
    setToggle(true)
  }
  const hideSideMenu = () => {
    setToggle(false);
  }

  const links = [
    {
      icon: <IoIosSearch/>,
      name: "Search"
    },
    {
      icon: <FaRegUser/>,
      name: "User"
    },
    {
      icon: <CiShoppingCart/>,
      name: "Cart"
    }
  ]
  return (
    <>
    <div className="black-overlay h-full w-full fixed duration-500 " onClick = {hideSideMenu} style = {{
      opacity:toggle ? 1 : 0,
      visibility : toggle? "visible" : "hidden"
    }}>
      {/*when an event occurs, it goes to the children and parent as well so stopPropagation prevents propagation of it to the all other linked elements*/}
    <div onClick = {(e) => {e.stopPropagation()}} className="w-[400px] bg-white h-full absolute duration-[400ms]"
    style  = {{
      left : toggle ? '0%' : '-100%'
    }}></div>
    </div>
    <header className="p-1 h-[90px] shadow-xl flex flex-row">
      <div className="max-w-[1200px] flex flex-row items-center mx-4">
        <div className="w-[100px] flex flex-start p-1">
          <img src = "public/images/logo.png" className = "w-full" alt = ""/>
        </div>

        <div className="">
          <span className="font-bold border-b-2  border-[#fc8019] hover:text-[#fc8019]">Sector 35-C</span> Chandigarh, India
          <RxCaretDown onClick = {showSideMenu} fontSize = {25} className = "font-bold inline text-[0.9rem] text-[#fc8019] cursor-pointer"/>
        </div>
      </div>
      <nav className="flex mx-[60px] list-none gap-4 md:gap-16 ml-auto font-semibold text-18px">
        { 
          links.map(
            (link, index) => {
              return <li key = {index} className="flex items-center gap-2 hover:text-[#fc8019] ">
              {link.icon}  {/* key helps in uniquely identifying each list element*/}
              {link.name}
            </li>
            }
          )
        }
        
      </nav>
    </header>
    </>
    )
}

export default Header1