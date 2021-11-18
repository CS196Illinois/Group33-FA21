/* File: upload.js
 * Purpose: to upload the 
*/
const uploadButton = document.getElementById('uploadButton');
console.assert(uploadButton);
// input variables
const filePath = document.getElementById('audioFile');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
// var globalLatLng contains the lat/lng info of the dot.

if (uploadButton) {
  uploadButton.addEventListener('click', async event => {
    console.log(event);
    console.log(`file: ${filePath.value}`); // need to figure this out
    console.log(`title: ${titleInput.value}`);
    console.log(`description: ${descriptionInput.value}`);
    console.log(`lat: ${globalLatLng.lat}`);
    console.log(`lng: ${globalLatLng.lng}`);
  });
} else {
  console.log('Upload Button element could not be found');
}