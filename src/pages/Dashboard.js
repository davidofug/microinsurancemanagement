import { useState, useEffect } from 'react'
import useAuth from '../contexts/Auth'
import '../styles/dashboard.css'
import Header from '../components/header/Header'
import { getDocs, collection } from 'firebase/firestore'
import { authentication, db, functions } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { getUsers } from '../helpers/smallFunctions'
import FirstContainer from '../components/FirstContainer'
import UsersContainer from '../components/UsersContainer'
import GraphContainer from '../components/GraphContainer'

import Chat from '../components/messenger/Chat'
import '../styles/ctas.css'

function Dashboard({parent_container}) {
    const { authClaims } = useAuth()
    const [ users, setUsers ] = useState([])

    const [claims, setClaims] = useState([])
    const [claimsSettled, setClaimsSettled] = useState([])
    const claimsCollectionRef = collection(db, "claims");

    useEffect(async () => {
        document.title = 'Britam - Dashboard'
        if(authClaims.agent){
            getUsers('Customer').then(result => setUsers(result))
        } else if(authClaims.supervisor){
            getUsers('agent').then(result => setUsers(result))
        } else if(authClaims.admin){
            getUsers('supervisor').then(result => setUsers(result))
        } else if(authClaims.superadmin){
            getUsers('admin').then(result => setUsers(result))
        }
        getPolicies()
    }, [])
    

    // policies
    const [policies, setPolicies] = useState([])
    const policyCollectionRef = collection(db, "policies");

    
    const getPolicies = async () => {
        const data = await getDocs(policyCollectionRef);
        const allPolicies = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        if(authClaims.agent){// agent's policies
            setPolicies(allPolicies.filter(claim => claim.added_by_uid === authentication.currentUser.uid)) 
            return (allPolicies.filter(policy => policy.added_by_uid === authentication.currentUser.uid))
        }

        if(authClaims.supervisor){ // supervisor's policies
            const listUsers = httpsCallable(functions, 'listUsers')
            listUsers().then(({data}) => {
              const myAgents = data.filter(user => user.role.agent === true).filter(agent => agent.meta.added_by_uid === authentication.currentUser.uid).map(agentuid => agentuid.uid)

              
              const usersUnderSupervisor = [ ...myAgents, authentication.currentUser.uid]
      
              const supervisorPolicies = allPolicies.filter(claim => usersUnderSupervisor.includes(claim.added_by_uid))
              setPolicies(supervisorPolicies)
              return(supervisorPolicies)
            })
          }
        
        if(authClaims.admin){ // admin's policies
            const listUsers = httpsCallable(functions, 'listUsers')
            listUsers().then(({data}) => {
              const myAgents = data.filter(user => user.role.agent).filter(agent => agent.meta.added_by_uid === authentication.currentUser.uid).map(agentuid => agentuid.uid)
      
              const mySupervisors = data.filter(user => user.role.supervisor).filter(supervisor => supervisor.meta.added_by_uid === authentication.currentUser.uid).map(supervisoruid => supervisoruid.uid)
      
              const agentsUnderMySupervisors = data.filter(user => user.role.agent === true).filter(agent => mySupervisors.includes(agent.meta.added_by_uid)).map(agentuid => agentuid.uid)
              
              const usersUnderAdmin = [ ...myAgents, ...agentsUnderMySupervisors, ...mySupervisors, authentication.currentUser.uid]
      
              const adminPolicies = allPolicies.filter(policy => usersUnderAdmin.includes(policy.added_by_uid))
              setPolicies(adminPolicies)
              return(adminPolicies)
            })
        }

        if(authClaims.superadmin){// superadmin's policies
            setPolicies(allPolicies)
            return(allPolicies)
        } 
    }

    // claims
    const getClaims = async () => {
        const data = await getDocs(claimsCollectionRef);
        const allClaims = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const allSettledClaims = allClaims.filter(claim => claim.status === 'settled')
        if(authClaims.agent){ // agent's claims
            setClaims(allClaims.filter(claim => claim.uid === authentication.currentUser.uid)) 
            setClaimsSettled(allSettledClaims.filter(claim => claim.uid === authentication.currentUser.uid))
        } 

        if(authClaims.supervisor){ // supervisor's claims
            const listUsers = httpsCallable(functions, 'listUsers')
            listUsers().then(({data}) => {
              const myAgents = data.filter(user => user.role.agent === true).filter(agent => agent.meta.added_by_uid === authentication.currentUser.uid).map(agentuid => agentuid.uid)
              
              const usersUnderSupervisor = [ ...myAgents, authentication.currentUser.uid]
      
              const supervisorClaims = allClaims.filter(claim => usersUnderSupervisor.includes(claim.added_by_uid))
              setClaims(supervisorClaims)
              setClaimsSettled(supervisorClaims.filter(claim => claim.status === 'settled'))
            })
          }
        
        if(authClaims.admin){ // admin's claims
            const listUsers = httpsCallable(functions, 'listUsers')
            listUsers().then(({data}) => {
              const myAgents = data.filter(user => user.role.agent).filter(agent => agent.meta.added_by_uid === authentication.currentUser.uid).map(agentuid => agentuid.uid)
      
              const mySupervisors = data.filter(user => user.role.supervisor).filter(supervisor => supervisor.meta.added_by_uid === authentication.currentUser.uid).map(supervisoruid => supervisoruid.uid)
      
              const agentsUnderMySupervisors = data.filter(user => user.role.agent).filter(agent => mySupervisors.includes(agent.meta.added_by_uid)).map(agentuid => agentuid.uid)
              
              const usersUnderAdmin = [ ...myAgents, ...agentsUnderMySupervisors, ...mySupervisors, authentication.currentUser.uid]
              const adminClaims = allClaims.filter(claim => usersUnderAdmin.includes(claim.uid))
              const settledClaims = adminClaims.filter(claim => claim.status === "settled")
              setClaimsSettled(settledClaims)
              setClaims(adminClaims)
            })
        }

        authClaims.superadmin && setClaims(allClaims) && setClaimsSettled(allClaims.filter(claim => claim.status === "settled")) // superadmin's claims
          
          
    }

    return (
            <div className='components'>
                <Header title="Welcome to Britam" subtitle="WITH YOU EVERY STEP OF THE WAY" className="heading"/>

                <div className="componentsData">
                    <div id="first-row" className={`mb-5 first-row ${parent_container ? 'dashboard-cards' : 'expanded-menu-dashboard-cards'}`}  style={{display:"flex", width: "100%", justifyContent: "space-between"}}>
                        <FirstContainer claimsSettled={claimsSettled} policies={policies} claims={claims} />
                        <UsersContainer authClaims={authClaims} users={users}  />
                    </div>

                    <GraphContainer />
                </div>
                <div style={{width:"100%", position:"fixed", bottom:"0px", display:"flex", justifyContent:"flex-end"}} className={parent_container ? "chat-container": "expanded-menu-chat-container"}>
                    <Chat />
                </div> 
            </div>
        )
}

export default Dashboard