import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import profile from '../../assets/imgs/image 2.png'
import { MdLogout  } from 'react-icons/md'

export default function MinimisedSideBar({role}){

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

    return (
        <>
            <section className='position-sticky pt-3' id="menu_section">
                <ul className="nav flex-column">
                    { selected.role.map((object, index) => (
                        <li className='nav-item' key={index}>
                            <Link to={object.link} className={toggleActiveClassStyle(index)} onClick={() => toggleActive(index)}>
                                <span>{object.icon}</span>
                                {object?.subMenu &&
                                    (<ul>
                                        {object.subMenu.map((sub, index) => (
                                            <li>
                                                <Link to={sub.link} key={index} style={{color: "black"}}>
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
                    
            <footer>
                    <ul>
                        <li><Link to="/admin/settings">Settings</Link></li>
                        <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                    </ul>
                <Link to={'/admin-settings'} id="account">
                    <img src={profile} alt="profile" />
                </Link>
            </footer>

        </>
    )
}