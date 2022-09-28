import {useEffect} from 'react'

function NotAuthorized() {

    useEffect(() => {
        document.title = 'Micro Insurance Management'
    }, [])

    return (
        <div>
            Not Allowed access this resource
        </div>
    )
}

export default NotAuthorized
