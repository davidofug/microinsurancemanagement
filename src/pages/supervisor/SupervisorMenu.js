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
import { Badge } from 'react-bootstrap'
import { MdLogout } from 'react-icons/md'
import DefaultAvatar from '../../components/DefaultAvatar'
import { ImProfile } from 'react-icons/im'
import useDialog from '../../hooks/useDialog'

function SupervisorMenu({ setLargeContentClass, largeContentClass }) {

    const { SuperVisor } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, SuperVisor })
    const [ toggleMenu, setToggeMenu ] = useState(true)

     // actions context
  const [show, handleShow, handleClose] = useDialog()
  if(show){
    window.onclick = (event) => !event.target.matches('.footerContext') ? handleClose() : null 
  }

    useEffect(() => {
        if(sessionStorage.getItem('session1')){
            setSelected({...selected, activeObject: selected.SuperVisor[sessionStorage.getItem('session1')-1]})
        }else{
            setSelected({...selected, activeObject: selected.SuperVisor[0]})
        }
        
    }, [])

    const toggleActive = index => {
        setSelected({...selected, activeObject: selected.SuperVisor[index]})
        sessionStorage.setItem('session1', selected.SuperVisor[index]["number"])
    }

    const toggleActiveClassStyle = index => selected.SuperVisor[index] === selected.activeObject ? "nav-linked selected" : "nav-linked"

    const [ openFooterContext, setOpenFooterContext ] = useState(false)

    return (
        <div className="menuSide">
            <MobileNav role={SuperVisor} user="supervisor" displayName={authentication?.currentUser?.displayName} />
            {toggleMenu === true 
            ?
                <nav className="sidebar">
                    <section id='brand'>
                        <img src={logo} width={150} alt="Britam" />
                        <div id="arrowCircle" onClick={() => {
                                setToggeMenu(!toggleMenu)
                                setLargeContentClass(!largeContentClass)
                                }}>
                                
                                    <HiOutlineChevronLeft style={{color: "#c6c7c8", fontSize: "15px"}}/>
                                
                                
                        </div>
                    </section>
                    <SideBar role={SuperVisor} user="supervisor" displayName={authentication?.currentUser?.displayName} />

                    <footer>
                        <div className="footerContext" onClick={(event) => { 
                            show ? handleClose() : handleShow(); 
                            event.stopPropagation()}}>
                            <DefaultAvatar />
                            <div>
                                <p style={{"fontWeight": "500", "fontSize": "1.05rem"}}>{authentication?.currentUser?.displayName}</p>
                                <p style={{"color": "#646464"}}>
                                    <Badge bg="success">supervisor</Badge>
                                </p>
                            </div>
                            <h3 style={{color: "#000"}}>&hellip;</h3>
                        </div>
                        <ul className={show ? "footerContextShow" : ""} id="contextUl">
                            <li><Link to="/supervisor/settings"><ImProfile /> My Profile</Link></li>
                            <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                        </ul>
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
                <MinimisedSideBar role={SuperVisor} displayName={authentication?.currentUser?.displayName}/>
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

export default SupervisorMenu
