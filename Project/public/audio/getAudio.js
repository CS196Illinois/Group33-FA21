// Purpose: fetch and return the audio file from Firebase given an ID
function soundInList(id) {
  var fetchOptions = {
    headers: {
      'Content-Type': 'audio/json',
      id: JSON.stringify(id)
    } 
  }
  const soundJson = await fetch('/firebaseJson', fetchOptions);
  const data = await soundJson.json();
  soundMark.bindPopup(`
      <audio controls>
          <source src = "/audio/#${id}">${data.name}" type = "audio/mpeg">
      </audio>
  `);
}