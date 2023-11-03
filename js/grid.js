const gridSizeX = 37;
const gridSizeY = 15;
let tileNumber = gridSizeX * gridSizeY;
let tiles = [];
let editMode = true;
let resetOn = false;

const createTiles = () => {
  tiles = [];
  const gridContainer = document.querySelector(".grid-container");
  gridContainer.innerHTML = "";
  const tileSize = 49;
  for (let i = 0; i < tileNumber; i++) {
    row = Math.floor(i / gridSizeX);
    col = i % gridSizeX;
    const tile = new Tile(i, row, col);
    const tileElement = tile.createElement(tileSize);
    tiles.push(tile);
    gridContainer.appendChild(tileElement);
  }
}

const updateNeighbors = (tile, allTiles) => {
  const indices = [
    tile.number - gridSizeX, 
    tile.number + gridSizeX,
    tile.number - 1,
    tile.number + 1, 
  ];
  tile.neighbors = [];
  indices.forEach((index) => {
    if (index >= 0 && index < tileNumber) {
      const neighbor = allTiles[index];
      if (neighbor.row === tile.row || neighbor.col === tile.col) {
        if (!neighbor.isTileWall()) tile.neighbors.push(neighbor);
      }
    }
  });
}

const updateTileNeighbors = () => {
  for (let j = 0; j < tiles.length; j++) {
    updateNeighbors(tiles[j], tiles)
  }
}

async function reset() {
  openTiles = [];
  clickedOnToMove = -1;
  startTile = -1;
  endTile = -1;
  previousStartTile = null;
  previousEndTile = null;
  isMouseDown = false;
  resetOn = true;
  editMode = true;
  currentAlg = -1;
  pathFindingDone = false;
  await delay(50);
  visitedTiles = []
  selectedColor = '';
  createTiles();
}
let selectedColor = '';
const changeColor = (color) => {
  selectedColor = color;
}

window.onload = function() {
  createTiles();
}