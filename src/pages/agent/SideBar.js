import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MdLogout  } from 'react-icons/md'
import DefaultAvatar from '../../components/DefaultAvatar'
import { Badge, Dropdown, DropdownButton } from 'react-bootstrap'
import { MdAccountBalance, MdPerson, MdPeople, MdDirectionsCarFilled, MdAirlineSeatReclineExtra, MdAssessment, MdOutlinePowerSettingsNew, MdSettings } from 'react-icons/md'

export default function SideBar({role, user, displayName}){

    const [ selected, setSelected ] = useState({ activeObject: null, role })
    const [ toggleMenu, setToggeMenu ] = useState(true)

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

    console.log(window.location.pathname)

    return (
        <>
            <section className='position-sticky pt-3' id="menu_section">
                <ul className="nav flex-column">
                    {/* { selected.role.map((menuItem, index) => (
                        <li className='nav-item' key={menuItem.number}>
                            <Link to={menuItem.link} className={toggleActiveClassStyle(index)} onClick={() => toggleActive(index)} >
                                <span>{menuItem.icon}</span>{menuItem.name}
                                {menuItem?.subMenu &&
                                    (<ul>
                                        {menuItem.subMenu.map((sub, index) => (
                                            <li key={index}>
                                                <Link to={sub.link} style={{color: "black"}}>
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>)
                                }
                            </Link>
                        </li>
                    ))} */}
                    { selected.role.map((menuItem, index) => (
                        <li className='nav-item'>
                        {menuItem.link ? 
                            <Link to={menuItem.link} className={toggleActiveClassStyle(index)} onClick={() => toggleActive(index)}>
                            <span>{menuItem.icon}</span>{menuItem.name}
                            </Link>
                        : 
                        <>
                            <details className={`${toggleActiveClassStyle(index)} dropdown`} onClick={() => toggleActive(index)}>
                                <summary role="button" className='buttonDetail' >
                                    <a ><span>{menuItem.icon}</span>{menuItem.name}</a>
                                </summary>
                                <ul>
                                        {menuItem.subMenu.map((sub, index) => (
                                            <li key={index}>
                                                <Link to={sub.link} style={{color: "black"}}>
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                            </details>
                                    
                                </>
                        }
                        
                    </li>
                    
                    ))}
                    {/* <li className='nav-item'>
                        <Link to='/agent/clients' className='nav-linked'><span><MdPerson /></span>Clients</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/agent/view-log-trail' className='nav-linked'><span><MdPeople /></span>User Management</Link>
                    </li>
                    <li className='nav-item'>
                            <div className="nav-linked"><span style={{margin: "0 20px"}}><MdDirectionsCarFilled /></span>Policies</div>
                            <div class="dropdown-content">
                                <Link to='/agent/motor-third-party'>MTP</Link>
                                <Link to='/agent/comprehensive'>Comprehensive</Link>
                                <Link to='/agent/windscreen'>Windscreen</Link>
                            </div>
                    </li>
                    <li className='nav-item'>
                        <Link to='/agent/claims' className='nav-linked'><span><MdAirlineSeatReclineExtra /></span>Claims</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/agent/reports' className='nav-linked'><span><MdAssessment /></span>Reports</Link>
                    </li>
                    <li className='nav-item' style={{marginTop: "5rem", borderTop: "1px solid #c6c7c8", borderBottom: "1px solid #c6c7c8"}}>
                        <Link to='/agent/settings' className='nav-linked'><span><MdSettings /></span>Account Settings</Link>
                    </li> */}
                    
                </ul>
            </section>
            
            

            <footer>
                <ul>
                    <li><Link to={`/${user}/settings`}>My Profile</Link></li>
                    <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                </ul>
                <Link to='/admin/settings'>
                    <DefaultAvatar />
                    {/* <img src={profile} alt="profile" /> */}
                    <div>
                        <p>{displayName}</p>
                        <p style={{"color": "#646464"}}><Badge >{user}</Badge></p>
                    </div>
                    <div id="eclipse"><div></div><div></div><div></div></div>
                </Link>
            </footer>

        </>
    )
}