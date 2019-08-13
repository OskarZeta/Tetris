import Figure from './figure.js';
import '../css/style.css';
import { gameHeight, gameWidth, figureTypes } from './globals';
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

function updateCells(cells, value) {
  cells.forEach(({row, cell}) => {
    array[row][cell] = value;
  });
  renderGame(array);
}
function spawnFigure(type) {
  let figure = new Figure(type);
  updateCells(figure.getCoordinates, 1);
  renderGame(array);
  return figure;
}
function moveFigure(figure, dir) {
  updateCells(figure.getCoordinates, 0);
  figure.move(dir);
  updateCells(figure.getCoordinates, 1);
}
function checkBottomCells(cells, array) {
  let bottomRow = Math.max.apply(null, cells.map(obj => obj.row)) + 1;
  if (array[bottomRow]) {
    let columns = [...new Set(cells.map(pair => pair.cell))];
    return !columns.some(col => {
      let row = Math.max.apply(null, cells.filter(pair => pair.cell === col).map(pair => pair.row)) + 1;
      return array[row][col] === 1;
    });
  }
  return false;
}
function checkLeftCells(cells, array) {
  let leftColumn = Math.min.apply(null, cells.map(obj => obj.cell)) - 1;
  if (array[0][leftColumn] !== undefined) {
    let rows = [...new Set(cells.map(pair => pair.row))];
    return !rows.some(row => {
      let col = Math.min.apply(null, cells.filter(pair => pair.row === row).map(pair => pair.cell)) - 1;
      return array[row][col] === 1;
    });
  }
  return false;
}
function checkRightCells(cells, array) {
  let rightColumn = Math.max.apply(null, cells.map(obj => obj.cell)) + 1;
  if (array[0][rightColumn] !== undefined) {
    let rows = [...new Set(cells.map(pair => pair.row))];
    return !rows.some(row => {
      let col = Math.max.apply(null, cells.filter(pair => pair.row === row).map(pair => pair.cell)) + 1;
      return array[row][col] === 1;
    });
  }
  return false;
}

function pickRandomFigure() {
  return figureTypes[Math.floor(Math.random() * figureTypes.length)];
}

function figureLoop(figure, speed) {
  let intervalId = setInterval(() => {
    if (!checkBottomCells(figure.getCoordinates, array)) {
      figure.stopMoving();
      clearInterval(intervalId);
      return;
    }
    moveFigure(figure, 'DOWN');
  }, speed);
}
function gameLoop() {
  let figure = spawnFigure(pickRandomFigure());
  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 37 : {
        if (!checkLeftCells(figure.getCoordinates, array)) return;
        moveFigure(figure, 'LEFT');
        break;
      }
      case 39 : {
        if (!checkRightCells(figure.getCoordinates, array)) return;
        moveFigure(figure, 'RIGHT');
        break;
      }
      case 40:
      default : {
        if (!checkBottomCells(figure.getCoordinates, array)) return;
        moveFigure(figure, 'DOWN');
      }
    }
  });
  figureLoop(figure, 200);
  let interval = setInterval(() => {
    if (gameOver) {
      console.log('GAME OVER MAN!');
      clearInterval(interval);
      return;
    }
    if (figure.stop) {
      figure = spawnFigure(pickRandomFigure());
      if (!checkBottomCells(figure.getCoordinates, array)) {
        gameOver = true;
      }
      figureLoop(figure, 200);
    }
  }, 500);
}

let gameOver = false;
let array = generateInitialCells(gameHeight, gameWidth);
renderGame(array);
gameLoop();