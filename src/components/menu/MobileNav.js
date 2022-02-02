import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { MdLogout  } from 'react-icons/md'
import { useState, useEffect } from 'react'
import logo from '../../assets/imgs/britam-logo2.png'
import { Navbar, Offcanvas, Container, Nav, NavDropdown} from 'react-bootstrap'
import DefaultAvatar from '../DefaultAvatar'

export default function MobileNav ({role, user, displayName}) {
    const [ selected, setSelected ] = useState({ activeObject: null, role })

    useEffect(() => {
        sessionStorage.getItem('session1')
            ? setSelected({...selected, activeObject: selected.role[sessionStorage.getItem('session1')-1]})
            : setSelected({...selected, activeObject: selected.role[0]})   
    }, [])
    
    const toggleActive = index => {
        setSelected({...selected, activeObject: selected.role[index]})
        sessionStorage.setItem('session1', selected.role[index]["number"])
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
                    <Navbar.Offcanvas id="offcanvasNavbar" className="mobileSidebar" aria-labelledby="offcanvasNavbarLabel" placement="start">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">
                                    <img src={logo} width={150} alt="Britam" />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <ul className="nav flex-column">
                                    { selected.role !== null && selected.role.map((menuItem, index) => (
                                        <li className='nav-item' key={menuItem.number}>
                                            <Link to={menuItem.link} className={toggleActiveClassStyle(index)} onClick={() => {
                                                toggleActive(index)
                                                document.getElementById('offcanvasNavbar').style.display='none'
                                                document.getElementsByClassName('show')[0].style.display='none'
                                                }} >
                                                <span>{menuItem.icon}</span>{menuItem.name}
                                                {menuItem?.subMenu && (
                                                    <NavDropdown style={{"color": "#fff"}} id="offcanvasNavbarDropdown">
                                                        {menuItem.subMenu.map((sub, index) => (
                                                            <Link to={sub.link} key={index}>
                                                                <NavDropdown.Item href="#action3">{sub.name}</NavDropdown.Item>
                                                            </Link>

                                                        ))}
                                                    </NavDropdown>
                                                )}
                                            </Link>
                                        </li>
                                    ))}                                       
                                </ul>
                            </Nav>
                        </Offcanvas.Body>
                        <footer>
                            <ul>
                                <li><Link to="/admin/settings">My Profile</Link></li>
                                <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                            </ul>
                            <Link to={'/admin/settings'}>
                                <DefaultAvatar />
                                {/* <img src={profile} alt="profile" /> */}
                                <div>
                                    <p>{displayName}</p>
                                    <p style={{"color": "#646464"}}>{user}</p>
                                </div>
                                <div id="eclipse"><div></div><div></div><div></div></div>
                            </Link>
                        </footer>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    )
}