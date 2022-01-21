import {useState, useEffect } from 'react'
import { db } from '../helpers/firebase'
import { authentication } from '../helpers/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../helpers/firebase'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import useAuth from '../contexts/Auth'


function BarChart () {
    const { authClaims } = useAuth()
    // const [ users, setUsers ] = useState([]) 
    const [ sales, setSales ] = useState(
        {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        }
    )
    
    const monthlySales = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
    }


    
    useEffect(
        async(obj=monthlySales) => {
            setSales(await generateGraphData(await getPolicies(collection(db, "policies"))))
            
            const listUsers = httpsCallable(functions,'listUsers')
            listUsers().then(({ data }) => {
                console.log(data)
                if(authClaims?.supervisor) {
                    const agentsIDs = data.filter( user => user?.role?.agent === true && user?.meta?.added_by_uid === authentication.currentUser.uid).map(user => user.uid)
                    console.log(agentsIDs)
                    console.log(authentication.currentUser.uid)

                } else if (authClaims?.admin) {
                    const agentsIDs = data.filter( user => user?.role?.agent === true && user?.meta?.added_by_uid === authentication.currentUser.uid).map(user => user.uid)
                    const supervisorIDs = data.filter( user => user?.role?.supervisor === true && user?.meta?.added_by_uid === authentication.currentUser.uid).map(user => user.uid)

                    let agentsBySupervisors = []
                    supervisorIDs.forEach(ID => {
                        const agents = data.filter(user => user?.role?.agent === true && user?.meta?.added_by_uid === ID)
                        agentsBySupervisors.push(...[...agents])   
                    })
                    const agentBySupervisorsIDs = agentsBySupervisors.map(agentBySupervisor => agentBySupervisor.uid)
                    const usersIDsByAddedByAdmins = [...agentBySupervisorsIDs, ...agentsIDs]
                    console.log(usersIDsByAddedByAdmins)
                
                } else if (authClaims?.agent) {
                    console.log([authentication.currentUser.uid])
                }
            }).catch((error) => {
                console.log(error)
            })
        }, [])
        
    
    const getPolicies = async (policyCollectionRef) => {
        const data = await getDocs(policyCollectionRef);
        const allPolicies = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        return allPolicies.filter(policy => policy.added_by_uid === authentication.currentUser.uid)
    }

   
    
    const generateGraphData = async (policyArray, obj={...monthlySales}) => {
        // console.log(policyArray)
        policyArray.forEach( policy => {
            const {created_at} = policy
            if(policy?.created_at ) {
                const { created_at } = policy
                switch(moment.unix(created_at.seconds).toDate().getMonth()) {
                    case 0:
                        obj.January += policy.stickersDetails.length
                        break;
                    case 1:
                        obj.February += policy.stickersDetails.length
                        break;
                    case 2:
                        obj.March += policy.stickersDetails.length
                        break;
                    case 3:
                        obj.April += policy.stickersDetails.length
                        break;
                    case 4: 
                        obj.May += policy.stickersDetails.length
                        break;
                    case 5:
                        obj.June += policy.stickerDetails.length
                        break;
                    case 6: 
                        obj.July += policy.stickerDetails.length
                        break;
                    case 7:
                        obj.August += policy.stickerDetails.length
                        break;
                    case 8:
                        obj.September += policy.stickerDetails.length
                        break;
                    case 9: 
                        obj.October += policy.StickerDetails.length
                        break;
                    case 10:
                        obj.November += policy.StickerDetails.length
                        break;
                    case 11: 
                        obj.December += policy.StickerDetails.length
                        break;     
                }
            }
            console.log(obj)
            console.log(moment.unix(created_at))
        })
        
        return obj
    }


    const labels = Object.keys(sales)
    ChartJS.register (
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
      
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: false,
                text: 'Monthly  Motor Third Party Stickers',
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            }
            
        }
    };
      
    
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Sticker sales',
                data: [...Object.values(sales)],
                backgroundColor: '#E0E7EC',
                hoverBackgroundColor:"#1475CF"
            },
        ],
    };
    return <Bar options={options} data={data}/>
}

export default BarChart
