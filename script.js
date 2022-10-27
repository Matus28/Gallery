'use strict'

const body = document.querySelector('body');
const mainWindow = document.querySelector('.main-window');
const arrows = mainWindow.querySelectorAll('svg');

const photos = [
  {
    "src": "https://images.unsplash.com/photo-1603486002664-a7319421e133?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80",
    "title": "Moraine Lake",
    "description": "On the picture is scenery of Moraine Lake from Canada."
  },
  {
    "src": "https://images.unsplash.com/photo-1566849571098-b2e9eeaee53f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80",
    "title": "Bas Glacier D'arolla",
    "description": "On the picture is scenery of Arolla mountains from Switzerland."
  },
  {
    "src": "https://images.wallpaperscraft.com/image/single/mountains_lake_trees_404294_1280x720.jpg",
    "title": "Canada mountains",
    "description": "On the picture iis scenery of mountains around Lake. It's from Canada."
  },
  {
    "src": "https://images.wallpaperscraft.com/image/single/river_forest_trees_404325_1280x720.jpg",
    "title": "Forest",
    "description": "On the picture is scenery of forest and river."
  }
];

const zoomedImage = document.createElement('img');
zoomedImage.alt = photos[0].description;
zoomedImage.title = photos[0].title;
zoomedImage.src = photos[2].src;
mainWindow.insertBefore(zoomedImage, arrows[1]);

