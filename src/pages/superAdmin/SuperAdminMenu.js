import menuData from '../../components/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/imgs/britam-logo2.png'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import MobileNav from '../../components/menu/MobileNav'
import SideBar from '../../components/menu/SideBar'
import MinimisedSideBar from '../../components/menu/MinimisedSideBar'
import { authentication } from "../../helpers/firebase";
import DefaultAvatar from '../../components/DefaultAvatar'
import { MdLogout } from 'react-icons/md'
import { Badge } from 'react-bootstrap'
import useDialog from '../../hooks/useDialog'
import { ImProfile } from 'react-icons/im'
import useAuth from '../../contexts/Auth'

function SuperAdminMenu({ setLargeContentClass }) {

    const preferredToggleMenu = localStorage.getItem('preferredToggleMenu') || true;
    const { SuperAdmin } = menuData;
    const [ toggleMenu, showToggleMenu, hideToggleMenu ] = useDialog(JSON.parse(preferredToggleMenu));
    const [ show, handleShow, handleClose ] = useDialog();
    if(show){
    window.onclick = (event) => !event.target.matches('.footerContext') ? handleClose() : null 
    }

    return (
        <div className="menuSide">
            <MobileNav role={SuperAdmin} user="superadmin" displayName={authentication?.currentUser?.displayName}/>
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
                    <SideBar role={SuperAdmin} user="superadmin"/>
                    <footer>
                        <div className="footerContext" onClick={(event) => {
                        show ? handleClose() : handleShow();
                        event.stopPropagation();
                        }}>
                            <DefaultAvatar />
                            <div>
                                <p style={{"fontWeight": "500", "fontSize": "1.05rem"}}><span>{(authentication?.currentUser?.displayName).split(' ')[0]} </span><span>{(authentication?.currentUser?.displayName).split(' ')[1]}</span></p>
                                <p style={{"color": "#646464"}}>
                                    <Badge bg="danger">Super Admin</Badge>
                                </p>
                            </div>
                            <h3 style={{color: "#000"}}>&hellip;</h3>
                        </div>
                        {/* </Link> */}
                        <ul className={show ? "footerContextShow" : ""} id="contextUl">
                            <li><Link to="/superadmin/settings"><ImProfile /> My Profile</Link></li>
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
            <MinimisedSideBar role={SuperAdmin}/>
            <footer>
                <div className="footerContext" onClick={(event) => {
                    show ? handleClose() : handleShow();
                    event.stopPropagation();
                }}>
                    <DefaultAvatar />
                </div>
                <ul className={show ? "footerContextShow" : ""} id="contextUl">
                    <li><Link to="/superadmin/settings"><ImProfile /></Link></li>
                    <li><Link to="/logout"><MdLogout /></Link></li>
                </ul>
            </footer>
        </nav>
            }
        </div>
    )
}

export default SuperAdminMenu
