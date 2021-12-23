import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCMyQY2AE1qal8Kzb9DTOMJNZ2a8OjNaZc",
    authDomain: "britam-apps.firebaseapp.com",
    projectId: "britam-apps",
    storageBucket: "britam-apps.appspot.com",
    messagingSenderId: "679626174983",
    appId: "1:679626174983:web:6a34512b4e8ca737b5f0a2",
    measurementId: "G-V2PDNNTC1W"
}

const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)