

const menuData = [
    {
        name: "Dashboard",
        
        link: "dashboard"
    },
    {
        name: "Organisations",
        
        link: "organisations"
    },
    {
        name: "Clients",
        
        link: "clients"
    },
    {
        name: "User Management",
        
        link: "user"
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