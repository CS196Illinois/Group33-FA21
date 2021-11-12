async function createList(id) {
    var fetchJSONOptions = {
        headers: {
          'Content-Type': 'application/json',
          id: JSON.stringify(id)
        } 
    }
    const data = await fetch('/firebaseJson', fetchJSONOptions)
    .then(response => response.json())
    let div = document.getElementById('soundList')
    let title = document.createElement('h3')
    let titleText = document.createTextNode(`${data.name}`)
    title.appendChild(titleText)
    div.appendChild(title)
    title.addEventListener("click", () => {playAudio(data)})
}

async function playAudio(data) {
    console.log('clicked')

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
          file: data.fileName
        } 
    }

    var audioSource = await fetch('/firebaseAudio', fetchAudioOptions)
    .then(response => response.text())
    .then(url => fetch(url))
    .then(download => download.blob())
    .then(blob => URL.createObjectURL(blob))
    .catch(e => console.log(`Error occured: ${e}`))
}

async function loadSounds() {
    var idList = await fetch('/getAudioList')
    .then(response => {
      return response.json()
    })
   .then(json => {
      return json.ids
    })
  
    idList.forEach(element => {
      createList(element)
    })
    console.log("pins loaded!")
}

loadSounds()