const boom = [
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
]
const currencyOptions = (boom) => {
    return (
            
                boom.map((currency, index) => {
                    <option key={index} value={currency[index]}>currency["code"]</option>
                })
            
        
    )
    
}

console.log(currencyOptions(boom))