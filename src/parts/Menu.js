import menuData from './menuData'
import '../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'
import profile from '../assets/imgs/image 2.png'
import logo from '../assets/imgs/britam-logo.png'
import CloseIcon from '@mui/icons-material/Close'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline'

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
                <nav className='navbar'>
                    <div id='brand'>
                        <div id="brand_logo">
                            <img src={logo} alt="Britam" />
                            <i onClick={() => setToggeMenu(!toggleMenu)}><CloseIcon /></i>
                        </div>
                        <hr />
                    </div>
                
                    <div id="menu">
                            { selected.menuData.map((object, index) => (
                                            <MenuItem component={Link} to={object.link} id={toggleActiveIdStyle(index)} onClick={() => toggleActive(index)} key={index} >
                                                <i className='icon'>{object.icon}</i> {object.name}
                                            </MenuItem>
                                    )
                                )
                            }
                    </div>

                    
                    <MenuItem component={Link} to={'/settings'} id="account">
                        <img src={profile} alt="profile image" />
                        <p>Charles Kasasira</p>
                        <div id="eclipse"><div></div><div></div><div></div></div>
                    </MenuItem>
                    

                </nav> 
            : 
                <nav className='navbar navbar-m'>
                    <div id='brand-m'>
                        <div id="brand_logo">
                            <i onClick={() => setToggeMenu(!toggleMenu)}><ViewHeadlineIcon/></i>
                        </div>
                        <hr />
                    </div>
                
                    <div id="menu">
                            {
                                selected.menuData.map((object, index) => (
                                        <MenuItem component={Link} to={object.link} id={toggleActiveIdStyle(index)} onClick={() => toggleActive(index)} key={index} >
                                            <i className='icon'>{object.icon}</i>
                                        </MenuItem>
                                    )
                                )
                            }
                    </div>
                
                    <MenuItem component={Link} to={'/settings'} id="account">
                        <img src={profile} alt="profile image" />
                    </MenuItem>

                </nav> 
            }
        </div>
    )
}

export default Menu
