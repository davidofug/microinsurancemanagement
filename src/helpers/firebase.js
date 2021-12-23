import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: REACT_APP_apiKey,
    authDomain: REACT_APP_authDomain,
    projectId: REACT_APP_projectId,
    storageBucket: REACT_APP_storageBucket,
    messagingSenderId: REACT_APP_messagingSenderId,
    appId: REACT_APP_appId,
    measurementId: REACT_APP_measurementId
}

const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)