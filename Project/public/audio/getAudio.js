// Purpose: fetch and return the audio file from Firebase given an ID
function getAudio(ID) {
  //returns a blob object with the selected audio?
  return storage.child(`audio/${ID}.mp3`).getDownloadURL()
  .catch((error) => {
    console.log(`error loading file: ${error}`)
  });
}

function getJson(ID) {
  return storage.child(`audioData/${ID}.json`).getDownloadURL()
  .catch((error) => {
    console.log(`error loading file: ${error}`)
  });
}