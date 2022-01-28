import menuData from "../../components/menuData";
import "../../assets/styles/menu.css";
import { useEffect } from "react";
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


export default function AdminMenu({ setLargeContentClass }) {

  const preferredToggleMenu = localStorage.getItem('preferredToggleMenu') || true;
  const { Admin } = menuData;
  const [ toggleMenu, showToggleMenu, hideToggleMenu ] = useDialog(JSON.parse(preferredToggleMenu));
  const [ show, handleShow, handleClose ] = useDialog();
  if(show){
    window.onclick = (event) => !event.target.matches('.footerContext') ? handleClose() : null 
  }

  console.log(preferredToggleMenu)

  return (
    <div className="menuSide">
      <MobileNav role={Admin} user="admin" displayName={authentication?.currentUser?.displayName}/>
      {toggleMenu === true ? (
        <nav className="sidebar">
            <div id='brand'>
                <img width={150} src={logo} alt="Britam" />
                <div id="arrowCircle" onClick={() => {
                        hideToggleMenu()
                        setLargeContentClass(true)
                        localStorage.setItem('preferredToggleMenu', false)
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
                    <DefaultAvatar />
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
                    <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                </ul>
            </footer>
        </nav>
      ) : (
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
                        <li><Link to="/logout"><MdLogout /></Link></li>
                    </ul>
                </footer>
            </nav>
      )}
    </div>
  );
}

