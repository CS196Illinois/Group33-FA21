// Purpose: fetch and return the audio file from Firebase given an ID
async function soundInList(id) {
  var fetchOptions = {
    headers: {
      'Content-Type': 'audio/json',
      id: JSON.stringify(id)
    } 
  }
  const soundJson = await fetch('/firebaseJson', fetchOptions);
  const data = await soundJson.json();
  // We may not want to use a soundmark, but still return the tag or audio source.
  soundMark.bindPopup(`
      <audio controls>
          <source src = "/audio/#${id}">${data.name}" type = "audio/mpeg">
      </audio>
  `);
}