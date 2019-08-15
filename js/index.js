import figureClasses from './figures/index';
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
function updateCells(coords, grid, value, rerender=true) {
  coords.forEach(({ row, col }) => grid[row][col] = value);
  if (rerender) renderGame(grid);
}
function spawnFigure(FigureClass) {
  let figure = new FigureClass();
  return figure;
}
function moveFigure(figure, dir, grid) {
  updateCells(figure.getCoordinates, grid, 0);
  figure.move(dir);
  updateCells(figure.getCoordinates, grid, 1);
}
function rotateFigure(figure, grid) {
  updateCells(figure.getCoordinates, grid, 0);
  figure.rotate();
  updateCells(figure.getCoordinates, grid, 1);
}
function checkTopCells(coords, grid) {
  let topRow = Math.min.apply(null, coords.map(pair => pair.row));
  return Boolean(grid[topRow]); 
}
function checkBottomCells(coords, grid) {
  let bottomRow = Math.max.apply(null, coords.map(pair => pair.row)) + 1;
  if (grid[bottomRow]) {
    let columns = [...new Set(coords.map(pair => pair.col))];
    return !columns.some(col => {
      let row = Math.max.apply(null, coords.filter(pair => pair.col === col).map(pair => pair.row)) + 1;
      return grid[row][col] === 1;
    });
  }
  return false;
}
function checkLeftCells(coords, grid, range = 1) {
  let leftColumn = Math.min.apply(null, coords.map(pair => pair.col)) - range;
  if (grid[0][leftColumn] !== undefined) {
    let rows = [...new Set(coords.map(pair => pair.row))];
    return !rows.some(row => {
      let col = Math.min.apply(null, coords.filter(pair => pair.row === row).map(pair => pair.col)) - range;
      return grid[row][col] === 1;
    });
  }
  return false;
}
function checkRightCells(coords, grid, range = 1) {
  let rightColumn = Math.max.apply(null, coords.map(pair => pair.col)) + range;
  if (grid[0][rightColumn] !== undefined) {
    let rows = [...new Set(coords.map(pair => pair.row))];
    return !rows.some(row => {
      let col = Math.max.apply(null, coords.filter(pair => pair.row === row).map(pair => pair.col)) + range;
      return grid[row][col] === 1;
    });
  }
  return false;
}

function pickRandomFigure() {
  return figureClasses[Math.floor(Math.random() * figureTypes.length)];
}

function userActions(event, figure, grid) {
  if (figure.stop) return;
  switch (event.keyCode) {
    case 37 : {
      if (!checkLeftCells(figure.getCoordinates, grid)) return;
      moveFigure(figure, 'LEFT', grid);
      break;
    }
    case 38 : {
      const nextCoords = figure.rotate(true);
      updateCells(figure.getCoordinates, grid, 0, false);
      if (checkTopCells(nextCoords, grid) &&
          checkBottomCells(nextCoords, grid) && 
          checkLeftCells(nextCoords, grid, 0) &&
          checkRightCells(nextCoords, grid, 0)){
            rotateFigure(figure, grid);
      } else {
        updateCells(figure.getCoordinates, grid, 1, false);
      }
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
  //let figure = spawnFigure(figureClasses[0]);
  updateCells(figure.getCoordinates, grid, 1);
  function listenerWrapper(e) {
    userActions(e, figure, grid);
  }
  document.addEventListener('keydown', listenerWrapper);
  figureLoop(figure, movementSpeed, grid);
  let interval = setInterval(() => {
    if (figure.stop) {
      figure = spawnFigure(pickRandomFigure());
      //figure = spawnFigure(figureClasses[0]);
      updateCells(figure.getCoordinates, grid, 1);
      if (!checkBottomCells(figure.getCoordinates, grid)) {
        clearInterval(interval);
        document.removeEventListener('keydown', listenerWrapper);
        console.log('GAME OVER MAN!');
        return;
      }
      figureLoop(figure, movementSpeed, grid);
    }
  }, loopRate);
}

let gameGrid = generateInitialCells(gameHeight, gameWidth);
renderGame(gameGrid);
gameLoop(gameGrid);