import React from 'react'
import { useAuth } from '../contexts/Auth'
import {Link} from 'react-router-dom'
import { Card, Row, Col, Container } from 'react-bootstrap'

function Dashboard() {
    const {currentUser} = useAuth()
    return (
        <div style={{display:"flex", height:"100%"}}>
            {/* <Link to="/account">Account</Link>   */}
            <div style={{width:"20vw", "background-color":"#FFFFFF"}}>
                Menu Div
            </div>
            
            <div style={{ paddingTop:"5vh", paddingBottom:"5vh", display:"flex", flexDirection:"column", alignItems:"center", width:"80vw", border:"1px solid red", overflow:"hidden" }}>
                <div style={{display:"flex", gap:"2.5vw"}}>
                    <div className="shadow-sm p-3 mb-5 bg-body rounded" style={{ width:"27.688rem", height:"21.875rem", display:"flex", justifyContent:"center", alignItems:"center", "background-color":"#FFFFFF", borderRadius:"0.4rem"}}>
                        <Container style={{display:"flex", "flex-direction":"column", gap: "50px"}}>
                            <Row className="justify-content-center">
                                <Col style={{width:"100%", height:"100%", display:"flex", "justify-content":"center", "align-items":"center"}}>
                                    <Card style={{ width:"7.875rem", height:"6.25rem", "background-color":"#804C75"}}/>
                                </Col>
                                <Col style={{width:"100%", height:"100%", display:"flex", "justify-content":"center", "align-items":"center"}}>
                                    <Card style={{ width:"7.875rem", height:"6.25rem", "background-color":"#C82E29"}}/>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col style={{width:"100%", height:"100%", display:"flex", "justify-content":"center", "align-items":"center"}}>
                                    <Card style={{ width:"7.875rem", height:"6.25rem", "background-color":"#FFB848"}}/>
                                </Col>
                                <Col style={{width:"100%", height:"100%", display:"flex", "justify-content":"center", "align-items":"center"}}>
                                    <Card style={{ width:"7.875rem", height:"6.25rem", "background-color":"#1FBBA6"}}/>
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
