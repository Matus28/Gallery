'use strict'

// -------------------------------------------------------------------------
// -----------------------------Initialization------------------------------
// -------------------------------------------------------------------------
const body = document.querySelector('body');
const mainContainer = document.querySelector('.main-container');
const mainWindow = document.querySelector('.main-window');
const arrows = mainWindow.querySelectorAll('svg');
const zoomedImage = document.createElement('img');
const titleContainer = document.createElement('div');
const titleContainerHeader = document.createElement('h1');
const titleContainerParagraph = document.createElement('p');
const containerZoomedImage = document.querySelector('.center-image');
const thumbnail = document.querySelector('.thumbnail');
const paragraph = document.querySelector('p');
const zoomFullScreenContainer = document.createElement('div');

const photos = [
  {
    "src": "https://images.unsplash.com/photo-1603486002664-a7319421e133?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80",
    "title": "Moraine Lake",
    "description": "On the picture is scenery of Moraine Lake from Canada.",
    "zoomed": false    
  },
  {
    "src": "https://images.unsplash.com/photo-1566849571098-b2e9eeaee53f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80",
    "title": "Bas Glacier D'arolla",
    "description": "On the picture is scenery of Arolla mountains from Switzerland.",
    "zoomed": false
  },
  {
    "src": "https://images.wallpaperscraft.com/image/single/mountains_lake_trees_404294_1280x720.jpg",
    "title": "Canada mountains",
    "description": "On the picture iis scenery of mountains around Lake. It's from Canada.",
    "zoomed": false
  },
  {
    "src": "https://images.wallpaperscraft.com/image/single/river_forest_trees_404325_1280x720.jpg",
    "title": "Forest",
    "description": "On the picture is scenery of forest and river.",
    "zoomed": false
  }
];

let zoomedImageNumber = -1;

// -------------------------------------------------------------------------
// --------------------------------Main Run---------------------------------
// -------------------------------------------------------------------------
zoomedImageNumber = setZoomedImage();
let thumbnailImages = setThumbnail(zoomedImageNumber);

// -------------------------------------------------------------------------
// --------------------------------Functions--------------------------------
// -------------------------------------------------------------------------
function setThumbnail(zoomedIMG) { 
  for (let i = 0; i < photos.length; i++) {
    if (thumbnail.childElementCount === photos.length) {
      if (i === zoomedIMG) {
        photos[i].zoomed = true;
        thumbnailImages[i].classList.add('selected');
        thumbnailImages[i].classList.remove('not-selected');
      } else {
        photos[i].zoomed = false;
        thumbnailImages[i].classList.add('not-selected');
        thumbnailImages[i].classList.remove('selected');
      }
    } else {
      let minImage = document.createElement('img');
      minImage.src = photos[i].src 
      minImage.title = photos[i].title;
      minImage.alt = photos[i].description;
      if (i === zoomedIMG) {
        photos[i].zoomed = true;
        minImage.classList.add('selected');
        minImage.classList.remove('not-selected');
      } else {
        photos[i].zoomed = false;
        minImage.classList.remove('selected');
        minImage.classList.add('not-selected');
      }
      minImage.style.width = '100px'
      thumbnail.appendChild(minImage);
    }
  }
  return thumbnail.querySelectorAll('img');
}

function setZoomedImage(index = 0) {
  zoomedImage.alt = photos[index].description;
  zoomedImage.title = photos[index].title;
  zoomedImage.src = photos[index].src;
  zoomedImage.classList.add('no-fullscreen');
  containerZoomedImage.appendChild(zoomedImage);
  titleContainer.classList.add('description');
  containerZoomedImage.appendChild(titleContainer);
  titleContainerHeader.textContent = photos[index].title;
  titleContainer.appendChild(titleContainerHeader);
  titleContainerParagraph.innerHTML = `${photos[index].description}`;
  titleContainer.appendChild(titleContainerParagraph);
  paragraph.innerHTML = `${index + 1}/${photos.length}`;
  // mainWindow.insertBefore(zoomedImage, arrows[1]);
  return index;
}

function move(zoomedImageNumber, direction) {
  if (direction === 'next') {
    zoomedImageNumber++;
  } else if (direction === 'previous') {
    zoomedImageNumber--;
  } else if (direction === 'this') {
    zoomedImageNumber;
  }

  if (zoomedImageNumber < 0) {
    zoomedImageNumber = photos.length - 1;
  } else if (zoomedImageNumber >= photos.length) {
    zoomedImageNumber = 0;
  }

  setThumbnail(setZoomedImage(zoomedImageNumber));
  return zoomedImageNumber;
}

function popOutInfo(image, event) {
  let info = document.createElement('div');
  info.classList.add('pop-info');
  info.style.top = (Math.round(image.getBoundingClientRect().top) - 60) + 'px';
  info.style.left = (Math.round(image.getBoundingClientRect().left) - (image.title.length - 13) * 5) + 'px';
  body.appendChild(info);
  let titleParag = document.createElement('p');
  titleParag.textContent = image.title;
  info.appendChild(titleParag);
}

function popInInfo(image) {
  let toRemove = document.querySelectorAll('.pop-info');
  for (let i = 0; i < toRemove.length; i++) {
    toRemove[i].remove();
  }
}

zoomedImage.onclick = (event) => {
  if (zoomedImage.classList.contains('no-fullscreen')) {
    zoomFullScreenContainer.classList.add('fullscreen-container');
    mainContainer.appendChild(zoomFullScreenContainer);
    titleContainer.style.display = 'none';
    zoomedImage.setAttribute('class', 'fullscreen');
  } else if (zoomedImage.classList.contains('fullscreen')) {
    zoomedImage.setAttribute('class', 'no-fullscreen');
    zoomFullScreenContainer.remove();
    titleContainer.style.display = 'flex';
  }
}

zoomFullScreenContainer.onclick = () => {
  if (zoomedImage.classList.contains('fullscreen')) {
    zoomedImage.setAttribute('class', 'no-fullscreen');
    zoomFullScreenContainer.remove();
    titleContainer.style.display = 'flex';
  }
}

arrows.forEach(function(arrow) {
  arrow.addEventListener('click', function() {
    if (this.classList.contains('right')) {
      zoomedImageNumber = move(zoomedImageNumber, 'next');
    } else if (this.classList.contains('left')) {
      zoomedImageNumber = move(zoomedImageNumber, 'previous');
    }
  })
});

thumbnailImages.forEach(function(image, key) {
  image.addEventListener('click', function() {
    zoomedImageNumber = move(key, 'this')
  })
  image.addEventListener('mouseover', function(event) {
    popOutInfo(image, event);
  })
  image.addEventListener('mouseout', function(event) {
    popInInfo(image);
  })
});

function onKeyPress(event) {
  switch (event.keyCode) {
    case 37:
      zoomedImageNumber = move(zoomedImageNumber, 'previous');
      break;
    case 39:
      zoomedImageNumber = move(zoomedImageNumber, 'next');
      break;
    default:
      break;
  }
}
document.body.addEventListener('keydown', onKeyPress);









