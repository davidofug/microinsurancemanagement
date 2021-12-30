const formFields = { 
    users : [ 
        {
            user: "supervisor",
            label: "Supervisor",
            userRoles: [
                "Agent",
                "Customer"
            ],
        },
        {
            user: "agent",
            label: "Agent",
            userRoles: [
                "Customer"
            ]
        },
        {
            user: "admin",
            label: "Admin",
            userRoles: [
                "Supervisor"
            ]
        },
        {
            user: "superAdmin",
            label: "Super Admin",
            userRoles: [
                "Admin",
                "Supervisor",
                "SuperAdmin"
            ]
        },
        {
            user: "customer",
            label: "Customer"
        }  
    ]
}


export default formFields

