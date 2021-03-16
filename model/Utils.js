

const csvToObject = item => {
    let cols = item.split(",")
    let action = cols[3];
    if(action === "FINDROUTE"){
        let startLng = cols[5].split("/")[0]
        let endLat  = cols[5].split("/")[1]
        let fullDate = new Date(cols[2])
        return {apiKey:cols[0],timestamp:fullDate , action , start:{lat: parseFloat(cols[4].substr(1)), lng:parseFloat(startLng)}, end:{lat:parseFloat(endLat) , lng:parseFloat(cols[6].split("/")[0])  } }
    }
    // console.log(cols)
}

module.exports = {  csvToObject };