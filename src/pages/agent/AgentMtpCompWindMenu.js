import menuData from '../../components/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../../assets/imgs/britam-logo2.png'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import MobileNav from '../../components/menu/MobileNav'
import SideBar from '../../components/menu/SideBar'
import MinimisedSideBar from '../../components/menu/MinimisedSideBar'
import { authentication } from "../../helpers/firebase";
import { MdLogout } from 'react-icons/md'
import DefaultAvatar from '../../components/DefaultAvatar'
import { Badge } from 'react-bootstrap'
import { ImProfile } from 'react-icons/im'
import useAuth from '../../contexts/Auth'

function AgentMtpCompWindMenu({setLargeContentClass, largeContentClass}) {

    const { Agent_mtp_comprehensive_windscreen } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, Agent_mtp_comprehensive_windscreen })
    const [ toggleMenu, setToggeMenu ] = useState(true)
    const [ openFooterContext, setOpenFooterContext ] = useState(false)

    console.log(authentication.currentUser)

    return (
        <div className='menuSide'>
            <MobileNav role={Agent_mtp_comprehensive_windscreen} user="agent" displayName={authentication?.currentUser?.displayName}/>
            {toggleMenu === true 
            ?
                    <nav className="sidebar">
                        <div id='brand'>
                            <img src={logo} width={150} alt="Britam" />
                            <div id="arrowCircle" onClick={() => {
                                    setToggeMenu(!toggleMenu)
                                    setLargeContentClass(!largeContentClass)
                                    }}>
                                    
                                        <HiOutlineChevronLeft style={{color: "#c6c7c8", fontSize: "15px"}}/>
                                    
                                    
                            </div>
                        </div>
                        <SideBar role={Agent_mtp_comprehensive_windscreen} user="agent" displayName={authentication?.currentUser?.displayName} />

                        <footer>
                            {/* <Link to='/admin/settings'> */}
                            <div className="footerContext" onClick={() => setOpenFooterContext(!openFooterContext)}>
                                <DefaultAvatar />
                                <div>
                                    <p style={{"fontWeight": "500", "fontSize": "1.05rem"}}>{authentication?.currentUser?.displayName}</p>
                                    <p style={{"color": "#646464"}}>
                                        <Badge color='black'>agent</Badge>
                                    </p>
                                </div>
                                <h3 style={{color: "#000"}}>&hellip;</h3>
                            </div>
                            {/* </Link> */}
                            <ul className={openFooterContext ? "footerContextShow" : ""} id="contextUl">
                                <li><Link to="/agent/settings"><ImProfile /> My Profile</Link></li>
                                <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                            </ul>
                        </footer>

                    </nav>
            : 
            <nav className='sidebar-m'>
                <section id='brand_m'>
                    <div id="arrowOutCircle" onClick={() => {
                        setToggeMenu(!toggleMenu)
                        setLargeContentClass(!largeContentClass)
                        }}>
                        
                            <HiOutlineChevronRight style={{color: "#c6c7c8", fontSize: "15px"}}/>
                        
                        
                </div>
                </section>
                <MinimisedSideBar role={Agent_mtp_comprehensive_windscreen}/>
                <footer>
                        <ul>
                            <li><Link to="/admin/settings">Settings</Link></li>
                            <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                        </ul>
                    <Link to={'/admin-settings'} id="account">
                        <DefaultAvatar />
                    </Link>
                </footer>
            </nav>
}
        </div>
    )
}

export default AgentMtpCompWindMenu