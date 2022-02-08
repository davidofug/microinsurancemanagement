import menuData from '../../components/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../assets/imgs/britam-logo2.png'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import MobileNav from '../../components/menu/MobileNav'
import SideBar from '../../components/menu/SideBar'
import MinimisedSideBar from '../../components/menu/MinimisedSideBar'
import { authentication } from "../../helpers/firebase";
import { MdLogout } from 'react-icons/md'
import DefaultAvatar from '../../components/DefaultAvatar'
import { Badge } from 'react-bootstrap'
import { ImProfile } from 'react-icons/im'
import useDialog from '../../hooks/useDialog'
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom'
import useAuth from '../../contexts/Auth'


function AgentMtpMenu({setLargeContentClass, largeContentClass}) {

    const preferredToggleMenu = localStorage.getItem('preferredToggleMenu') || true;
    const { Agent } = menuData
    const [ toggleMenu, showToggleMenu, hideToggleMenu ] = useDialog(JSON.parse(preferredToggleMenu));
    const [ show, handleShow, handleClose ] = useDialog();


    const { logout } = useAuth()
    const handleLogout = async () => {
        try {
            window.location = "/"
            await logout()
        }
        catch(error){
            console.log(error)
        }
  }

    // actions context
  if(show){
    window.onclick = (event) => !event.target.matches('.footerContext') ? handleClose() : null 
  }

    return (
        <div className='menuSide'>
            <MobileNav role={Agent} user="agent" displayName={authentication?.currentUser?.displayName} show={show} handleClose={handleClose} handleShow={handleShow}/>
            {toggleMenu === true 
            ?
                    <nav className="sidebar">
                        <div id='brand'>
                            <img src={logo} width={150} alt="Britam" />
                            <div id="arrowCircle" onClick={() => {
                                    hideToggleMenu()
                                    setLargeContentClass(true)
                                    localStorage.setItem('preferredToggleMenu', false)
                                    }}>
                                    
                                        <HiOutlineChevronLeft style={{color: "#c6c7c8", fontSize: "15px"}}/>
                                    
                                    
                            </div>
                        </div>
                        <SideBar role={Agent} user="agent" displayName={authentication?.currentUser?.displayName} />

                        <footer>
                            <div className="footerContext" onClick={(event) => { show ? handleClose() : handleShow(); event.stopPropagation()}}>
                                {authentication?.currentUser.photoURL !== "https://firebasestorage.googleapis.com/v0/b/car-insurance-app.appspot.com/o/default-user-image.png?alt=media&token=f9f8f8e9-f8f8-4f8f-8f8f-f8f8f8f8f8f8"
                                ?
                                    <img src={authentication?.currentUser.photoURL} alt='profile' width={50} height={50} style={{borderRadius: "50%"}}/>
                                :
                                    <DefaultAvatar />
                                }
                                <div>
                                    <p style={{"fontWeight": "500", "fontSize": "1.05rem"}}>{authentication?.currentUser?.displayName}</p>
                                    <p style={{"color": "#646464"}}>
                                        <Badge color='black'>agent</Badge>
                                    </p>
                                </div>
                                <h3 style={{color: "#000"}}>&hellip;</h3>
                            </div>
                            {/* context menu */}
                            <ul className={show ? "footerContextShow" : ""} id="contextUl" >
                                <li><Link to="/agent/settings"><ImProfile /> My Profile</Link></li>
                                <li onClick={handleLogout}><Link><MdLogout /> Logout</Link></li>
                            </ul>
                        </footer>

                    </nav>
            : 
            <nav className='sidebar-m'>
                <section id='brand_m'>
                    <div id="arrowOutCircle" onClick={() => {
                        showToggleMenu()
                        setLargeContentClass(!largeContentClass)
                        localStorage.setItem('preferredToggleMenu', true)
                        }}>
                        
                            <HiOutlineChevronRight style={{color: "#c6c7c8", fontSize: "15px"}}/>
                        
                        
                </div>
                </section>
                <MinimisedSideBar role={Agent}/>
                <footer>
                    <div className="footerContext" onClick={(event) => {
                      show ? handleClose() : handleShow();
                      event.stopPropagation();
                    }}>
                        <DefaultAvatar />
                    </div>
                    <ul className={show ? "footerContextShow" : ""} id="contextUl">
                        <li><Link to="/admin/settings"><ImProfile /></Link></li>
                        <li onClick={handleLogout}><Link><MdLogout /></Link></li>
                    </ul>
                </footer>
            </nav>
}
        </div>
    )
}

export default AgentMtpMenu