import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MdLogout  } from 'react-icons/md'
import DefaultAvatar from '../DefaultAvatar'
import { Badge } from 'react-bootstrap'

export default function SideBar({role, user, displayName}){

    const [ selected, setSelected ] = useState({ activeObject: null, role })
    // const [ toggleMenu, setToggeMenu ] = useState(true)

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
                    { selected.role.map((menuItem, index) => (
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
                    ))}
                </ul>
            </section>
        </>
    )
}