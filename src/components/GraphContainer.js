import React from 'react'
import BarChart from '../figures/BarChart'
import { Row, Col} from 'react-bootstrap'

export default function GraphContainer() {
  return (
    <div className="shadow-sm p-3 mb-5 bg-body rounded graph-container" >
        <h5 style={{"display":"flex", "gap": "10px"}}><span>
            <div style={{"width": "20px", "height": "20px", backgroundColor: "#E0E7EC"}}></div>
        </span>Monthly Stickers Issued</h5>
        <Row style={{paddingTop:"3vh", paddingBottom:"2vh", paddingRight:"3vh"}}>
            <Col id="graph-space" className="graph-space" >
                    <BarChart />
            </Col>
        </Row>
        <Row style={{diplay:"flex", justifyContent:"center"}}>
            <Col><h6>Months</h6></Col>
        </Row>
    </div>
  )
}