import '../css/style.css';
import { 
  gameHeight, gameWidth, nextFieldHeight, nextFieldWidth,
  movementSpeeds, loopRate, saveGameState, gameState, pause, level 
} from './globals';
import { pickRandomFigure, setCellProps } from './utils';
import { userActions, globalActions } from './event_handlers';
import { renderGame, renderNextFigure } from './render';
import { 
  generateInitialCells, updateCells, checkBottomCells, 
  clearLines, checkSpawnCells 
} from './grid';

function spawnFigure(FigureClass) {
  let figure = new FigureClass();
  return figure;
}
export function moveFigure(figure, dir, grid) {
  updateCells(figure.getCoordinates, grid, setCellProps(0, null));
  figure.move(dir);
  updateCells(figure.getCoordinates, grid, setCellProps(1, { className: figure.className }));
}
export function rotateFigure(figure, grid) {
  figure.rotate();
  updateCells(figure.getCoordinates, grid, setCellProps(1, { className: figure.className }));
}
function showNextFigure(figure) {
  let grid = generateInitialCells(nextFieldHeight, nextFieldWidth);
  let coords = figure.getCoordinates.map(({ row, col }) => ({
    row: row + 1,
    col: Math.floor(col/(10/nextFieldWidth)) 
  }));
  grid = updateCells(coords, grid, setCellProps(1, { className: figure.className }), false);
  renderNextFigure(grid);
}
export function loadGameState() {
  gameLoop(gameState.grid, { figure: gameState.figure, nextFigure: gameState.nextFigure });
}

function figureLoop(figure, speed, grid) {
  let interval = setInterval(() => {
    if (pause) {
      clearInterval(interval);
      return;
    }
    if (!checkBottomCells(figure.getCoordinates, grid)) {
      clearLines(grid);
      figure.stopMoving();
      clearInterval(interval);
      return;
    }
    moveFigure(figure, 'DOWN', grid);
  }, speed);
}

function gameLoop(grid, gameState) {
  let figure;
  let nextFigure;
  if (gameState) {
    figure = gameState.figure;
    nextFigure = gameState.nextFigure;
  } else {
    figure = spawnFigure(pickRandomFigure());
    nextFigure = spawnFigure(pickRandomFigure());
  }
  updateCells(figure.getCoordinates, grid, setCellProps(1, { className: figure.className }));
  showNextFigure(nextFigure);
  function listenerWrapper(e) {
    userActions(e, figure, grid);
  }
  document.addEventListener('keydown', listenerWrapper);
  figureLoop(figure, movementSpeeds[level-1], grid);
  let interval = setInterval(() => {
    if (figure.stop) {
      figure = nextFigure;
      nextFigure = spawnFigure(pickRandomFigure());
      if (!checkSpawnCells(figure.getCoordinates, grid)) {
        clearInterval(interval);
        document.removeEventListener('keydown', listenerWrapper);
        console.log('GAME OVER MAN!');
        return;
      }
      updateCells(figure.getCoordinates, grid, setCellProps(1, { className: figure.className }));
      showNextFigure(nextFigure);
      figureLoop(figure, movementSpeeds[level-1], grid);
    }
    if (pause) {
      clearInterval(interval);
      document.removeEventListener('keydown', listenerWrapper);
      saveGameState({ grid, figure, nextFigure });
      return;
    }
  }, loopRate);
}

let gameGrid = generateInitialCells(gameHeight, gameWidth);
renderGame(gameGrid);
gameLoop(gameGrid);
document.addEventListener('keypress', globalActions);