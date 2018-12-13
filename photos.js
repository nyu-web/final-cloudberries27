
let arrayOfImg = [];
let origin = null;
let curr = null;

const numItemsToGenerate = 20;
const imageWidth = 480;
const imageHeight = 480;
const collectionID = 2411320;
const section = document.querySelector('#images');
const modal = document.querySelector('#modal');

const createImage = (path) => {
    const image = document.createElement('img');
    image.src = path;
    return image;
};
const onImageClick = (event) => {
    curr = event.currentTarget.dataset.index;
    const image = createImage(event.currentTarget.src);

    modal.innerHTML = `
        <span class="fa fa-arrow-circle-o-left arrow left" id="leftArrow"></span>
        <span class="fa fa-arrow-circle-o-right arrow right" id="rightArrow"></span>
    `;

    const arrowLeft = document.querySelector("#leftArrow");
    const arrowRight = document.querySelector("#rightArrow");

    image.addEventListener('pointerdown', startSwipe);
    image.addEventListener('pointermove', swiping);
    image.addEventListener('pointerup', stopSwipe);

    arrowLeft.addEventListener('pointerdown', moveLeft);
    arrowRight.addEventListener('pointerdown', moveRight);

    modal.appendChild(image);
    document.body.classList.add('no-scroll');
    modal.classList.remove('hidden');
};

function upDateImage(event){
    const image = createImage(event);
    modal.innerHTML = `
        <span class="fa fa-arrow-circle-o-left arrow left" id="leftArrow"></span>
        <span class="fa fa-arrow-circle-o-right arrow right" id="rightArrow"></span>
    `;

    const arrowLeft = document.querySelector("#leftArrow");
    const arrowRight = document.querySelector("#rightArrow");

    image.addEventListener('pointerdown', startSwipe);
    image.addEventListener('pointermove', swiping);
    image.addEventListener('pointerup', stopSwipe);

    arrowLeft.addEventListener('pointerdown', moveLeft);
    arrowRight.addEventListener('pointerdown', moveRight);

    modal.appendChild(image);
    document.body.classList.add('no-scroll');
    modal.classList.remove('hidden');
}
function moveLeft(event){
    event.preventDefault();
    event.stopPropagation();
    let nextIndex = curr;

    nextIndex++;
    if(nextIndex < 0){
        event.currentTarget.style.transform = '';
        modal.classList.add('hidden');
        return;
    }

    curr = nextIndex;
    upDateImage(arrayOfImg[curr]);
}
function moveRight(event){
    event.preventDefault();
    event.stopPropagation();
    let nextIndex = curr;

    nextIndex--;
    if(nextIndex === arrayOfImg.length){
        event.currentTarget.style.transform = '';
        modal.classList.add('hidden');
        return;
    }

    curr = nextIndex;
    upDateImage(arrayOfImg[curr]);
}
function startSwipe(event) {
    event.preventDefault();
    event.stopPropagation();
    origin = event.clientX;

    event.target.setPointerCapture(event.pointerId);
}
function swiping(event) {
    if(origin) {
        let delta = event.clientX - origin;
        const element = event.currentTarget;
        element.style.transform = 'translateX(' + delta + ')';
    }
}
function stopSwipe(event) {
    if(!origin){
        return;
    }

    let nextIndex = curr;

    const currentX = event.clientX;
    const delta = currentX - origin;
    const photoSrc = pics[nextIndex];
    const image = createImage(photoSrc);

    console.log('stop clientX', event.clientX);
    console.log('stop delta', delta);

    origin = null;
    if(Math.abs(delta) < 100){
        event.currentTarget.style.transform = '';
        return;
    }
    if(delta < 0) {
        nextIndex++;
        image.classList.add('animate-next');
    } else {
        nextIndex--;
        image.classList.add('animate-prev');
    }

    if(nextIndex < 0 || nextIndex === pics.length){
        event.currentTarget.style.transform = '';
        return;
    }

    modal.innerHTML = `
        <span class="fas fa-chevron-left arrow arrow--left" id="leftArrow"></span>
        <span class="fas fa-chevron-right arrow arrow--right" id="rightArrow"></span>
    `;

    image.addEventListener('pointerdown', startSwipe);
    image.addEventListener('pointermove', swiping);
    image.addEventListener('pointerup', stopSwipe);

    arrowLeft.addEventListener('pointerup', moveLeft);
    arrowRight.addEventListener('pointerup', moveRight);

    modal.appendChild(image);

    curr = nextIndex;
}
function onModalClick(){
    document.body.classList.remove('no-scroll');
    modal.classList.add('hidden');
    modal.innerHTML = '';
}

function renderGalleryItem(num){
    fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${num}`)
        .then((response)=> {
            let galleryItem = document.createElement('img');
            galleryItem.src = response.url;
            arrayOfImg.push(response.url);
            galleryItem.dataset.index = num;
            galleryItem.addEventListener('pointerdown', onImageClick);
            section.appendChild(galleryItem);
        });
}

for(let i=0;i<numItemsToGenerate;i++){
    renderGalleryItem(i);
}
modal.addEventListener('pointerdown', onModalClick);
