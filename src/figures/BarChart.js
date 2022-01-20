import {useState, useEffect } from 'react'
import { db } from '../helpers/firebase'
import { authentication } from '../helpers/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

function BarChart () {
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
        setSales(generateGraphData(await getPolicies(collection(db, "policies"))))
    }, [])

    
    const getPolicies = async (policyCollectionRef) => {
        const data = await getDocs(policyCollectionRef);
        const allPolicies = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        return allPolicies.filter(policy => policy.added_by_uid === authentication.currentUser.uid)
    }

    
    const generateGraphData = (policyArray, obj=monthlySales) => {
        policyArray.forEach( policy => {
            if(policy?.createdAt && moment(policy.createdAt).isValid() === true) {
                const { policyStartDate } = policy
                switch(moment(policyStartDate).toDate().getMonth()) {
                    case 0:
                        obj.January = obj.January += policy.stickersDetails.length
                        break;
                    case 1:
                        obj.February = obj.February += policy.stickersDetails.length
                        break;
                    case 2:
                        obj.March = obj.March += policy.stickersDetails.length
                        break;
                    case 3:
                        obj.April = obj.April += policy.stickersDetails.length
                        break;
                    case 4: 
                        obj.May = obj.May += policy.stickersDetails.length
                        break;
                    case 5:
                        obj.June = obj.June += policy.stickerDetails.length
                        break;
                    case 6: 
                        obj.July = obj.July += policy.stickerDetails.length
                        break;
                    case 7:
                        obj.August = obj.August += policy.stickerDetails.length
                        break;
                    case 8:
                        obj.September = obj.September += policy.stickerDetails.length
                        break;
                    case 9: 
                        obj.October = obj.October += policy.StickerDetails.length
                        break;
                    case 10:
                        obj.November = obj.November += policy.StickerDetails.length
                        break;
                    case 11: 
                        obj.December = obj.December += policy.StickerDetails.length
                        break;     
                }
                
            }

        })

        console.log(obj)
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
