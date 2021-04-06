function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -6.914744, lng: 107.609810},
        zoom: 12,
    });
    return map;
}

function setMarkers(data, isStart, isEnd, filter = null) {
    let locations = [];
    data = filterData(data, filter).length <= 0 ? data : filterData(data, filter)
    if (isStart) {
        data.forEach(item => {
            let startMark = {
                name: "start",
                pos: item.startCor,
                icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }
            // let endMark = {name: "end", pos: item.endCor}
            locations.push(startMark)
        })
    }

    if (isEnd) {
        data.forEach(item => {
            let endMark = {name: "end", pos: item.endCor, icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
            locations.push(endMark)
        })
    }

    let markers = locations.map((item) => {
        return new google.maps.Marker({
            position: {lat: item.pos.lat, lng: item.pos.lng},
            icon: item.icon
        });
    });
    return markers;
}

function setHeatMap(arrData, map, filter = null) {
    let heatmapData = [];
    arrData = filterData(arrData, filter).length <= 0 ? arrData : filterData(arrData, filter)
    
    arrData.forEach(item => {
        let startCoor = new google.maps.LatLng(item.startCor.lat, item.startCor.lng)
        let endCoor = new google.maps.LatLng(item.endCor.lat, item.endCor.lng)
        heatmapData.push(startCoor)
        heatmapData.push(endCoor)
    })
    let heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map
    });
    return heatmap;
}

function sendRequest(url, data = {}) {
    return axios.post(url, data);
}


function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
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

createFilterObj = () => {

    let days = [];
    let hours = [];
    for (let i = 0; i < 7; i++) {
        const isChecked = document.getElementById(`day-${i}`).checked;
        if (isChecked) {
            days.push(i)
        }

    }
    for (let i = 0; i < 24; i++) {
        const isChecked = document.getElementById(`hour-${i}`).checked;
        if (isChecked) {
            hours.push(i)
        }

    }
    let filter = {day: days, hour: hours}
    return filter
}
filterData = (data, query) => {
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

deleteMarkes = (markers) => {
    markers.forEach(item => {
        item.setMap(null)
    })
    return null
}
docReady(function () {
    let map = initMap()
    let markerCluster = null;
    let markers;
    let heatMap;
    sendRequest("http://localhost:3000/searchRoute").then(res => {
        document.getElementById('mark-btn').onclick = function (e) {
            e.preventDefault();
            let statusStartChecked = document.getElementById("start").checked
            let statusEndChecked = document.getElementById("end").checked
            let data = res.data.data;
            let filter = createFilterObj()
            if (!Array.isArray(markers)) {
                let query = buildFilter(filter)
                markers = setMarkers(data, statusStartChecked, statusEndChecked, query)
                markerCluster = new MarkerClusterer(map, markers, {
                    imagePath:
                        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                });
            }

        }
        document.getElementById('heatmap-btn').onclick = function (e) {
            e.preventDefault();
            let filter = createFilterObj()

            if (!heatMap || heatMap.getMap() === null) {
                heatMap = setHeatMap(res.data.data, map, filter)
            }
        }
        document.getElementById('clear-btn').onclick = function (e) {
            e.preventDefault();
            if (markerCluster) {
                markerCluster.removeMarkers(markers);
                markers = deleteMarkes(markers)
            }
            if (heatMap) {
                heatMap.setMap(null)
            }

        }
    })
});

