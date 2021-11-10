// Initialize map, including making object that defines our custom map marker
const map = L.map('map').setView([40.1105, -88.2218], 13)
const attribution = 
'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

const tileUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
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
//map.on('click', (e) => {
//    clickMarker.setLatLng(e.latlng).addTo(map)
//})

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
    var userMark = L.marker([crd.latitude, crd.longitude], {icon: logo}).addTo(map)
    userMark.bindPopup("you!")
}

// Function to run on error when finding location
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
}

var user = navigator.geolocation.getCurrentPosition(success, error, navOptions)


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


// Function to be ran on marker click.
// Fetches audio and appends it to the bottom of the page.
async function clickMarker(data) {
    
    // this basically just replaces mp3 with 'mpeg' for MIME type
    var fileType
    if (data.type == 'mp3')
        fileType = 'mpeg'
    else
        fileType = data.type

    // creates an HTTP options object
    var fetchAudioOptions = {
        method: 'GET',
        headers: {
          //'Content-Type': `audio/${fileType}`,
          //'Content-Type': 'audio/mpeg',
          id: JSON.stringify(data.id),
          type: JSON.stringify(data.type)
        } 
    }

    // Fetches audio from server.
    var audioSource = await fetch('/firebaseAudio', fetchAudioOptions)
    .then(response => response.text())
    .then(url => fetch(url))
    .then(download => download.blob())
    .then(blob => URL.createObjectURL(blob))
    .catch(e => console.log(`Error occured: ${e}`))
    

    // Grabs div from document, appends title of sound
    let div = document.getElementById('clicked marker')
    let title = document.createElement('h3')
    let titleText = (document.createTextNode(`${data.name}`))
    div.innerHTML = ""
    title.appendChild(titleText)
    div.appendChild(title)

    // creates an audio player and adds it to div
    let audio = document.createElement('audio')
    audio.controls = 'controls'
    audio.src = audioSource
    audio.type = `audio\\${fileType}`
    div.appendChild(audio)
}

soundOnMap('001')
soundOnMap('002')

/* ----- Plan for the map -----
  - Need to *iterate* through the Firebase JSON data and place "noisedots" on the map
  - On the popup of each noisedots, the title can be displayed
    AND things relevant information needs to be shown below such as:
    - Sound Title: 
    - Description: 
    - *Uploader:
    - Date of Upload:
  - but above all needs to be an AUDIO TAG that actually plays the SELECTED noisedot's audio
*/