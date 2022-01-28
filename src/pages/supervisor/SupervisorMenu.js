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

function SupervisorMenu({ setLargeContentClass }) {

    const preferredToggleMenu = localStorage.getItem('preferredToggleMenu') || true;
    const { SuperVisor } = menuData
    const [ toggleMenu, showToggleMenu, hideToggleMenu ] = useDialog(preferredToggleMenu);
    const [show, handleShow, handleClose] = useDialog()
    if(show){
        window.onclick = (event) => !event.target.matches('.footerContext') ? handleClose() : null 
    }

    return (
        <div className="menuSide">
            <MobileNav role={SuperVisor} user="supervisor" displayName={authentication?.currentUser?.displayName} />
            {toggleMenu === true 
            ?
                <nav className="sidebar">
                    <section id='brand'>
                        <img src={logo} width={150} alt="Britam" />
                        <div id="arrowCircle" onClick={() => {
                                hideToggleMenu()
                                setLargeContentClass(true)
                                localStorage.setItem('preferredToggleMenu', false)
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
                        showToggleMenu()
                        setLargeContentClass(false)
                        localStorage.setItem('preferredToggleMenu', true)
                        }}>
                        
                            <HiOutlineChevronRight style={{color: "#c6c7c8", fontSize: "15px"}}/>
                        
                        
                </div>
                </section>
                <MinimisedSideBar role={SuperVisor} displayName={authentication?.currentUser?.displayName}/>
                <footer>
                    <div className="footerContext" onClick={(event) => {
                      show ? handleClose() : handleShow();
                      event.stopPropagation();
                    }}>
                        <DefaultAvatar />
                    </div>
                    {/* </Link> */}
                    <ul className={show ? "footerContextShow" : ""} id="contextUl">
                        <li><Link to="/supervisor/settings"><ImProfile /></Link></li>
                        <li><Link to="/logout"><MdLogout /></Link></li>
                    </ul>
                </footer>
            
            </nav>
            }
        </div>
    )
}

export default SupervisorMenu
