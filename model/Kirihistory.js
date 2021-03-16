const fs = require("fs")
const doAsync = require('doasync');
const { csvToObject} = require("./Utils");

class KiriHistory {

    constructor() {
        this.data = doAsync(fs).readFile(__dirname+"/data/KIRIStatistics.csv", "utf8")
            .then((data) => {
                let arrCSV =   data.split("\n")
                //remove header
                arrCSV.shift();
                return arrCSV.map(csvToObject).filter(item => item !== undefined);
            }).catch(() => {
                console.log("err")
            });
    }


    buildFilter = (filter) => {
        let query = {};
        for (let keys in filter) {
            if ((filter[keys].constructor === Object) || (filter[keys].constructor === Array && filter[keys].length > 0)) {
                query[keys] = filter[keys];
            }
        }
        return query;
    }
    filterData = (query) => {
      return    this.getData().then(() => {
             const filteredData = data.filter((item) => {
                 for (let key in query) {
                     if (item[key] === undefined) {
                         return false;
                     } else if (key === "timestamp") {
                         query[key][0] = query[key][0]
                         query[key][1] = query[key][1]
                         let status = item[key].isBetween(query[key][0], query[key][1])
                         if (!status) {
                             return false;
                         }
                     } else if (!query[key].includes(item[key])) {
                         return false;
                     }
                 }
                 return true;
             });
             return filteredData;
         });

        // console.log(query)

    };

    getFilteredData(filterInput) {
        let query = this.buildFilter(filterInput)
        return this.filterData(query);
    }

    getData = () => {
        return this.data
    }
}

module.exports = KiriHistory;
