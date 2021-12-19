import menuData from '../../parts/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import profile from '../../assets/imgs/image 2.png'
import logo from '../../assets/imgs/britam-logo.png'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'


function AgentMenu() {

    const { Agent } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, Agent })
    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => {
        if(sessionStorage.getItem('session1')){
            setSelected({...selected, activeObject: selected.Agent[sessionStorage.getItem('session1')-1]})
        }else{
            setSelected({...selected, activeObject: selected.Agent[0]})
        }
        
    }, [])
    
    const toggleActive = index => {
        setSelected({...selected, activeObject: selected.Agent[index]})
        sessionStorage.setItem('session1', selected.Agent[index]["number"])
    }

    const toggleActiveClassStyle = index => selected.Agent[index] === selected.activeObject ? "nav-linked selected" : "nav-linked"

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
                                { selected.Agent.map((object, index) => (
                                                    <li>
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
                                <li><Link to="/agent-settings">My Profile</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </ul>
                        <Link to={'/agent-settings'}>
                            <img src={profile} alt="profile image" />
                            <div>
                                <p>Charles Kasasira</p>
                                <p style={{"color": "#646464"}}>Agent</p>
                            </div>
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
                
                    <section className='position-sticky pt-3' id="menu_section_m">
                        <ul className="nav flex-column">
                            {
                                selected.Agent.map((object, index) => (
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
                                <li><Link to="/agent-settings">Settings</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </ul>
                        <Link to={'/agent-settings'} id="account">
                            <img src={profile} alt="profile image" />
                        </Link>
                    </footer>

                </nav> 
            }
        </div>
    )
}

export default AgentMenu
