import { authentication } from '../helpers/firebase'
import { functions, db } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';

// convert a string date to a date.
export const convertStringToDate = (stringDate) => {
    return new Date(stringDate)
}

// convert a number to n hours and n minutes
export const timeConvert = (num) => {
    const totalhours = num / 60;
    const hours = Math.floor(totalhours)
    const minutes = Math.round((totalhours - hours) * 60);
    return hours + " hour(s) and " + minutes + " minute(s).";
}


// clients

export const getAgentClients = async () => {
    const listUsers = httpsCallable(functions, 'listUsers')
    return await listUsers().then((results) => {
        const myUsers = results.data.filter(user => user.role.Customer)
        const myClients = myUsers.filter(client => client.meta.added_by_uid === authentication.currentUser.uid).slice(0, 5)
        return myClients.length === 0 ? null : myClients
    }).catch((err) => {
        return "failed"
    })
}