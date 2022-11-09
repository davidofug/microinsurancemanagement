import {useEffect} from 'react'

function NotAuthorized() {

    useEffect(() => {
        document.title = 'Statewide Insurance'
    }, [])

    return (
        <div>
            Not Allowed access this resource
        </div>
    )
}

export default NotAuthorized
