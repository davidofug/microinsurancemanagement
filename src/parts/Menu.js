import profile from '../assets/imgs/image 2.png'
import { useState, useEffect } from 'react'
import logo from '../assets/imgs/britam-logo.png'
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import '../assets/styles/menu.css'

function Menu() {

    const [ selected, setSelected ] = useState({
        activeObject: null,
        objects: [
            {
                name: "Dashboard",
                icon: <AccountBalanceIcon />
            },
            {
                name: "Organisations",
                icon: <BusinessCenterIcon />
            },
            {
                name: "Clients",
                icon: <PersonIcon />
            },
            {
                name: "User Management",
                icon: <PeopleIcon />
            },
            {
                name: "Policies",
                icon: <DirectionsCarIcon />
            },
            {
                name: "Claims",
                icon: <AirlineSeatReclineExtraIcon />
            },
            {
                name: "Reports",
                icon: <AssessmentIcon />
            }
        ]
    })

    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => {
        setSelected({...selected, activeObject: selected.objects[0]})
    }, [])
    
    const toggleActive = (index) => {
        setSelected({...selected, activeObject: selected.objects[index]})
    }

    const toggleActiveStyle = (index) => {
        if(selected.objects[index] === selected.activeObject){
            return "nav-link active"
        }
        else{
            return "nav-link"
        }
    } 

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
                            selected.objects.map((object, index) => (
                                    <li className={toggleActiveStyle(index)} onClick={() => {
                                        toggleActive(index)
                                    }} key={index}>
                                        <i className='icon'>{object.icon}</i>
                                        {object.name}
                                    </li>
                                )
                            )
                        }
                    </ul>
                    
                </div>
                
                <div id="account">
                    <img src={profile} alt="image" />
                    <p>Charles Kasasira</p>
                    <div id="eclipse">
                        <div className='circle'></div>
                        <div className='circle'></div>
                        <div className='circle'></div>
                    </div>
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
                                <li className={toggleActiveStyle(index)} onClick={() => {
                                    toggleActive(index)
                                }} key={index}>
                                    <i>{object.icon}</i>
                                </li>
                            )
                        )
                    }
                </ul>
                
            </div>
            
            <div id="account">
                <img src={profile} alt="image" />
                {/* <div id="eclipse">
                    <div className='circle'></div>
                    <div className='circle'></div>
                    <div className='circle'></div>
                </div> */}
            </div>

            </nav> 
            }
        </div>
    )
}

export default Menu
