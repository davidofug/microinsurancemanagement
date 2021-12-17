import { MdAccountBalance, MdBusinessCenter, MdDirectionsCarFilled, MdAirlineSeatReclineExtra, MdAssessment, MdPeople, MdPerson } from 'react-icons/md'

const menuData = [
    {
        name: "Dashboard",
        icon: <MdAccountBalance />,
        link: "dashboard"
    },
    {
        name: "Organisations",
        icon: <MdBusinessCenter />,
        link: "organisations"
    },
    {
        name: "Clients",
        icon: <MdPerson />,
        link: "clients"
    },
    {
        name: "User Management",
        icon: <MdPeople />,
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
        icon: <MdDirectionsCarFilled />,
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
        icon: <MdAirlineSeatReclineExtra />,
        link: "claims"
    },
    {
        name: "Reports",
        icon: <MdAssessment />,
        link: "reports"
    }
]

export default menuData;