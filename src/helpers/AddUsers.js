const formFields = { 
    users : [ 
        {
            user: "supervisor",
            label: "Supervisor",
            userRoles: [
                "agent",
                "customer"
            ],
        },
        {
            user: "agent",
            label: "Agent",
            userRoles: [
                "customer"
            ]
        },
        {
            user: "Admin",
            label: "admin",
            userRole: [
                "supervisor"
            ]
        },
        {
            user: "SuperAdmin",
            label: "superAdmin",
            userRole: [
                "admin",
                "supervisor",
                "superAdmin"
            ]
        },
        {
            user: "Customer",
            label: "customer"
        }  
    ]
}


export default formFields

