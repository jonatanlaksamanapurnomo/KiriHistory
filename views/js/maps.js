function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -6.914744, lng: 107.609810},
        zoom: 12,
    });
    return map;
}

function setMarkers(data) {
    let locations = [];
    // const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    data.forEach(item => {
        let startMark = {name: "start", pos: item.start}
        let endMark = {name: "end", pos: item.end}
        locations.push(startMark)
        locations.push(endMark)
    })
    let markers = locations.map((item) => {
        if (item.name === "start") {
            return new google.maps.Marker({
                position: {lat: item.pos.lat, lng: item.pos.lng},
                icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            });
        } else {
            return new google.maps.Marker({
                position: {lat: item.pos.lat, lng: item.pos.lng},
                icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            });
        }
    });
    return markers;
}

function setHeatMap(arrData) {
    let heatmapData = [];
    arrData.forEach(item => {
        let startCoor = new google.maps.LatLng(item.start.lat, item.start.lng)
        let endCoor = new google.maps.LatLng(item.end.lat, item.end.lng)
        heatmapData.push(startCoor)
        heatmapData.push(endCoor)
    })
    let heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    return heatmap;
}

function sendRequest(url, data = {}) {
    return axios.post(url, data);
}


$(function () {
    let map = initMap()
    //this is bad pratice
    sendRequest("http://localhost:3000/searchRoute").then(res => {
        let markers = setMarkers(res.data.data)
        $(document).on('click', '#mark-btn', function (e) {
            e.preventDefault();
            //to reduce lag
            markers.slice(0, 100).forEach(item => {
                item.setMap(map)
            })
        })
        $(document).on('click', '#clear-btn', function (e) {
            e.preventDefault();
            //to reduce lag
            markers.slice(0, 100).forEach(item => {
                item.setMap(null)
            })
        })

    })
});