import menuData from '../../parts/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../../assets/imgs/britam-logo.png'
import profile from '../../assets/imgs/anyuru.jpg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'


function SupervisorMenu() {

    const { SuperVisor } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, SuperVisor })
    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => {
        if(sessionStorage.getItem('session1')){
            setSelected({...selected, activeObject: selected.SuperVisor[sessionStorage.getItem('session1')-1]})
        }else{
            setSelected({...selected, activeObject: selected.SuperVisor[0]})
        }
        
    }, [])

    const toggleActive = index => {
        setSelected({...selected, activeObject: selected.SuperVisor[index]})
        sessionStorage.setItem('session1', selected.SuperVisor[index]["number"])
    }

    const toggleActiveClassStyle = index => selected.SuperVisor[index] === selected.activeObject ? "nav-linked selected" : "nav-linked"

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
                
                    <section className='position-sticky pt-3' id="menu_section">
                    <ul className="nav flex-column">
                            { selected.SuperVisor.map((object, index) => (
                                                <li className='nav-item' key={index}>
                                                    <Link to={object.link} className={toggleActiveClassStyle(index)} onClick={() => toggleActive(index)} key={index} >
                                                        <span>{object.icon}</span>{object.name}
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
                            </ul>
                    </section>

                    
                    <footer>
                            <ul>
                                <li><Link to="/supervisor-settings">My Profile</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </ul>
                        <Link to={'/supervisor-settings'}>
                            <img src={profile} alt="profile" />
                            <div>
                                <p>Anyuru David Derrick</p>
                                <p style={{"color": "#646464"}}>Supervisor</p>
                            </div>
                            <div id="eclipse"><div></div><div></div><div></div></div>
                        </Link>
                    </footer>
                    

                </nav> 
            : 
                <nav className='sidebar-m'>
                    <div id='brand_m'>
                            <i onClick={() => setToggeMenu(!toggleMenu)}>
                            <HiOutlineChevronRight />
                                </i>
                    </div>
                
                    <section className='position-sticky pt-3' id="menu_section_m">
                        <ul className="nav flex-column">
                            { selected.SuperVisor.map((object, index) => (
                                        <li className='nav-item' key={index}>
                                            <Link to={object.link} className={toggleActiveClassStyle(index)} onClick={() => toggleActive(index)} key={index} >
                                                <span>{object.icon}</span>
                                                
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
                        </ul>
                    </section>
                
                    <footer>
                            <ul>
                                <li><Link to="/supervisor-settings">Settings</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </ul>
                        <Link to={'/settings'} id="account">
                            <img src={profile} alt="profile" />
                        </Link>
                    </footer>

                </nav> 
            }
        </div>
    )
}

export default SupervisorMenu
