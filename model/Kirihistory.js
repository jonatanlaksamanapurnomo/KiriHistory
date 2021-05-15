const fs = require("fs")
const {csvToObject, buildFilter, filterData} = require("./Utils");

class KiriHistory {
    constructor() {
        fs.readFile(__dirname + "/data/KIRIStatistics.csv", "utf8", ((err, data) => {
            if (err === null) {

                let arrCSV = data.split("\n")
                //remove header
                arrCSV.shift();
                // console.log(arrCSV);
                this.data = arrCSV.map(csvToObject).filter(item => item !== undefined);
            }
        }))
    }

    //return promise
    getData = (filterParams) => {
        let query = buildFilter(filterParams);
        this.data = filterData(this.data, query);
        return this.data;
    }

}

module.exports = KiriHistory;
