import '../css/style.css';
import { gameHeight, gameWidth, movementSpeed, loopRate } from './globals';
import figureClasses from './figures/index';
import { userActions } from './event_handlers';
import { renderGame } from './render';
import { generateInitialCells, updateCells, checkBottomCells, clearLines, checkSpawnCells } from './grid';

function spawnFigure(FigureClass) {
  let figure = new FigureClass();
  return figure;
}
export function setCellProps(value, modifiers) {
  return { value, modifiers };
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
function pickRandomFigure() {
  return figureClasses[Math.floor(Math.random() * figureClasses.length)];
}
export function addScore(value) {
  score += value;
}

function figureLoop(figure, speed, grid) {
  let intervalId = setInterval(() => {
    if (!checkBottomCells(figure.getCoordinates, grid)) {
      clearLines(grid);
      figure.stopMoving();
      clearInterval(intervalId);
      return;
    }
    moveFigure(figure, 'DOWN', grid);
  }, speed);
}
function gameLoop(grid) {
  let figure = spawnFigure(pickRandomFigure());
  //let figure = spawnFigure(figureClasses[3]);
  updateCells(figure.getCoordinates, grid, setCellProps(1, { className: figure.className }));
  function listenerWrapper(e) {
    userActions(e, figure, grid);
  }
  document.addEventListener('keydown', listenerWrapper);
  figureLoop(figure, movementSpeed, grid);
  let interval = setInterval(() => {
    if (figure.stop) {
      figure = spawnFigure(pickRandomFigure());
      if (!checkSpawnCells(figure.getCoordinates, grid)) {
        clearInterval(interval);
        document.removeEventListener('keydown', listenerWrapper);
        console.log('GAME OVER MAN!');
        return;
      }
      updateCells(figure.getCoordinates, grid, setCellProps(1, { className: figure.className }));
      figureLoop(figure, movementSpeed, grid);
    }
  }, loopRate);
}

let gameGrid = generateInitialCells(gameHeight, gameWidth);
export let score = 0;

renderGame(gameGrid);
gameLoop(gameGrid);