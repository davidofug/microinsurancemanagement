import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/Auth'
import {Link} from 'react-router-dom'
import Menu from '../parts/Menu'
import { Card, Container } from 'react-bootstrap'

import '../styles/Dashboard.css'


function Dashboard() {
    const {currentUser} = useAuth()
    const [claims, setClaims] = useState(0)
    const [stickers, setStickers] = useState(13)
    const [policies, setPolicies] = useState(2)
    const [claimNotifications, setClaimNotifications] = useState(27)

    useEffect(() => {
        document.title = 'Britam - Welcome'
    }, [])

    return (

            <div>
                <div>
                    <h1 className='title'>Welcome, Charles</h1>
                    <p className="subtitle">With you every step of the way</p>
                </div>
                        <div className="main">
                {/* <Link to="/account">Account</Link>   */}
                
                
                <div id="main-container">
                    <div style={{display:"flex", gap:"2.5vw"}}>
                        <div className="shadow-sm p-3 mb-5 bg-body rounded" id="first-container">
                            <Container id="row-container">
                                <div style={{display:"flex", gap:"20px"}}>
                                    <div className="col">
                                        <Card className="card" style={{"background-color":"#804C75"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${claims}`}</div>
                                                <div className="card-text">Claim Settlement</div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className="col">
                                        <Card className="card" style={{"background-color":"#C82E29"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${stickers}`}</div>
                                                <div className="card-text">Stickers</div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                                <div style={{display:"flex", gap:"20px"}}>
                                    <div className="col">
                                        <Card className="card" style={{"background-color":"#FFB848"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${policies}`}</div>
                                                <div className="card-text">Policies</div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className="col">
                                        <Card className="card" style={{"background-color":"#1FBBA6"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${claimNotifications}`}</div>
                                                <div className="card-text">Claim Notifications</div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <div className="shadow-sm p-3 mb-5 bg-body rounded summaries">
                            {/* Are these supposed to be links or just mere words? */}
                            <div style={{padding:"7vh 5vh", display:"flex", flexDirection:"column", gap:"20px"}}>
                                <div>Agent issued reports</div>
                                <div>Grand totals</div>
                            </div>
                
                        </div>
                    </div>
                    <div id="title">
                        <div style={{alignItems:"bottom"}}>Monthly Stickers</div>
                    </div>
                    {/* Graph div  */}
                    <div className="shadow-sm p-3 mb-5 bg-body rounded graph-container">
                    </div>
                </div>            
                        </div>
            </div>        
    )
}

export default Dashboard
