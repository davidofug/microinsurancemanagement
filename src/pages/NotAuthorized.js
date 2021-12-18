import {useEffect} from 'react'

function NotAuthorized() {

    useEffect(() => {
        document.title = 'Britam - With you every step of the way'
    }, [])

    return (
        <div>
            Not Allowed access this resource
        </div>
    )
}

export default NotAuthorized
