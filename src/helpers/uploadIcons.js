/**
 * @function 
 * @name updateIcons
 * @param { Object } logos An object containing logos
 * @returns { Object } Data or an error message.
 */
export const updateIcons = async ( logos ) => {
    const response = await fetch("/api/updateIcons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(logos)
    })
    console.log(response)
    return response    
}