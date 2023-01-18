const fs = require('fs');

const handler = (request, response) => {
    try {
        console.log(request.body)
        const { logo, favicon } = request.body

        if (logo) {
            const fileName = "SWICO-LOGO";
            const regex = /^data:.+\/(.+);base64,(.*)$/;
            const matches = logo.match(regex);
            const fileExtension = matches[1];
            const data = matches[2];
            const buffer = Buffer.from(data, "base64");
            const path = __dirname.split("api")[0] + "src/assets/imgs/";
      
            console.log(path);
            console.log("Constructed Path", `${path}${fileName}.${fileExtension}`);
      
            try {
              fs.writeFileSync(`${path}${fileName}.${fileExtension}`, buffer);
              const res = {
                  data: {message: "successfully updated", error: null}
              };
              response.status(200).json(res); 
            } catch (error) {
              response.status(500).json({error: error, data: null});
            }
        } 

        if (favicon) {
            const fileName = "favicon";
            const regex = /^data:.+\/(.+);base64,(.*)$/;
            const matches = favicon.match(regex);
            const fileExtension = "ico";
            const data = matches[2];
            const buffer = Buffer.from(data, "base64");
            const path = __dirname.split("api")[0] + "public/";
            const assetPath = __dirname.split("api")[0] + "src/assets/imgs/"

            console.log(path)
            console.log(`${path}${fileName}.${fileExtension}`)
    
            try {
                const res = {data: {message: "successfully updated"}, error: null};
                fs.writeFileSync(`${path}${fileName}.${fileExtension}`, buffer);
                fs.writeFileSync(`${assetPath}${fileName}.${fileExtension}`, buffer)
                response.status(200).json(res)
            } catch (error) {
                response.status(500).json({error: error, data: null})
            }
        } 

    } catch {
        response.status(400).json({error: {message: "Invalid or No Data provided."}})
    }
}

export default handler