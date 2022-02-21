import React from 'react'
import '../styles/dashboard.css'
import { Card } from 'react-bootstrap'

export default function FirstContainer({ claimsSettled, policies, claims}) {
  return (
    <div id="bin" className="shadow-sm bg-body rounded first-container">
        <div /* className="row-container" */ className="card-row-container">
                <div className="col">
                    <div id="custom-card" className="custom-card m-1" style={{backgroundColor:"#804C75"}}>
                        <Card.Body className="card-body">
                            <div className="statistics">{`${claimsSettled.length}`}</div>
                            <div className="card-text">Claim Settlements</div>
                        </Card.Body>
                    </div>
                </div>
                <div  className="col">
                    <div id="custom-card" className="custom-card m-1" style={{backgroundColor:"#FFB848"}}>
                        <Card.Body className="card-body">
                            <div className="statistics">{`${policies.length}`}</div>
                            <div className="card-text">Policies</div>
                        </Card.Body>
                    </div>
                </div>
        </div>
        <div /* className="row-container" className=""*/ className="card-row-container">
                <div className="col">
                    <div id="custom-card"className="custom-card m-1" style={{backgroundColor:"#C82E29"}}>
                        <Card.Body className="card-body">
                            <div className="statistics">{`${policies.length}`}</div>
                            <div className="card-text">Stickers</div>
                        </Card.Body>
                    </div>
                </div>
                <div className="col">
                    <div id="custom-card" className="custom-card m-1" style={{backgroundColor:"#1FBBA6"}}>
                        <Card.Body className="card-body">
                            <div className="statistics">{`${claims.length}`}</div>
                            <div className="card-text">Claim Notifications</div>
                        </Card.Body>
                    </div>
                </div>
        </div>
    </div>
  )
}


