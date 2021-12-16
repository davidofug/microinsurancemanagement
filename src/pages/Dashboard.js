import { useState } from 'react'
import { useAuth } from '../contexts/Auth'
import {Link} from 'react-router-dom'
import { Card, Row, Col, Container } from 'react-bootstrap'

function Dashboard() {
    const {currentUser} = useAuth()
    const [claims, setClaims] = useState(0)
    const [stickers, setStickers] = useState(0)
    const [policies, setPolicies] = useState(0)
    const [claimNotifications, setClaimNotifications] = useState(0)

    return (
        <div style={{display:"flex", height:"100%"}}>
            {/* <Link to="/account">Account</Link>   */}
            <div style={{width:"20vw", "background-color":"#FFFFFF"}}>
                Menu Div
            </div>
            
            <div style={{ paddingTop:"5vh", paddingBottom:"5vh", display:"flex", flexDirection:"column", alignItems:"center", width:"80vw", overflow:"hidden" }}>
                <div style={{display:"flex", gap:"2.5vw"}}>
                    <div className="shadow-sm p-3 mb-5 bg-body rounded" style={{ width:"27.688rem", height:"21.875rem", display:"flex", justifyContent:"center", alignItems:"center", "background-color":"#FFFFFF", borderRadius:"0.4rem"}}>
                        <Container style={{display:"flex", "flex-direction":"column", gap: "50px"}}>
                            <Row className="justify-content-center">
                                <Col style={{width:"100%", height:"100%", display:"flex", "justify-content":"center", "align-items":"center"}}>
                                    <Card style={{ width:"7.875rem", height:"6.25rem", "background-color":"#804C75"}}>
                                        <Card.Body style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                                            <div style={{color:"white", fontSize:"18px", fontFamily:"'Roboto', sans-serif'", fontWeight:"bold"}}>{`${claims}`}</div>
                                            <div style={{color:"white", fontSize:"11px", fontFamily:"'Roboto', sans-serif'"}}>Claim Settlement</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col style={{width:"100%", height:"100%", display:"flex", "justify-content":"center", "align-items":"center"}}>
                                    <Card style={{ width:"7.875rem", height:"6.25rem", "background-color":"#C82E29"}}>
                                        <Card.Body style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                                            <div style={{color:"white", fontSize:"18px", fontFamily:"'Roboto', sans-serif'", fontWeight:"bold"}}>{`${stickers}`}</div>
                                            <div style={{color:"white", fontSize:"11px", fontFamily:"'Roboto', sans-serif'"}}>Stickers</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col style={{width:"100%", height:"100%", display:"flex", "justify-content":"center", "align-items":"center"}}>
                                    <Card style={{ width:"7.875rem", height:"6.25rem", "background-color":"#FFB848"}}>
                                        <Card.Body style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                                            <div style={{color:"white", fontSize:"18px", fontFamily:"'Roboto', sans-serif'", fontWeight:"bold"}}>{`${policies}`}</div> 
                                            <div style={{color:"white", fontSize:"11px", fontFamily:"'Roboto', sans-serif'"}}>Policies</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col style={{width:"100%", height:"100%", display:"flex", "justify-content":"center", "align-items":"center"}}>
                                    <Card style={{ width:"7.875rem", height:"6.25rem", "background-color":"#1FBBA6"}}>
                                        <Card.Body style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                                            <div style={{color:"white", fontSize:"18px", fontFamily:"'Roboto', sans-serif'", fontWeight:"bold"}}>{`${claimNotifications}`}</div>
                                            <div style={{color:"white", fontSize:"11px", fontFamily:"'Roboto', sans-serif'"}}>Claim Notifications</div>
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
