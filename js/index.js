import Figure from './figure.js';
import '../css/style.css';
import { gameHeight, gameWidth, figureTypes, movementSpeed, loopRate } from './globals';
import { renderGame } from './render';

function generateInitialCells(height, width) {
  let array = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push(0);
    }
    array.push(row);
  }
  return array;
}
function updateCells(coords, grid, value) {
  coords.forEach(({ row, cell }) => grid[row][cell] = value);
  renderGame(grid);
}
function spawnFigure(type) {
  let figure = new Figure(type);
  return figure;
}
function moveFigure(figure, dir, grid) {
  updateCells(figure.getCoordinates, grid, 0);
  figure.move(dir);
  updateCells(figure.getCoordinates, grid, 1);
}
function checkBottomCells(coords, grid) {
  let bottomRow = Math.max.apply(null, coords.map(pair => pair.row)) + 1;
  if (grid[bottomRow]) {
    let columns = [...new Set(coords.map(pair => pair.cell))];
    return !columns.some(col => {
      let row = Math.max.apply(null, coords.filter(pair => pair.cell === col).map(pair => pair.row)) + 1;
      return grid[row][col] === 1;
    });
  }
  return false;
}
function checkLeftCells(coords, grid) {
  let leftColumn = Math.min.apply(null, coords.map(pair => pair.cell)) - 1;
  if (grid[0][leftColumn] !== undefined) {
    let rows = [...new Set(coords.map(pair => pair.row))];
    return !rows.some(row => {
      let col = Math.min.apply(null, coords.filter(pair => pair.row === row).map(pair => pair.cell)) - 1;
      return grid[row][col] === 1;
    });
  }
  return false;
}
function checkRightCells(coords, grid) {
  let rightColumn = Math.max.apply(null, coords.map(pair => pair.cell)) + 1;
  if (grid[0][rightColumn] !== undefined) {
    let rows = [...new Set(coords.map(pair => pair.row))];
    return !rows.some(row => {
      let col = Math.max.apply(null, coords.filter(pair => pair.row === row).map(pair => pair.cell)) + 1;
      return grid[row][col] === 1;
    });
  }
  return false;
}

function pickRandomFigure() {
  return figureTypes[Math.floor(Math.random() * figureTypes.length)];
}

function userActions(event, figure, grid) {
  if (figure.stop) return;
  switch (event.keyCode) {
    case 37 : {
      if (!checkLeftCells(figure.getCoordinates, grid)) return;
      moveFigure(figure, 'LEFT', grid);
      break;
    }
    case 39 : {
      if (!checkRightCells(figure.getCoordinates, grid)) return;
      moveFigure(figure, 'RIGHT', grid);
      break;
    }
    case 40:
    default : {
      if (!checkBottomCells(figure.getCoordinates, grid)) return;
      moveFigure(figure, 'DOWN', grid);
    }
  }
}

function figureLoop(figure, speed, grid) {
  let intervalId = setInterval(() => {
    if (!checkBottomCells(figure.getCoordinates, grid)) {
      figure.stopMoving();
      clearInterval(intervalId);
      return;
    }
    moveFigure(figure, 'DOWN', grid);
  }, speed);
}
function gameLoop(grid) {
  let figure = spawnFigure(pickRandomFigure());
  updateCells(figure.getCoordinates, grid, 1);
  function listenerWrapper(e) {
    userActions(e, figure, grid);
  }
  document.addEventListener('keydown', listenerWrapper);
  figureLoop(figure, movementSpeed, grid);
  let interval = setInterval(() => {
    if (gameOver) {
      console.log('GAME OVER MAN!');
      clearInterval(interval);
      document.removeEventListener('keydown', listenerWrapper);
      return;
    }
    if (figure.stop) {
      figure = spawnFigure(pickRandomFigure());
      updateCells(figure.getCoordinates, grid, 1);
      if (!checkBottomCells(figure.getCoordinates, grid)) {
        gameOver = true;
      }
      figureLoop(figure, movementSpeed, grid);
    }
  }, loopRate);
}

let gameOver = false;
let gameGrid = generateInitialCells(gameHeight, gameWidth);
renderGame(gameGrid);
gameLoop(gameGrid);