import { MdAccountBalance, MdBusinessCenter, MdDirectionsCarFilled, MdAirlineSeatReclineExtra, MdAssessment, MdPeople, MdPerson } from 'react-icons/md'

const menuData = {
    SuperAdmin: [
        {
            number: 1,
            name: "Dashboard",
            icon: <MdAccountBalance />,
            link: "super-admin-dashboard"
        },
        {
            number: 2,
            name: "Clients",
            icon: <MdPerson />,
            link: "super-admin-clients"
        },
        {
            number: 3,
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
            number: 4,
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
            number: 5,
            name: "Claims",
            icon: <MdAirlineSeatReclineExtra />,
            link: "super-admin-claims"
        },
        {
            number: 6,
            name: "Reports",
            icon: <MdAssessment />,
            link: "super-admin-reports"
        }
    ],
    Admin: [
        {
            number: 1,
            name: "Dashboard",
            icon: <MdAccountBalance />,
            link: "/admin/dashboard"
        },
        {
            number: 2,
            name: "Organisations",
            icon: <MdBusinessCenter />,
            link: "/admin/organisations"
        },
        {
            number: 3,
            name: "Clients",
            icon: <MdPerson />,
            link: "/admin/clients"
        },
        {
            number: 4,
            name: "User Management",
            icon: <MdPeople />,
            link: "/admin/user-management",
            subMenu: [
                {
                    name: "Agents",
                    link: "/admin/agents"
                },
                {
                    name: "Supervisor",
                    link: "/admin/supervisor"
                },
                {
                    name: "View Log Trail",
                    link: "/admin/view-log-trail"
                }
            ]
        },
        {
            number: 5,
            name: "Policies",
            icon: <MdDirectionsCarFilled />,
            link: "/admin/policies",
            subMenu: [
                {
                    name: "MTP",
                    link: "/admin/motor-third-party"
                },
                {
                    name: "Windscreen",
                    link: "/admin/windscreen"
                },
                {
                    name: "Comprehensive",
                    link: "/admin/comprehensive"
                }
            ]
        },
        {
            number: 6,
            name: "Claims",
            icon: <MdAirlineSeatReclineExtra />,
            link: "/admin/claims"
        },
        {
            number: 7,
            name: "Reports",
            icon: <MdAssessment />,
            link: "/admin/reports"
        }
    ],
    SuperVisor: [
        {
            number: 1,
            name: "Dashboard",
            icon: <MdAccountBalance />,
            link: "/supervisor-dashboard"
        },
        {
            number: 2,
            name: "Clients",
            icon: <MdPerson />,
            link: "/supervisor-clients"
        },
        {
            number: 3,
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
            number: 4,
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
            number: 5,
            name: "Claims",
            icon: <MdAirlineSeatReclineExtra />,
            link: "/supervisor-claims"
        },
        {
            number: 6,
            name: "Reports",
            icon: <MdAssessment />,
            link: "/supervisor-reports"
        }
    ],
    Agent: [
        {
            number: 1,
            name: "Dashboard",
            icon: <MdAccountBalance />,
            link: "agent-dashboard",
            head: "Britam - Dashboard"
        },
        {
            number: 2,
            name: "Clients",
            icon: <MdPerson />,
            link: "agent-clients"
        },
        {
            number: 3,
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
            number: 4,
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
            number: 5,
            name: "Claims",
            icon: <MdAirlineSeatReclineExtra />,
            link: "agent-claims"
        },
        {
            number: 6,
            name: "Reports",
            icon: <MdAssessment />,
            link: "agent-reports"
        }
    ]
}


export default menuData;

