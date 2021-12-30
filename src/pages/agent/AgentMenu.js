import menuData from '../../parts/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import profile from '../../assets/imgs/image 2.png'
import logo from '../../assets/imgs/britam-logo.png'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import MobileNav from '../../parts/menu/MobileNav'
import SideBar from '../../parts/menu/SideBar'
import MinimisedSideBar from '../../parts/menu/MinimisedSideBar'
import { authentication } from "../../helpers/firebase";

function AgentMenu({setLargeContentClass, largeContentClass}) {

    const { Agent } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, Agent })
    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => {
        if(sessionStorage.getItem('session1')){
            setSelected({...selected, activeObject: selected.Agent[sessionStorage.getItem('session1')-1]})
        }else{
            setSelected({...selected, activeObject: selected.Agent[0]})
        }
        
    }, [])
    
    const toggleActive = index => {
        setSelected({...selected, activeObject: selected.Agent[index]})
        sessionStorage.setItem('session1', selected.Agent[index]["number"])
    }

    const toggleActiveClassStyle = index => selected.Agent[index] === selected.activeObject ? "nav-linked selected" : "nav-linked"

    return (
        <div className='menuSide'>
            <MobileNav role={Agent} user="agent" displayName={authentication?.currentUser?.displayName}/>
            {toggleMenu === true 
            ?
                <div className="sidebar"> 
                    <nav >
                        <div id='brand'>
                            <img src={logo} alt="Britam" />
                            <i onClick={() => {
                                setToggeMenu(!toggleMenu)
                                setLargeContentClass(!largeContentClass)
                                }}>
                                <HiOutlineChevronLeft />
                            </i>
                        </div>
                        <SideBar role={Agent} user="agent" displayName={authentication?.currentUser?.displayName} />
                    </nav>
                </div>
            : 
            <nav className='sidebar-m'>
                <section id='brand_m'>
                    <i onClick={() => {
                        setToggeMenu(!toggleMenu)
                        setLargeContentClass(!largeContentClass)
                        }}>
                        <HiOutlineChevronRight />
                    </i>
                </section>
                <MinimisedSideBar role={Agent} displayName={authentication?.currentUser?.displayName}/>
            
            </nav>
}
        </div>
    )
}

export default AgentMenu
