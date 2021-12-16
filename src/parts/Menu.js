import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import profile from '../assets/imgs/image 2.png'
import logo from '../assets/imgs/britam-logo.png'
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import '../assets/styles/menu.css'

function Menu() {

    const [ selected, setSelected ] = useState({
        activeObject: null,
        objects: [
            {
                name: "Dashboard",
                icon: <AccountBalanceIcon />,
                link: "dashboard"
            },
            {
                name: "Organisations",
                icon: <BusinessCenterIcon />,
                link: "organisations"
            },
            {
                name: "Clients",
                icon: <PersonIcon />,
                link: "clients"
            },
            {
                name: "User Management",
                icon: <PeopleIcon />,
                link: "user"
            },
            {
                name: "Policies",
                icon: <DirectionsCarIcon />,
                link: "policies"
            },
            {
                name: "Claims",
                icon: <AirlineSeatReclineExtraIcon />,
                link: "claims"
            },
            {
                name: "Reports",
                icon: <AssessmentIcon />,
                link: "reports"
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

    const dropDown = (index) => {
        if(selected.objects[index] === selected.objects[4]){
            console.log('Policies context')
        }
        else if(selected.objects[index] === selected.objects[3]){
            console.log('User Management context')
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
                                    <Link to={`${object.link}`} className={toggleActiveStyle(index)} onClick={() => {
                                        toggleActive(index)
                                        dropDown(index)
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
