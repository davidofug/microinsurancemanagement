import menuData from '../../parts/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import profile from '../../assets/imgs/image 2.png'
import logo from '../../assets/imgs/britam-logo.png'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { index } from 'd3'


function AdminMenu() {

    const { Admin } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, Admin })
    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => {
        if(sessionStorage.getItem('session1')){
            setSelected({...selected, activeObject: selected.Admin[sessionStorage.getItem('session1')-1]})
        }else{
            setSelected({...selected, activeObject: selected.Admin[0]})
        }
        
    }, [])
    
    const toggleActive = index => {
        setSelected({...selected, activeObject: selected.Admin[index]})
        sessionStorage.setItem('session1', selected.Admin[index]["number"])
    }

    



    
    const toggleActiveClassStyle = index => selected.Admin[index] === selected.activeObject ? "nav-linked selected" : "nav-linked"

    return (
        <div>
            {toggleMenu === true 
            ?
                <>
                <div className="sidebar"> 
                        <nav >
                        <div id='brand'>
                                    <img src={logo} alt="Britam" />
                                    <i onClick={() => setToggeMenu(!toggleMenu)}>
                                    <HiOutlineChevronLeft />
                                    </i>
                            </div>
                            <section className='position-sticky pt-3' id="menu_section">
                                    <ul className="nav flex-column">
                                        { selected.Admin.map((object, index) => (
                                                            <li className='nav-item'>
                                                                <Link to={object.link} className={toggleActiveClassStyle(index)} onClick={() => toggleActive(index)} key={index} >
                                                                    <span>{object.icon}</span>{object.name}
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
                                    </ul>
                            </section>
                        
                            <footer>
                                    <ul>
                                        <li><Link to="/admin-settings">My Profile</Link></li>
                                        <li><Link to="/logout">Logout</Link></li>
                                    </ul>
                                <Link to={'/admin-settings'}>
                                    <img src={profile} alt="profile image" />
                                    <div>
                                        <p>Charles Kasasira</p>
                                        <p style={{"color": "#646464"}}>Admin</p>
                                    </div>
                                    <div id="eclipse"><div></div><div></div><div></div></div>
                                </Link>
                            </footer>
                        
                        </nav>
                        </div>
                    
                    </>
                                :
                    <nav className='sidebar-m col-md-3 col-lg-3 d-md-block collapse'>
                        <section id='brand_m'>
                                <i onClick={() => setToggeMenu(!toggleMenu)}>
                                <HiOutlineChevronRight />
                                    </i>
                        </section>
                    
                        <section id="menu_section_m">
                                {
                                    selected.Admin.map((object, index) => (
                                            <li>
                                                <Link to={object.link}  onClick={() => toggleActive(index)} key={index} >
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
