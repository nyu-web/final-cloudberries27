
const numItemsToGenerate = 20;
const imageWidth = 480;
const imageHeight = 480;
const collectionID = 2411320;
const numImagesAvailable = 35;
let aDiv = document.createElement('div');
aDiv.classList.add('gallery');
document.body.appendChild(aDiv);
function renderGalleryItem(randomNumber){
    fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`)
        .then((response)=> {
            let galleryItem = document.createElement('div');
            galleryItem.innerHTML = ` <img src="${response.url}" alt="gallery image"/>`;
        aDiv.appendChild(galleryItem);
    })
}
for(let i=0;i<numItemsToGenerate;i++){
    renderGalleryItem(numImagesAvailable-i);
}
