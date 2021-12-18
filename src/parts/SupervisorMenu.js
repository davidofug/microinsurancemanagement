import menuData from './menuData'
import '../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../assets/imgs/britam-logo.png'
import profile from '../assets/imgs/anyuru.jpg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'


function SupervisorMenu() {

    const { SuperVisor } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, SuperVisor })
    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => setSelected({...selected, activeObject: selected.SuperVisor[0]}), [])
    
    const toggleActive = index => setSelected({...selected, activeObject: selected.SuperVisor[index]})

    const toggleActiveIdStyle = index => selected.SuperVisor[index] === selected.activeObject ? "nav-link-active" : "nav-link"

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
                            { selected.SuperVisor.map((object, index) => (
                                                <li key={index}>
                                                    <Link to={object.link} id={toggleActiveIdStyle(index)} onClick={() => toggleActive(index)} key={index} >
                                                        <i className='icon'>{object.icon}</i> <span>{object.name}</span>
                                                        {object?.subMenu &&
                                                            (<ul>
                                                                {object.subMenu.map((sub, index) => (
                                                                    <li key={index}>
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
                                <li><Link to="/supervisor-settings">My Profile</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </ul>
                        <Link to={'/supervisor-settings'}>
                            <img src={profile} alt="profile image" />
                            <p>Anyuru David Derrick</p>
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
                                selected.SuperVisor.map((object, index) => (
                                        <li key={index}>
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
                                <li><Link to="/supervisor-settings">Settings</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </ul>
                        <Link to={'/settings'} id="account">
                            <img src={profile} alt="profile image" />
                        </Link>
                    </footer>

                </nav> 
            }
        </div>
    )
}

export default SupervisorMenu
