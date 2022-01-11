import menuData from '../../components/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../../assets/imgs/britam-logo2.png'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import MobileNav from '../../components/menu/MobileNav'
import SideBar from '../../components/menu/SideBar'
import MinimisedSideBar from '../../components/menu/MinimisedSideBar'
import { authentication } from "../../helpers/firebase";
import DefaultAvatar from '../../components/DefaultAvatar'
import { MdLogout } from 'react-icons/md'
import { Badge } from 'react-bootstrap'

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
            <MobileNav role={SuperAdmin} user="superadmin" displayName={authentication?.currentUser?.displayName}/>
            {toggleMenu === true 
            ?
                <nav className="sidebar">
                    <div id='brand'>
                        <img src={logo} width={150} alt="Britam" />
                        <div id="arrowCircle" onClick={() => {
                                setToggeMenu(!toggleMenu)
                                setLargeContentClass(!largeContentClass)
                                }}>
                                
                                    <HiOutlineChevronLeft style={{color: "#c6c7c8", fontSize: "15px"}}/>
                                
                                
                        </div>
                    </div>
                    <SideBar role={SuperAdmin} user="superadmin"/>
                    <footer>
                        <ul>
                            <li><Link to="/admin/settings">My Profile</Link></li>
                            <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                        </ul>
                        <Link to='/admin/settings'>
                            <DefaultAvatar />
                            <div>
                                <p style={{"fontWeight": "500", "fontSize": "1.05rem"}}>{authentication?.currentUser?.displayName}</p>
                                <p style={{"color": "#646464"}}>
                                    <Badge bg="danger">Super Admin</Badge>
                                </p>
                            </div>
                            <div id="eclipse"><div></div><div></div><div></div></div>
                        </Link>
                    </footer>
                </nav>
            : 
            <nav className='sidebar-m'>
            <section id='brand_m'>
                <div id="arrowOutCircle" onClick={() => {
                    setToggeMenu(!toggleMenu)
                    setLargeContentClass(!largeContentClass)
                    }}>
                    
                        <HiOutlineChevronRight style={{color: "#c6c7c8", fontSize: "15px"}}/>
                    
                    
            </div>
            </section>
            <MinimisedSideBar role={SuperAdmin}/>
            <footer>
                        <ul>
                            <li><Link to="/admin/settings">Settings</Link></li>
                            <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                        </ul>
                    <Link to={'/admin-settings'} id="account">
                        <DefaultAvatar />
                    </Link>
                </footer>
        </nav>
            }
        </div>
    )
}

export default SuperAdminMenu
