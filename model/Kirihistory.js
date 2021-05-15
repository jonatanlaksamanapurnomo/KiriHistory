const fs = require("fs")
const doAsync = require('doasync');
const {csvToObject , buildFilter , filterData} = require("./Utils");
class KiriHistory {
    constructor() {
        // fs.createReadStream(__dirname + "/data/KIRIStatistics.csv")
        //     .pipe(csv())
        //     .on('data', (data) => {
        //         console.log(data)
        //     })
        //     .on('end', () => {
        //
        //     });

        this.data = doAsync(fs).readFile(__dirname + "/data/KIRIStatistics.csv", "utf8")
            .then((data) => {
                let arrCSV = data.split("\n")
                //remove header
                arrCSV.shift();
                return arrCSV.map(csvToObject).filter(item => item !== undefined);
            }).catch(() => {
                console.log("err")
            });
    }

    //return promise
    getData = (filterParams) => {
        return this.data.then(res => {
            let query = buildFilter(filterParams);
            res = filterData(res, query);
            return res
        })
    }

}

module.exports = KiriHistory;
