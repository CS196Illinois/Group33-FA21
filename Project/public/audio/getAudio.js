// Purpose: fetch and return the audio file from Firebase given an ID
var storage = firebase.storage();

function getAudio(ID) {
  //returns a blob object with the selected audio?
  return storage.child('audio/${ID}.mp3').getDownloadURL()
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    /*
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    */
   var audio = document.getAudio();
  })
  .catch((error) => {
    // Handle any errors
    console.log(error)
  });
}