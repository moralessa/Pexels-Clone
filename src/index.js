import './styles.scss'
const $ = require('jquery');

const API_KEY = '563492ad6f91700001000001de11052b8f144bf08c38a5369d149e9a';
let nav = document.querySelector('nav');
const navInput = document.getElementById('nav-input');
const heroInput = document.getElementById('hero-input');
const navForm = document.getElementById('nav-form');
const heroForm = document.getElementById('hero-form');
const columnOne = document.getElementById('col-1');
const columnTwo = document.getElementById('col-2');
const columnThree = document.getElementById('col-3');
const heroText = document.querySelector('.hero-text-container');
let photosArr;
let count = 0;

navForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    makeRequest(navInput.value);
    navInput.value = '';
});
heroForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    makeRequest(heroInput.value)
    heroInput.value = '';
});


function reset(){
    $('#col-1').empty();
    $('#col-2').empty();
    $('#col-3').empty();
    count = 0;
}

function makeRequest(inp){
    let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // Call on populateGallery and send the photos as an argument
                    let data = JSON.parse(xhttp.responseText);
                    photosArr = data.photos;
                    reset();
                    populateGallery();
                }
            };
            xhttp.open("GET", `https://api.pexels.com/v1/search?query=${inp}&per_page=80`, true);
            xhttp.setRequestHeader('Authorization', API_KEY);
            xhttp.send();
}

function populateGallery(){ // Helper function to populate the gallery
    for(let i = 0; i <= 15; i+= 3){
        populateColumn(photosArr[count++], columnOne);
        populateColumn(photosArr[count++], columnTwo);
        populateColumn(photosArr[count++], columnThree);
    }
}

function populateColumn(imageObj, parentColumn){ // Helper function to populate each column
    let imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    let image = document.createElement('img');
    image.src = imageObj.src.large;
    image.alt = image.alt;
    let photographer = document.createElement('p');
    photographer.classList.add('photographer');
    photographer.textContent = imageObj.photographer;
    imageContainer.append(image, photographer);
    parentColumn.append(imageContainer);
}


window.addEventListener('scroll',() =>{ // Event Listener that appends population of gallery when you scroll to the bottom of the page
    if(window.innerHeight + window.scrollY >= document.body.scrollHeight){
        populateGallery();
    }
})

window.addEventListener('scroll', navToggle); // Event listener for nav toggle functionality

function navToggle(){ //nav toggle
    if(window.scrollY > (heroForm.offsetHeight + heroText.offsetTop)){
        nav.classList.add('dark');
    }else{
        nav.classList.remove('dark');
    }
}

makeRequest('nature');
