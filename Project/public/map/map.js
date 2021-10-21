const map = L.map('map').setView([40.1105, -88.2218], 13)
const attribution = 
    '&copy; <a href ="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map)
var logo = L.icon({
    iconUrl: "/logos/dot.png",
    iconSize:     [32, 32], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -16] // point from which the popup should open relative to the iconAnchor
})

var isr = L.marker([40.11057618021301, -88.22185298950282], {icon: logo}).addTo(map)
isr.bindPopup("<b>test</b><br>the isr");

var clickMarker = new L.marker([0,0], {icon: logo})
map.on('click', (e) => {
    clickMarker.setLatLng(e.latlng).addTo(map)
})


//Marker based on user geolocation taken directly from navigator docs
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};


function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    var userMark = L.marker([crd.latitude, crd.longitude], {icon: logo}).addTo(map);
    userMark.bindPopup("you!")
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

var user = navigator.geolocation.getCurrentPosition(success, error, options);

async function soundOnMap() {
    const response = await fetch("../data/001.json");
    const data = await response.json();
    console.log(data.lat, data.long);
    const location = [data.lat, data.long]
    var soundMark = new L.marker(location, {icon: logo}).addTo(map);
    soundMark.bindPopup(`${data.name}`);
}

soundOnMap()