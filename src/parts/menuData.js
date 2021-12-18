import { MdAccountBalance, MdBusinessCenter, MdDirectionsCarFilled, MdAirlineSeatReclineExtra, MdAssessment, MdPeople, MdPerson } from 'react-icons/md'

const menuData = {
    SuperAdmin: [
        {
            name: "Dashboard",
            icon: <MdAccountBalance />,
            link: "super-admin-dashboard"
        },
        {
            name: "Clients",
            icon: <MdPerson />,
            link: "super-admin-clients"
        },
        {
            name: "User Management",
            icon: <MdPeople />,
            link: "super-admin-user-management",
            subMenu: [
                {
                    name: "Agents",
                    link: "super-admin-agents"
                },
                {
                    name: "Supervisors",
                    link: "super-admin-supervisors"
                },
                {
                    name: "Admins",
                    link: "super-admin-admins"
                },
                {
                    name: "View Log Trail",
                    link: "super-admin-view-log-trail"
                }
            ]
        },
        {
            name: "Policies",
            icon: <MdDirectionsCarFilled />,
            link: "super-admin-policies",
            subMenu: [
                {
                    name: "MTP",
                    link: "super-admin-motor-third-party"
                },
                {
                    name: "Windscreen",
                    link: "super-admin-windscreen"
                },
                {
                    name: "Comprehensive",
                    link: "super-admin-comprehensive"
                }
            ]
        },
        {
            name: "Claims",
            icon: <MdAirlineSeatReclineExtra />,
            link: "super-admin-claims"
        },
        {
            name: "Reports",
            icon: <MdAssessment />,
            link: "super-admin-reports"
        }
    ],
    Admin: [
        {
            name: "Dashboard",
            icon: <MdAccountBalance />,
            link: "admin-dashboard"
        },
        {
            name: "Organisations",
            icon: <MdBusinessCenter />,
            link: "admin-organisations"
        },
        {
            name: "Clients",
            icon: <MdPerson />,
            link: "admin-clients"
        },
        {
            name: "User Management",
            icon: <MdPeople />,
            link: "admin-user-management",
            subMenu: [
                {
                    name: "Agents",
                    link: "admin-agents"
                },
                {
                    name: "Supervisor",
                    link: "admin-supervisor"
                },
                {
                    name: "View Log Trail",
                    link: "admin-view-log-trail"
                }
            ]
        },
        {
            name: "Policies",
            icon: <MdDirectionsCarFilled />,
            link: "admin-policies",
            subMenu: [
                {
                    name: "MTP",
                    link: "admin-motor-third-party"
                },
                {
                    name: "Windscreen",
                    link: "admin-windscreen"
                },
                {
                    name: "Comprehensive",
                    link: "admin-comprehensive"
                }
            ]
        },
        {
            name: "Claims",
            icon: <MdAirlineSeatReclineExtra />,
            link: "admin-claims"
        },
        {
            name: "Reports",
            icon: <MdAssessment />,
            link: "admin-reports"
        }
    ],
    SuperVisor: [
        {
            name: "Dashboard",
            icon: <MdAccountBalance />,
            link: "/supervisor-dashboard"
        },
        {
            name: "Clients",
            icon: <MdPerson />,
            link: "/supervisor-clients"
        },
        {
            name: "User Management",
            icon: <MdPeople />,
            link: "/supervisor-user-management",
            subMenu: [
                {
                    name: "Agents",
                    link: "/supervisor-agents"
                },
                {
                    name: "View Log Trail",
                    link: "/supervisor-view-log-trail"
                }
            ]
        },
        {
            name: "Policies",
            icon: <MdDirectionsCarFilled />,
            link: "/supervisor-policies",
            subMenu: [
                {
                    name: "MTP",
                    link: "/supervisor-motor-third-party"
                },
                {
                    name: "Windscreen",
                    link: "/supervisor-windscreen"
                },
                {
                    name: "Comprehensive",
                    link: "/supervisor-comprehensive"
                }
            ]
        },
        {
            name: "Claims",
            icon: <MdAirlineSeatReclineExtra />,
            link: "/supervisor-claims"
        },
        {
            name: "Reports",
            icon: <MdAssessment />,
            link: "/supervisor-reports"
        }
    ],
    Agent: [
        {
            name: "Dashboard",
            icon: <MdAccountBalance />,
            link: "agent-dashboard",
            head: "Britam - Dashboard"
        },
        {
            name: "Clients",
            icon: <MdPerson />,
            link: "agent-clients"
        },
        {
            name: "User Management",
            icon: <MdPeople />,
            link: "agent-user",
            subMenu: [
                {
                    name: "View Log Trail",
                    link: "agent-view-log-trail"
                }
            ]
        },
        {
            name: "Policies",
            icon: <MdDirectionsCarFilled />,
            link: "agent-policies",
            subMenu: [
                {
                    name: "MTP",
                    link: "agent-motor-third-party"
                },
                {
                    name: "Windscreen",
                    link: "agent-windscreen"
                },
                {
                    name: "Comprehensive",
                    link: "agent-comprehensive"
                }
            ]
        },
        {
            name: "Claims",
            icon: <MdAirlineSeatReclineExtra />,
            link: "agent-claims"
        },
        {
            name: "Reports",
            icon: <MdAssessment />,
            link: "agent-reports"
        }
    ]
}


export default menuData;

