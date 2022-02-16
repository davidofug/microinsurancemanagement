import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { MdLogout  } from 'react-icons/md'
import { useState, useEffect } from 'react'
import logo from '../../assets/imgs/britam-logo2.png'
import { Navbar, Offcanvas, Container, Nav, NavDropdown} from 'react-bootstrap'
import DefaultAvatar from '../DefaultAvatar'
import { ImProfile } from 'react-icons/im'
import { Badge } from 'react-bootstrap'
import { authentication } from "../../helpers/firebase";
import useAuth from '../../contexts/Auth'
import useDialog from '../../hooks/useDialog'
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
// import './mobilenav.css'

export default function MobileNav ({role, user, displayName }) {
    const [ selected, setSelected ] = useState({ activeObject: null, role })
    const [ show, handleShow, handleClose ] = useDialog();
    const [ subMenu, setSubMenu ] = useState(false)

    if(show){
        window.onclick = (event) => !event.target.matches('.footerContext') ? handleClose() : null 
    }

    useEffect(() => {
        sessionStorage.getItem('session1')
            ? setSelected({...selected, activeObject: selected.role[sessionStorage.getItem('session1')-1]})
            : setSelected({...selected, activeObject: selected.role[0]})   
    }, [])
    
    const toggleActive = index => {
        setSelected({...selected, activeObject: selected.role[index]})
        sessionStorage.setItem('session1', selected.role[index]["number"])
    }

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

    const toggleActiveClassStyle = index => selected.role[index] === selected.activeObject ? "nav-linked selected" : "nav-linked"
    return (
        <div className="mobile-sidebar">
            <Navbar expand={false} className='hideThis' >
                <Container fluid>
                    <div>
                        <Navbar.Toggle className='m-3' aria-controls="offcanvasNavbar" />
                        <Navbar.Brand >
                            <img src={logo} width={150} alt="Britam" />
                        </Navbar.Brand>
                    </div>
                    <Navbar.Offcanvas id="offcanvasNavbar" className="mobileSidebar" aria-labelledby="offcanvasNavbarLabel" placement="start" style={{display: "flex"}}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">
                                    <img src={logo} width={150} alt="Britam" />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <ul className="nav flex-column" >
                                    { selected.role !== null && selected.role.map((menuItem, index) => (
                                        <ul className='nav-item' key={menuItem.number}> 
                                            <li to={menuItem.link} className={toggleActiveClassStyle(index)} onClick={() => {
                                                toggleActive(index)   
                                                setSubMenu(!subMenu)                                       
                                                }}>
                                                    

                                                <div>
                                                    <span>{menuItem.icon}</span>{menuItem.name}
                                                            
                                                    {menuItem?.subMenu &&
                                                    <>
                                                        <span>{subMenu === false ? <BsFillCaretDownFill style={{fontSize:"10px"}}/> : <BsFillCaretUpFill style={{fontSize:"10px"}}/>}</span>
                                                        {
                                                            subMenu === true && 
                                                            <div className="nav flex-column" style={{paddingTop:"5px", paddingLeft:"130px"}}>
                                                                {/* {console.log(menuItem.subMenu)} */}
                                                                {menuItem.subMenu.map((sub, index) => (
                                                                    <Link to={sub.link} key={index} style={{backgroundColor:"#1475cf", textDecoration:"none", color:"#ffffff", fontSize:"13px"}} onClick={() => {
                                                                        document.getElementById('offcanvasNavbar').style.display='none'
                                                                        document.getElementsByClassName('show')[0].style.display='none'
                                                                        setSubMenu(false)
                                                                    }}>
                                                                    {sub.name}
                                                                    </Link>
                                                                ))}
                                                            </div>    
                                                        }
                                                    </>}      
                                                </div>       
                                            </li>
                                        </ul>
                                    ))}                                       
                                </ul>
                            </Nav>
                        </Offcanvas.Body>

                        <footer>
                            <div className="footerContext" onClick={(event) => { show ? handleClose() : handleShow(); event.stopPropagation()}}>
                                {authentication?.currentUser.photoURL !== "https://firebasestorage.googleapis.com/v0/b/car-insurance-app.appspot.com/o/default-user-image.png?alt=media&token=f9f8f8e9-f8f8-4f8f-8f8f-f8f8f8f8f8f8"
                                ?
                                    <img src={authentication?.currentUser.photoURL} alt='profile' width={50} height={50} style={{borderRadius: "50%"}}/>
                                :
                                    <DefaultAvatar />
                                }
                                <div>
                                    <p style={{"fontWeight": "500", "fontSize": "1.05rem"}}>{displayName}</p>
                                    <p style={{"color": "#646464"}}>
                                        <Badge color='black'>{user}</Badge>
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
                        
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    )
}