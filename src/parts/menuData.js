import { MdAccountBalance, MdBusinessCenter } from 'react-icons/md'

const menuData = [
    {
        name: "Dashboard",
        icon: <MdAccountBalance />,
        link: "dashboard"
    },
    {
        name: "Organisations",
        link: <MdBusinessCenter />,
        link: "organisations"
    },
    {
        name: "Clients",
        
        link: "clients"
    },
    {
        name: "User Management",
        link: "user",
        subMenu: [
            {
                name: "Agents",
                link: "agents"
            },
            {
                name: "Supervisor",
                link: "supervisor"
            },
            {
                name: "View Log Trail",
                link: "view-log-trail"
            }
        ]
    },
    {
        name: "Policies",
        
        link: "policies",
        subMenu: [
            {
                name: "MTP",
                link: "motor-third-party"
            },
            {
                name: "Windscreen",
                link: "windscreen"
            },
            {
                name: "Comprehensive",
                link: "comprehensive"
            }
        ]
    },
    {
        name: "Claims",
        
        link: "claims"
    },
    {
        name: "Reports",
        
        link: "reports"
    }
]

export default menuData;