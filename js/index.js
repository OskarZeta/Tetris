import '../css/style.css';
import { gameHeight, gameWidth, movementSpeeds, loopRate, levelsLimit } from './globals';
import figureClasses from './figures/index';
import { userActions } from './event_handlers';
import { renderGame, renderNextFigure } from './render';
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
export function increaseLevel() {
  if (level < levelsLimit) level++;
}
function showNextFigure(figure) {
  let grid = generateInitialCells(4, 9);
  let coords = figure.getCoordinates.map(({ row, col }) => ({
    row: row + 1,
    col: Math.floor(col/(10/9)) 
  }));
  grid = updateCells(coords, grid, setCellProps(1, { className: figure.className }), false);
  renderNextFigure(grid);
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
  let nextFigure = spawnFigure(pickRandomFigure());
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
  }, loopRate);
}

let gameGrid = generateInitialCells(gameHeight, gameWidth);
export let score = 0;
export let level = 1;

renderGame(gameGrid);
gameLoop(gameGrid);