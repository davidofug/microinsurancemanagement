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


function SuperAdminMenu({ setLargeContentClass, largeContentClass }) {

    const { SuperAdmin } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, SuperAdmin })
    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => {
        if(sessionStorage.getItem('session1')) setSelected({...selected, activeObject: selected.SuperAdmin[sessionStorage.getItem('session1')-1]})
        else setSelected({...selected, activeObject: selected.SuperAdmin[0]})

    },[])

    const toggleActive = index => {
        setSelected({...selected, activeObject: selected.SuperAdmin[index]})
        sessionStorage.setItem('session1', selected.SuperAdmin[index]["number"])
    }

    const toggleActiveClassStyle = index => selected.SuperAdmin[index] === selected.activeObject ? "nav-linked selected" : "nav-linked"

    return (
        <div className="menuSide">
            <MobileNav role={SuperAdmin} user="superadmin"/>
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
                    <SideBar role={SuperAdmin} user="superadmin" />
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
                <MinimisedSideBar role={SuperAdmin} />
            </nav>
            }
        </div>
    )
}

export default SuperAdminMenu
