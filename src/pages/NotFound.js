import {useEffect} from 'react'

function NotFound() {

    useEffect(() => {
        document.title = 'Britam - With you every step of the way'
    }, [])

    return (
        <div>
            <h1>404</h1>
            <p>Resource Not found.</p>
        </div>
    )
}

export default NotFound
