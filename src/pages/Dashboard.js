import { useState } from 'react'
import { useAuth } from '../contexts/Auth'
import {Link} from 'react-router-dom'
import { Card, Row, Col, Container } from 'react-bootstrap'

import '../styles/dashboard.css'

function Dashboard() {
    const {currentUser} = useAuth()
    const [claims, setClaims] = useState(0)
    const [stickers, setStickers] = useState(0)
    const [policies, setPolicies] = useState(0)
    const [claimNotifications, setClaimNotifications] = useState(0)

    return (
        <div className="main">
            {/* <Link to="/account">Account</Link>   */}
            <div id="menu">
                Menu Div
            </div>
            
            <div id="main-container">
                <div style={{display:"flex", gap:"2.5vw"}}>
                    <div className="shadow-sm p-3 mb-5 bg-body rounded" id="first-container">
                        <Container id="row-container">
                            <Row className="justify-content-center">
                                <Col className="col">
                                    <Card className="card" style={{"background-color":"#804C75"}}>
                                        <Card.Body className="card-body">
                                            <div className="statistics">{`${claims}`}</div>
                                            <div className="card-text">Claim Settlement</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="col">
                                    <Card className="card" style={{"background-color":"#C82E29"}}>
                                        <Card.Body className="card-body">
                                            <div className="statistics">{`${stickers}`}</div>
                                            <div className="card-text">Stickers</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col className="col">
                                    <Card className="card" style={{"background-color":"#FFB848"}}>
                                        <Card.Body className="card-body">
                                            <div className="statistics">{`${policies}`}</div> 
                                            <div className="card-text">Policies</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="col">
                                    <Card className="card" style={{"background-color":"#1FBBA6"}}>
                                        <Card.Body className="card-body">
                                            <div className="statistics">{`${claimNotifications}`}</div>
                                            <div className="card-text">Claim Notifications</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="shadow-sm p-3 mb-5 bg-body rounded" style={{ width:"27.688rem", height:"21.875rem", display:"flex", justifyContent:"center", alignItems:"center", "background-color":"#FFFFFF", borderRadius:"0.4rem"}}>    
                    </div>
                </div>
                <div>
                    <h3 style={{alignItems:"bottom"}}>Monthly Stickers</h3>
                </div>

                {/* Graph div  */}
                <div className="shadow-sm p-3 mb-5 bg-body rounded" style={{height:"400px", width:"920px", backgroundColor:"#FFFFFF", borderRadius:"0.4rem"}}>

                </div>     
            </div>            
        </div>
            
    )
}

export default Dashboard
