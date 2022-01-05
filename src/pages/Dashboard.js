import { useState, useEffect } from 'react'
import useAuth from '../contexts/Auth'
import { Card, Container, Row, Col, Table} from 'react-bootstrap'
// import BarChart from '../figures/BarChart'
import '../styles/dashboard.css'
import BarChart from '../figures/BarChart'
import Header from '../parts/header/Header'

function Dashboard() {
    const [claims, setClaims] = useState(0)
    const [stickers, setStickers] = useState(13)
    const [policies, setPolicies] = useState(2)
    const [claimNotifications, setClaimNotifications] = useState(27)
    const { authClaims } = useAuth()

    useEffect(() => {
        document.title = 'Britam - Welcome'
    }, [])

    return (
            <div className='components'>
                <Header title="Welcome to Britam" subtitle="WITH YOU EVERY STEP OF THE WAY" />

                <div className="componentsData" >
                    <div id="first-row" className='mb-5 first-row' style={{display:"flex", width: "100%", justifyContent: "space-between"}}>
                        <div id="bin" className="shadow-sm bg-body rounded first-container">
                            <Container className="row-container">
                                    <div className="col">
                                        <div className="custom-card" style={{"background-color":"#804C75"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${claims}`}</div>
                                                <div className="card-text">Claim Settlement</div>
                                            </Card.Body>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="custom-card" style={{"background-color":"#FFB848"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${policies}`}</div>
                                                <div className="card-text">Policies</div>
                                            </Card.Body>
                                        </div>
                                    </div>
                            </Container>
                            <Container className="row-container">
                                    <div className="col">
                                        <div className="custom-card" style={{"background-color":"#C82E29"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${stickers}`}</div>
                                                <div className="card-text">Stickers</div>
                                            </Card.Body>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="custom-card" style={{"background-color":"#1FBBA6"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${claimNotifications}`}</div>
                                                <div className="card-text">Claim Notifications</div>
                                            </Card.Body>
                                        </div>
                                    </div>
                            </Container>
                        </div>

                        <div className="shadow-sm bg-body rounded first-container" style={{padding: "5px", display: "flex", alignItems: "flex-start"}}>
                            <div id="short_stats">
                                {authClaims.admin && <>
                                    <h5 className="heading">Daily Reports Summary</h5>
                                    <table>
                                        <thead><th>Category</th><th>Grand totals</th></thead>
                                        <tbody>
                                            <tr>
                                                <td>MTP</td><td>UGX ___</td>
                                            </tr>
                                            <tr>
                                                <td>Comprehensive</td><td>UGX ___</td>
                                            </tr>
                                            <tr>
                                                <td>Windscreen</td><td>UGX ___</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </>
                                }
                                {authClaims.supervisor && <>
                                    <h5 className="heading">Latest Agents</h5>
                                    <table>
                                        <thead><th>Name</th><th>Email Address</th></thead>
                                        <tbody>
                                            <tr>
                                                <td>Agent One</td><td>agent1@gmail.com</td>
                                            </tr>
                                            <tr>
                                                <td>Agent Two</td><td>agent2@gmail.com</td>
                                            </tr>
                                            <tr>
                                                <td>Agent Three</td><td>agent3@gmail.com</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </>
                                }
                                {authClaims.agent && <>
                                    <h5 className="heading">Latest Clients</h5>
                                    <table>
                                        <thead>
                                            <tr><th>Name</th><th>Email</th></tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Charles Kasasira</td>
                                                <td>charleskasasira01@gmail.com</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Graph div  */}
                    <div className="shadow-sm p-3 mb-5 bg-body rounded graph-container" >
                        <h5 style={{"display":"flex", "gap": "10px"}}><span>
                            <div style={{"width": "20px", "height": "20px", "background-color": "#E0E7EC"}}></div>
                        </span>Monthly Stickers Issued</h5>
                        <Row style={{paddingTop:"3vh", paddingBottom:"2vh", paddingRight:"3vh"}}>
                            <Col className="graph-space" >
                                    <BarChart />
                            </Col>
                        </Row>
                        <Row style={{diplay:"flex", justifyContent:"center"}}>
                            <Col>Months</Col>
                        </Row>
                    </div>
                </div>  
            </div>
        )
}

export default Dashboard
