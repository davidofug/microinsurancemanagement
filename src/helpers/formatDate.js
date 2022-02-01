export function getFormattedDate(date) { 
    // Month mappings.
    const MONTH_NAMES = [
        'Jan', 
        'Feb',
        'Mar', 
        'Apr', 
        'May', 
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov', 
        'Dec'
    ]
    
    // Day mappings.
    const DAY_NAMES = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ]


    // Current date details.
    const currentDate = new Date()
    const currentDay = DAY_NAMES[currentDate.getDay()]
    const currentMonth = MONTH_NAMES[currentDate.getMonth()]

    // Extract specific values from the date.
    const calendarDate = date.getDate();
    const day = DAY_NAMES[date.getDay()]
    const month = MONTH_NAMES[date.getMonth()]
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const ampm = hours >= 12 ? 'pm' : 'am'

    // Format the date for display along with the message.
    if(currentDay === day ) return `${hours}:${minutes} ${ampm}`
    else if(currentMonth === month) return `${ day } ${hours}:${minutes} ${ampm}`
    else if(currentMonth !== month) return `${month} ${calendarDate}, ${year}, ${hours}:${minutes} ${ampm}`

}

