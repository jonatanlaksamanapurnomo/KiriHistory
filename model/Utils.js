const csvToObject = item => {
    let cols = item.split(",")
    let action = cols[3];
    if (action === "FINDROUTE") {
        let startLng = cols[5].split("/")[0]
        let endLat = cols[5].split("/")[1]
        let fullDate = new Date(cols[2])

        return {
            apiKey: cols[0],
            timestamp: fullDate,
            action,
            startCor: {lat: parseFloat(cols[4].substr(1)), lng: parseFloat(startLng)},
            endCor: {lat: parseFloat(endLat), lng: parseFloat(cols[6].split("/")[0])},
            day: fullDate.getDay(),
            hour: fullDate.getHours()
        }
    }
}


function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
}

const buildFilter = (filter) => {
    let query = {};
    for (let keys in filter) {
        if ((filter[keys].constructor === Object) || (filter[keys].constructor === Array && filter[keys].length > 0)) {
            query[keys] = filter[keys];
        }
    }
    return query;
}


 const filterData = (data, query) => {
    const keysWithMinMax = [];
    const filteredData = data.filter((item) => {
        for (let key in query) {
            if (item[key] === undefined) {
                return false;
            } else if (keysWithMinMax.includes(key)) {
                if (query[key]['min'] !== null && item[key] < query[key]['min']) {
                    return false;
                }
                if (query[key]['max'] !== null && item[key] > query[key]['max']) {
                    return false;
                }
            } else if (!query[key].includes(item[key])) {
                return false;
            }
        }
        return true;
    });
    return filteredData;
};

module.exports = {csvToObject, CSVToArray , buildFilter , filterData};