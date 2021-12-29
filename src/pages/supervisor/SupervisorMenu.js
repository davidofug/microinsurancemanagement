import menuData from '../../parts/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../../assets/imgs/britam-logo.png'
import profile from '../../assets/imgs/anyuru.jpg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import MobileNav from '../../parts/menu/MobileNav'
import SideBar from '../../parts/menu/SideBar'
import MinimisedSideBar from '../../parts/menu/MinimisedSideBar'


function SupervisorMenu({ setLargeContentClass, largeContentClass }) {

    const { SuperVisor } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, SuperVisor })
    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => {
        if(sessionStorage.getItem('session1')){
            setSelected({...selected, activeObject: selected.SuperVisor[sessionStorage.getItem('session1')-1]})
        }else{
            setSelected({...selected, activeObject: selected.SuperVisor[0]})
        }
        
    }, [selected])

    const toggleActive = index => {
        setSelected({...selected, activeObject: selected.SuperVisor[index]})
        sessionStorage.setItem('session1', selected.SuperVisor[index]["number"])
    }

    const toggleActiveClassStyle = index => selected.SuperVisor[index] === selected.activeObject ? "nav-linked selected" : "nav-linked"

    return (
        <div className="menuSide">
            <MobileNav role={SuperVisor} user="supervisor"/>
            {toggleMenu === true 
            ?
                <div className="sidebar">
                    <nav>
                    <div id="brand">
                        <img src={logo} alt="Britam" />
                        <i
                        onClick={() => {
                            setToggeMenu(!toggleMenu);
                            setLargeContentClass(!largeContentClass);
                        }}
                        >
                        <HiOutlineChevronLeft />
                        </i>
                    </div>
                    <SideBar role={SuperVisor} user="supervisor" />
                    </nav>
                </div>
            : 
            <nav className="sidebar-m">
                <section id="brand_m">
                <i
                    onClick={() => {
                    setToggeMenu(!toggleMenu);
                    setLargeContentClass(!largeContentClass);
                    }}
                >
                    <HiOutlineChevronRight />
                </i>
                </section>
                <MinimisedSideBar role={SuperVisor} />
            </nav>
            }
        </div>
    )
}

export default SupervisorMenu
