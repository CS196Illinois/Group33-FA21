// File: upload-map.js
// Purpose: Map that is displayed on the Upload section of the app

// Initialize map, including making object that defines our custom map marker
const map = L.map('map').setView([40.1105, -88.2218], 13)
const lightAttribution = 
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
const lightURL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
const darkAttribution = 
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
const darkURL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'

const darkMode = true // Use to switch between dark and light mode on the frontend

var tileUrl, attribution

if (darkMode) {
  tileUrl = darkURL
  attribution = darkAttribution
} else {
  tileUrl = lightURL
  attribution = lightAttribution
}

const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(map)
var logo = L.icon({
    iconUrl: "/logos/dot.png",
    iconSize:     [32, 32], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -16] // point from which the popup should open relative to the iconAnchor
})

//----- ISR Marker (for testing)---------
// var isr = L.marker([40.11057618021301, -88.22185298950282], {icon: logo}).addTo(map)
// isr.bindPopup("<b>test</b><br>the isr")

// ------Marker that is placed where the user clicks (for testing)------------
//var clickMarker = new L.marker([0,0], {icon: logo})
var userMark = L.marker([0, 0], {icon: logo}).addTo(map)
userMark.bindPopup("dot location")

map.on('click', (e) => {
    userMark.setLatLng(e.latlng).addTo(map)
    // change the content of the two elements
    displayLatLon()
})

// Updates the frontend text elements to display the lat and lon of the selected dot location
function displayLatLon() {
  var userPos = userMark.getLatLng()
  globalLatLng.lat = userPos.lat
  globalLatLng.lng = userPos.lng
  var lat = parseFloat(userPos.lat.toString()).toFixed(4)
  var lng = parseFloat(userPos.lng.toString()).toFixed(4)
  document.getElementById('lat').textContent = `lat: ${lat}`
  document.getElementById('lon').textContent = `lon: ${lng}`
  console.log(userPos)
}

// Makes a map marker based on user's coordinates

// Options object for the navigator function
var navOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

// Function to run on geolocation success
function success(pos) {
    var crd = pos.coords
    console.log('Your current position is:')
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.log(`More or less ${crd.accuracy} meters.`)
    userMark = L.marker([crd.latitude, crd.longitude], {icon: logo}).addTo(map)
    userMark.bindPopup("dot location")
    displayLatLon()
}

// Function to run on error when finding location
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
}

var user = navigator.geolocation.getCurrentPosition(success, error, navOptions)

/* THIS is 
// Makes a map marker from a given ID.
async function soundOnMap(id) {
    // create options object for GET request
    var fetchJSONOptions = {
        headers: {
          'Content-Type': 'application/json',
          id: JSON.stringify(id)
        } 
    }

    // GET json file from server
    const data = await fetch('/firebaseJson', fetchJSONOptions)
    .then(response => response.json())
    console.log(data.lat, data.long)

    // create map maker from JSON
    const location = [data.lat, data.long]
    new L.marker(location, {icon: logo})
    .addTo(map)
    .on("click", () => clickMarker(data));
}
*/