import menuData from './menuData'
import '../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'
import profile from '../assets/imgs/image 2.png'
import logo from '../assets/imgs/britam-logo.png'
import CloseIcon from '@mui/icons-material/Close'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Menu() {

    const [ selected, setSelected ] = useState({ activeObject: null, menuData })
    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => setSelected({...selected, activeObject: selected.menuData[0]}), [])
    
    const toggleActive = index => setSelected({...selected, activeObject: selected.menuData[index]})

    const toggleActiveIdStyle = index => selected.menuData[index] === selected.activeObject ? "nav-link-active" : "nav-link"

    return (
        <div>
            {toggleMenu === true 
            ?
                <nav className='sidebar'>
                    <div id='brand'>
                            <img src={logo} alt="Britam" />
                            <i onClick={() => setToggeMenu(!toggleMenu)}><ArrowBackIcon /></i>
                    </div>
                
                    <section id="menu_section">
                            { selected.menuData.map((object, index) => (
                                            <MenuItem component={Link} to={object.link} id={toggleActiveIdStyle(index)} onClick={() => toggleActive(index)} key={index} >
                                                <i className='icon'>{object.icon}</i> <span>{object.name}</span>
                                                {object?.subMenu && 
                                                    (<ul>
                                                        {object.subMenu.map((sub, index) => (
                                                            
                                                            <MenuItem component={Link} to={sub.link} className='sub-link' key={index} style={{color: "black"}}>
                                                                {sub.name}
                                                            </MenuItem>
                                                        ))}
                                                    </ul>)
                                                }
                                            </MenuItem>
                                    )
                                )
                            }
                    </section>

                    
                    <footer>
                        <MenuItem component={Link} to={'/settings'} id="account">
                            <img src={profile} alt="profile image" />
                            <p>Charles Kasasira</p>
                            <div id="eclipse"><div></div><div></div><div></div></div>
                        </MenuItem>
                    </footer>
                    

                </nav> 
            : 
                <nav className='sidebar-m'>
                    <section id='brand_m'>
                            <i onClick={() => setToggeMenu(!toggleMenu)}><ArrowForwardIcon/></i>
                    </section>
                
                    <section id="menu_section_m">
                            {
                                selected.menuData.map((object, index) => (
                                        <MenuItem component={Link} to={object.link} id={toggleActiveIdStyle(index)} onClick={() => toggleActive(index)} key={index} >
                                            <i className='icon'>{object.icon}</i>
                                            {object?.subMenu && 
                                                    (<ul>
                                                        {object.subMenu.map((sub, index) => (
                                                            
                                                            <MenuItem component={Link} to={sub.link} className='sub-link' key={index} style={{color: "black"}}>
                                                                {sub.name}
                                                            </MenuItem>
                                                        ))}
                                                    </ul>)
                                                }
                                        </MenuItem>
                                    )
                                )
                            }
                    </section>
                
                    <footer>
                        <MenuItem component={Link} to={'/settings'} id="account">
                            <img src={profile} alt="profile image" />
                        </MenuItem>
                    </footer>

                </nav> 
            }
        </div>
    )
}

export default Menu
