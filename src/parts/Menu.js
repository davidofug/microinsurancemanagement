import menuData from './menuData'
import '../assets/styles/menu.css'
import { Link } from 'react-router-dom'
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
    const toggleActiveStyle = index => selected.menuData[index] === selected.activeObject ? "nav-link active" : "nav-link"

    return (
        <div>
            {toggleMenu === true ?
                <nav className='navbar'>
                <div id='brand'>
                    <div id="brand_logo">
                        <img src={logo} alt="Britam" />
                        <i onClick={() => {
                            setToggeMenu(!toggleMenu)
                        }}><CloseIcon /></i>
                    </div>
                    <hr />
                </div>
                
                <div id="menu">
                    <ul>
                        {
                            selected.menuData.map((object, index) => (
                                    <Link to={`${object.link}`} className={toggleActiveStyle(index)} onClick={() => {
                                        toggleActive(index)
                                    }} key={index}>
                                        <i className='icon'>{object.icon}</i>
                                        {object.name}
                                    </Link>
                                )
                            )
                        }
                    </ul>
                    
                </div>
                
                <div >
                    <Link to="settings" id="account">
                        <img src={profile} alt="image" />
                        <p style={{"color": "black"}}>Charles Kasasira</p>
                        <div id="eclipse">
                            <div className='circle'></div>
                            <div className='circle'></div>
                            <div className='circle'></div>
                        </div>
                    </Link>
                </div>

                </nav> 
            : 
            <nav className='navbar navbar-m'>
            <div id='brand-m'>
                <div id="brand_logo">
                    <i onClick={() => {
                        setToggeMenu(!toggleMenu)
                    }}><ViewHeadlineIcon/></i>
                </div>
                <hr />
            </div>
            
            <div id="menu">
                <ul>
                    {
                        selected.objects.map((object, index) => (
                                <Link to={`${object.link}`} className={toggleActiveStyle(index)} onClick={() => {
                                    toggleActive(index)
                                }} key={index}>
                                    <i>{object.icon}</i>
                                </Link>
                            )
                        )
                    }
                </ul>
                
            </div>
            
            <div id="account">
                <Link to="settings" id="account">
                    <img src={profile} alt="image" />
                </Link>
            </div>

            </nav> 
            }
        </div>
    )
}

export default Menu
