import { useState, useEffect } from 'react'
import useAuth from '../../contexts/Auth'
import { Card, Container, Row, Col, Table} from 'react-bootstrap'
// import BarChart from '../figures/BarChart'
import '../../styles/dashboard.css'
import BarChart from '../../figures/BarChart'
import Header from '../../parts/header/Header'
import { db } from '../../helpers/firebase'
import { getDocs, collection } from 'firebase/firestore'

function Dashboard() {
    const [claims, setClaims] = useState(0)
    const [stickers, setStickers] = useState(13)
    const [policies, setPolicies] = useState(2)
    const [claimNotifications, setClaimNotifications] = useState(27)
    const claimsCollectionRef = collection(db, "claims");

    useEffect(() => {
        document.title = 'Britam - Welcome'
        getClaims()
    }, [])

    const getClaims = async () => {
        const data = await getDocs(claimsCollectionRef);
        setClaims(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

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
                                                <div className="statistics">{`${claims.length}`}</div>
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
                                                <div className="statistics">{`${claims.length}`}</div>
                                                <div className="card-text">Claim Notifications</div>
                                            </Card.Body>
                                        </div>
                                    </div>
                            </Container>
                        </div>

                        <div className="shadow-sm bg-body rounded first-container" style={{padding: "5px", display: "flex", alignItems: "flex-start"}}>
                            {/* Are these supposed to be links or just mere words? */}
                            <div id="short_stats">
                                <h3 className="heading">Latest Clients</h3>
                                <Table responsive borderless style={{width: "100%", border: "none"}}>
                                    <thead>
                                        <tr><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Charles Kasasira</td>
                                            <td>M</td>
                                            <td>charleskasasira01@gmail.com</td>
                                            <td>07053566</td>
                                        </tr>
                                    </tbody>
                                </Table>
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
