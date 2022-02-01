import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Header from '../components/header/Header'
import useDialog from '../hooks/useDialog'
import { addDoc, collection, getDoc, doc, getDocs, updateDoc} from 'firebase/firestore'
import { authentication, db } from '../helpers/firebase'
import Loader from '../components/Loader'
import { ImFilesEmpty } from 'react-icons/im'
import { RiCalendarTodoFill } from 'react-icons/ri'

function Logs() {

    useEffect(() => {document.title = 'Britam - Logtrails'; getLogs()}, [])

    const [ logID, setLogID ] = useState(null)

    const [ attendence, setAttendence] = useState([])
    const [ todayAttendence, setTodayAttendence] = useState({
        checkin: ""
    })

    // initialising the logs doc.
    const logRef = collection(db, "provisions");

    const convertStringToDate = (stringDate) => {
        return new Date(stringDate)
    }

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
        await addDoc(logRef, 
            {
                uid: authentication.currentUser.uid,
                checkin: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
                checkout: "",
                duration: ""
            }
        )
        .then((docRef) => {
            console.log(docRef.id)
        })
        getLogs()
    }

    const submitLogout = async () => {
        const logDoc = doc(db, 'provisions', logID)
        const checkoutDate = `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`
        await updateDoc(logDoc, 
            {
                checkout: checkoutDate,
                duration: ""
            }
        )
        .then((result) => {
            
        })
        getLogs()
    }

    console.log(Math.round((new Date(todayAttendence.checkout).getTime() - new Date(todayAttendence.checkin).getTime())/1000/60))

    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + " hour(s) and " + rminutes + " minute(s).";
    }

    console.log(todayAttendence)

    return (
        <div className='components'>
            <Header title="Logs" subtitle="USER LOG TRAILS" />


                {attendence !== null && attendence.length > 0
                ?
                    new Date().toISOString().slice(0, 10) !== todayAttendence.checkin.slice(0, 10)
                    ?
                        <button onClick={() => {
                            submitLogin()
                        }} className='btn btn-primary cta'>check in</button>
                        
                    :
                    (new Date().toISOString().slice(0, 10)) !== todayAttendence?.checkout.slice(0, 10) ?
                        <button onClick={() => {
                            submitLogout()
                            
                        }} className='btn btn-primary cta'>check out</button>
    
                        :
                            <div style={{backgroundColor: "#fff", width: "95%", margin: "10px 0", padding: "10px", border: "1px solid #dedee0", borderLeft: "5px solid #00a32a", borderRight: "1px solid #dedee0"}}>
                                <p className='m-1'>You have checked out</p>
                            </div>
                :
                    <button onClick={() => {
                        submitLogin()
                    }} className='btn btn-primary cta'>check in</button>
                }
                
                
                

            {attendence !== null && attendence.length > 0
            ?
                <div className="shadow-sm table-card componentsData"> 
                    <Table striped hover responsive>
                        <thead>
                            <tr><th>Check in</th><th>Check out</th><th>Duration</th></tr>
                        </thead>

                        <tbody>

                            {attendence.map(attend => (
                                <tr>
                                    <td>{attend.checkin}</td>
                                    <td>{!attend.checkout ? "Didn't check out" : attend.checkout}</td>
                                    <td>{!attend.checkout ? "Can not be determined!" 
                                        : `${timeConvert(Math.round((new Date(attend.checkout) - new Date(attend.checkin))/1000/60))}`}
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
            
        </div>
    )
}

export default Logs
