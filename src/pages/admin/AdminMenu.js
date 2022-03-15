import menuData from "../../components/menuData";
import "../../assets/styles/menu.css";
import logo from "../../assets/imgs/britam-logo2.png";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import MobileNav from "../../components/menu/MobileNav";
import SideBar from "../../components/menu/SideBar";
import MinimisedSideBar from "../../components/menu/MinimisedSideBar";
import { authentication } from "../../helpers/firebase";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import DefaultAvatar from "../../components/DefaultAvatar";
import { Badge } from "react-bootstrap"; 
import { ImProfile } from 'react-icons/im'
import useDialog from "../../hooks/useDialog";
import useAuth from '../../contexts/Auth'


export default function AdminMenu({ minimiseMenu, maximiseMenu }) {

  const preferredToggleMenu = localStorage.getItem('preferredToggleMenu') || true;
  const { Admin } = menuData;
  const [ toggleMenu, showToggleMenu, hideToggleMenu ] = useDialog(JSON.parse(preferredToggleMenu));
  const [ show, handleShow, handleClose ] = useDialog();

  const { logout } = useAuth()
    const handleLogout = async () => {
        try {
            localStorage.removeItem('onRefresh')
            await logout()
            window.location = "/"
            console.log('reached this point')
        }
        catch(error){
            
        }
  }

  if(show){
    window.onclick = (event) => !event.target.matches('.footerContext') ? handleClose() : null 
  }


  return (
    <div className="menuSide">
      <MobileNav role={Admin} user="admin" displayName={authentication?.currentUser?.displayName}/>
      {toggleMenu ? (
        <nav className="sidebar">
            <div id='brand'>
                <img width={150} src={logo} alt="Britam" />
                <div id="arrowCircle" onClick={() => {
                        hideToggleMenu()
                        minimiseMenu()
                        }}>
                        
                        <HiOutlineChevronLeft style={{color: "#c6c7c8", fontSize: "15px"}}/>
                        
                        
                </div>
            </div>
            <SideBar role={Admin} />
            <footer>
                {/* <Link to='/admin/settings'> */}
                <div className="footerContext" onClick={(event) => {
                  show ? handleClose() : handleShow();
                  event.stopPropagation();
                }}>
                    {authentication?.currentUser.photoURL !== "https://firebasestorage.googleapis.com/v0/b/car-insurance-app.appspot.com/o/default-user-image.png?alt=media&token=f9f8f8e9-f8f8-4f8f-8f8f-f8f8f8f8f8f8"
                                ?
                                    <img src={authentication?.currentUser.photoURL} alt='profile' width={50} height={50} style={{borderRadius: "50%"}}/>
                                :
                                    <DefaultAvatar />
                    }
                    <div>
                        <p style={{"fontWeight": "500", "fontSize": "1.05rem"}}>{authentication?.currentUser?.displayName}</p>
                        <p style={{"color": "#646464"}}>
                            <Badge bg="warning">admin</Badge>
                        </p>
                    </div>
                    <h3 style={{color: "#000"}}>&hellip;</h3>
                </div>
                {/* </Link> */}
                <ul className={show ? "footerContextShow" : ""} id="contextUl">
                    <li><Link to="/admin/settings"><ImProfile /> My Profile</Link></li>
                    <li onClick={handleLogout}><Link to=""><MdLogout /> Logout</Link></li>
                </ul>
            </footer>
        </nav>
      ) : (
        <nav className='sidebar-m'>
                <section id='brand_m'>
                    <div id="arrowOutCircle" onClick={() => {
                        showToggleMenu()
                        maximiseMenu()
                        }}>
                        
                            <HiOutlineChevronRight style={{color: "#c6c7c8", fontSize: "15px"}}/>
                        
                        
                </div>
                </section>
                <MinimisedSideBar role={Admin}/>
                <footer>
                    <div className="footerContext" onClick={(event) => {
                      show ? handleClose() : handleShow();
                      event.stopPropagation();
                    }}>
                        <DefaultAvatar />
                    </div>
                    {/* </Link> */}
                    <ul className={show ? "footerContextShow" : ""} id="contextUl">
                        <li><Link to="/admin/settings"><ImProfile /></Link></li>
                        <li onClick={handleLogout}><Link to=""><MdLogout /></Link></li>
                    </ul>
                </footer>
            </nav>
      )}
    </div>
  );
}

