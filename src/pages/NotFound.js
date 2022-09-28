import {useEffect} from 'react'
import '../styles/loader.css'

function NotFound() {

    useEffect(() => {
        document.title = 'Micro Insurance Management'
    }, [])

    return (
        <div className="loader-container">
            <h1>404</h1>
            <p>Resource Not found.</p>
        </div>
    )
}

export default NotFound
