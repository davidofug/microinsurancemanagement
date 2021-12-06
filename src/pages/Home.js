import { useAuth } from '../contexts/Auth'
import { Link } from 'react-router-dom'

function Home() {
    const { currentUser } = useAuth()
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'UGX',
      });

    return (
        <div>
            
        </div>
    )
}

export default Home