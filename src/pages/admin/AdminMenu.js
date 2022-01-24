import menuData from "../../components/menuData";
import "../../assets/styles/menu.css";
import { useState, useEffect } from "react";
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


export default function AdminMenu({ setLargeContentClass, largeContentClass }) {
  const { Admin } = menuData;
  const [selected, setSelected] = useState({ activeObject: null, Admin });
  const [toggleMenu, setToggeMenu] = useState(true);

  useEffect(() => {
    sessionStorage.getItem("session1")
      ? setSelected({
          ...selected,
          activeObject: selected.Admin[sessionStorage.getItem("session1") - 1],
        })
      : setSelected({ ...selected, activeObject: selected.Admin[0] });
  }, []);

  const toggleActive = (index) => {
    setSelected({ ...selected, activeObject: selected.Admin[index] });
    sessionStorage.setItem("session1", selected.Admin[index]["number"]);
  };

  const toggleActiveClassStyle = (index) =>
    selected.Admin[index] === selected.activeObject
      ? "nav-linked selected"
      : "nav-linked";

  // foot contextMenu close
  // window.onclick = function(event) {
  //   if (!event.target.matches('.footerContext')) {
  //     setOpenFooterContext(false)
  //   }
  // }
  const [ openFooterContext, setOpenFooterContext ] = useState(false)

  return (
    <div className="menuSide">
      <MobileNav role={Admin} user="admin" displayName={authentication?.currentUser?.displayName}/>
      {toggleMenu === true ? (
        <nav className="sidebar">
            <div id='brand'>
                <img width={150} src={logo} alt="Britam" />
                <div id="arrowCircle" onClick={() => {
                        setToggeMenu(!toggleMenu)
                        setLargeContentClass(!largeContentClass)
                        }}>
                        
                        <HiOutlineChevronLeft style={{color: "#c6c7c8", fontSize: "15px"}}/>
                        
                        
                </div>
            </div>
            <SideBar role={Admin} />
            <footer>
                {/* <Link to='/admin/settings'> */}
                <div className="footerContext" onClick={() => setOpenFooterContext(!openFooterContext)}>
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
                <ul className={openFooterContext ? "footerContextShow" : ""} id="contextUl">
                    <li><Link to="/admin/settings"><ImProfile /> My Profile</Link></li>
                    <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                </ul>
            </footer>
        </nav>
      ) : (
        <nav className='sidebar-m'>
                <section id='brand_m'>
                    <div id="arrowOutCircle" onClick={() => {
                        setToggeMenu(!toggleMenu)
                        setLargeContentClass(!largeContentClass)
                        }}>
                        
                            <HiOutlineChevronRight style={{color: "#c6c7c8", fontSize: "15px"}}/>
                        
                        
                </div>
                </section>
                <MinimisedSideBar role={Admin}/>
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
      )}
    </div>
  );
}

