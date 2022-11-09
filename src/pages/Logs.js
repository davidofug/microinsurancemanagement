import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Header from '../components/header/Header'
import { addDoc, collection, doc, getDocs, updateDoc} from 'firebase/firestore'
import { authentication, db } from '../helpers/firebase'
import Loader from '../components/Loader'
import { RiCalendarTodoFill } from 'react-icons/ri'
import Chat from '../components/messenger/Chat'
import { convertStringToDate, timeConvert } from '../helpers/helpfulUtilities'
import "../styles/ctas.css"


function Logs({parent_container}) {

    useEffect(() => {document.title = 'Logtrails - SWICO'; getLogs()}, [])

    const [ logID, setLogID ] = useState(null)
    const [ attendence, setAttendence] = useState([])
    const [ todayAttendence, setTodayAttendence] = useState({
        checkin: ""
    })

    // initialising the logs doc.
    const logRef = collection(db, "provisions")
    const getLogs = async() => {
        const data = await getDocs(logRef);
        const allAttendence = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(attendance => attendance.uid === authentication.currentUser.uid).filter(attendence => attendence.checkin).sort((a, b) => convertStringToDate(b.checkin) - convertStringToDate(a.checkin))

        if(allAttendence.length > 0){  
            setAttendence(allAttendence)
            setLogID(allAttendence[0].id)
            setTodayAttendence(allAttendence[0])
        } else {
            setAttendence(null)
        } 
            
    }

    const submitLogin = async () => {
        await addDoc(logRef, {
                uid: authentication.currentUser.uid,
                checkin: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
                checkout: ""
        })
        .then((docRef) => {
            console.log(docRef.id)
        })
        getLogs()
    }

    const submitLogout = async () => {
        const logDoc = doc(db, 'provisions', logID)
        const checkoutDate = `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`
        await updateDoc(logDoc, {
                checkout: checkoutDate
        })
        .then((result) => {
            
        })
        getLogs()
    }

    return (
        <div className='components'>
            <Header title="Logs" subtitle="USER LOG TRAILS" />


            <div id="add_client_group">
                {attendence !== null && attendence.length > 0
                ?
                    new Date().toISOString().slice(0, 10) !== todayAttendence.checkin.slice(0, 10)
                    ?
                        <button onClick={() => {
                            submitLogin()
                        }} className='btn cta mb-2'>check in</button>
                        
                    :
                    (new Date().toISOString().slice(0, 10)) !== todayAttendence?.checkout.slice(0, 10) ?
                        <button onClick={() => {
                            submitLogout()
                            
                        }} className='btn cta mb-2'>check out</button>
    
                        :
                            <div style={{backgroundColor: "#fff", width: "95%", margin: "10px 0", padding: "10px", border: "1px solid #dedee0", borderLeft: "5px solid #00a32a", borderRight: "1px solid #dedee0"}}>
                                <p className='m-1'>You have checked out</p>
                            </div>
                :
                    <button onClick={() => {
                        submitLogin()
                    }} className='btn cta'>check in</button>
                }
                <div></div>
            </div>
                
                
                

            {attendence !== null && attendence.length > 0
            ?
                <div className="shadow-sm table-card componentsData mb-3"> 
                    <Table striped hover responsive>
                        <thead>
                            <tr><th>Check in</th><th>Check out</th><th>Duration</th></tr>
                        </thead>

                        <tbody>

                            {attendence.map(attend => (
                                <tr key={attend.id}>
                                    <td>{attend.checkin}</td>
                                    <td>{!attend.checkout ? "Didn't check out" : attend.checkout}</td>
                                    <td>{!attend.checkout ? "Can not be determined!" 
                                        : `${timeConvert((new Date(attend.checkout) - new Date(attend.checkin))/1000/60)}`}
                                    </td>
                                </tr>
                            ))}
                                    
                        </tbody>

                        <tfoot>
                        <tr><th>Check in</th><th>Check out</th><th>Duration</th></tr>
                        </tfoot>
                    </Table>
                </div>
            :
                attendence === null
                ?
                <div className="no-table-data">
                    <i><RiCalendarTodoFill /></i>
                    <h4>No Log trails yet</h4>
                    <p>You have never checked</p>
                </div>
                :
                <Loader />
            }
            <div style={{width:"100%", position:"fixed", bottom:"0px", display:"flex", justifyContent:"flex-end"}} className={parent_container?"chat-container":"expanded-menu-chat-container"}>
              <Chat />
            </div> 
        </div>
    )
}

export default Logs
