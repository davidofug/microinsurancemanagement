const dynamicFields = {
    "currencies":[
        {
            "code":"UGX",
            "name":"Ugandan shilling",
            "symbol":"/="
        },
        {
            "code":"USD",
            "name":"United States dollar",
            "symbol":"$"
        }
    ],
    "make": [
        ["Audi","Audi"],
        ["Toyota","Toyota"],
        ["Mercedez Benz","Mercedez Benz"],
        ["Nissan","Nissan"],
        ["BMW","BMW"],
        ["Isuzu","Isuzu"],
        ["Mazda","Mazda"],
        ["Other","Other"]
    ],
    "categories": [
        {
            "label":"Private",
            "classes":[
                "Class I: Own/Family",
                "Class II: Company/Employed Driver"
            ]
        },
        {
            "label":"Commercial",
            "classes":[
                "Class I: Own use",
                "Class II: Public use and carrying good for hire",
                "Class III: Private hire, Self driver, Employed Driver",
                "Class IV: PSV"
            ]
        },
        {
            "label":"Public"
        },
        {
            "label":"Motorcycle/Bicycle"
        },
        {
            "label":"Buses (X=>20)",
            "vehicle_use": [
                "Private (PMO)",
                "Public"
            ]
        },
        {
            "label":"Ambulances",
            "vehicle_use": [
                "Private/Public"
            ]
        },
        {
            "label":"Bullion vans/Fire fighting vehicles",
            "vehicle_use": [
                "Private",
                "Public(bullion)"
            ]
        },
        {
            "label":"Farm vehicles",
            "vehicle_use": [
                "On Premises - Tractor",
                "On Premises - Trailer",
                "Off Premises - Tractor",
                "Off Premises - Trailer"
            ]
        },
        {
            "label":"Construction Equipment",
            "vehicle_use": [
                "Light and Small",
                "Large and Heavy"
            ]
        },
        {
            "label":"Oil, Gas and Petrol Tanks",
            "vehicle_use": [
                "Single truck of sub-trailer",
                "Super-imposed tanker and sub-trailer",
                "Water, Milk, Ceespool emptier tankers"
            ]
        },
        {
            "label":"Hauliers",
            "vehicle_use": [
                "Single Truck (semi-trailer) for own goods",
                "Single Truck (semi-trailer) for public goods",
                "Super-imposed trailer for own goods"
            ]
        }
    ]
}

export default dynamicFields