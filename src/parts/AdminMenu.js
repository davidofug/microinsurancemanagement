import menuData from './menuData'
import '../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import profile from '../assets/imgs/image 2.png'
import logo from '../assets/imgs/britam-logo.png'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'


function AdminMenu() {

    const { Admin } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, Admin })
    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => setSelected({...selected, activeObject: selected.Admin[0]}), [])
    
    const toggleActive = index => setSelected({...selected, activeObject: selected.Admin[index]})

    const toggleActiveIdStyle = index => selected.Admin[index] === selected.activeObject ? "nav-link-active" : "nav-link"

    return (
        <div>
            {toggleMenu === true 
            ?
                <nav className='sidebar'>
                    <div id='brand'>
                            <img src={logo} alt="Britam" />
                            <i onClick={() => setToggeMenu(!toggleMenu)}>
                            <HiOutlineChevronLeft />
                            </i>
                    </div>
                
                    <section id="menu_section">
                            { selected.Admin.map((object, index) => (
                                                <li>
                                                    <Link to={object.link} id={toggleActiveIdStyle(index)} onClick={() => toggleActive(index)} key={index} >
                                                        <i className='icon'>{object.icon}</i> <span>{object.name}</span>
                                                        {object?.subMenu &&
                                                            (<ul>
                                                                {object.subMenu.map((sub, index) => (
                                                                    <li>
                                                                        <Link to={sub.link} key={index} style={{color: "black"}}>
                                                                            {sub.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>)
                                                        }
                                                    </Link>
                                                </li>
                                    )
                                )
                            }
                    </section>

                    
                    <footer>
                            <ul>
                                <li><Link to="/admin-settings">My Profile</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </ul>
                        <Link to={'/admin-settings'}>
                            <img src={profile} alt="profile image" />
                            <p>Charles Kasasira</p>
                            <div id="eclipse"><div></div><div></div><div></div></div>
                        </Link>
                    </footer>
                    

                </nav> 
            : 
                <nav className='sidebar-m'>
                    <section id='brand_m'>
                            <i onClick={() => setToggeMenu(!toggleMenu)}>
                            <HiOutlineChevronRight />
                                </i>
                    </section>
                
                    <section id="menu_section_m">
                            {
                                selected.Admin.map((object, index) => (
                                        <li>
                                            <Link to={object.link} id={toggleActiveIdStyle(index)} onClick={() => toggleActive(index)} key={index} >
                                                <i className='icon'>{object.icon}</i>
                                                
                                                    {object?.subMenu &&
                                                            (<ul>
                                                                {object.subMenu.map((sub, index) => (
                                                                    <Link to={sub.link} className='sub-link' key={index} style={{color: "black"}}>
                                                                        {sub.name}
                                                                    </Link>
                                                                ))}
                                                            </ul>)
                                                        }
                                                
                                            </Link>
                                        </li>
                                    )
                                )
                            }
                    </section>
                
                    <footer>
                            <ul>
                                <li><Link to="/admin-settings">Settings</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </ul>
                        <Link to={'/admin-settings'} id="account">
                            <img src={profile} alt="profile image" />
                        </Link>
                    </footer>

                </nav> 
            }
        </div>
    )
}

export default AdminMenu