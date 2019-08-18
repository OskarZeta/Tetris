import { renderGame, renderScore, renderLevel } from './render';
import { gameWidth, scores, levelingUpBase } from './globals';
import { score, addScore, level, increaseLevel } from './index';

export function generateInitialCells(height, width) {
  let array = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push({
        value: 0,
        modifiers: null
      });
    }
    array.push(row);
  }
  return array;
}

export function updateCells(coords, grid, cell, rerender = true) {
  coords.forEach(({ row, col }) => grid[row][col] = cell);
  if (rerender) renderGame(grid);
  return grid;
}

export function checkTopCells(coords, grid) {
  let topRow = Math.min.apply(null, coords.map(pair => pair.row));
  return Boolean(grid[topRow]); 
}
export function checkBottomCells(coords, grid, range = 1) {
  let bottomRow = Math.max.apply(null, coords.map(pair => pair.row)) + range;
  if (grid[bottomRow]) {
    let columns = [...new Set(coords.map(pair => pair.col))];
    return !columns.some(col => {
      let row = Math.max.apply(null, coords.filter(pair => pair.col === col).map(pair => pair.row)) + range;
      return grid[row][col] ? Boolean(grid[row][col].value) : false;
    });
  }
  return false;
}
export function checkLeftCells(coords, grid, range = 1) {
  let leftColumn = Math.min.apply(null, coords.map(pair => pair.col)) - range;
  if (grid[0][leftColumn] !== undefined) {
    let rows = [...new Set(coords.map(pair => pair.row))];
    return !rows.some(row => {
      let col = Math.min.apply(null, coords.filter(pair => pair.row === row).map(pair => pair.col)) - range;
      return grid[row][col] ? Boolean(grid[row][col].value) : false;
    });
  }
  return false;
}
export function checkRightCells(coords, grid, range = 1) {
  let rightColumn = Math.max.apply(null, coords.map(pair => pair.col)) + range;
  if (grid[0][rightColumn] !== undefined) {
    let rows = [...new Set(coords.map(pair => pair.row))];
    return !rows.some(row => {
      let col = Math.max.apply(null, coords.filter(pair => pair.row === row).map(pair => pair.col)) + range;
      return grid[row][col] ? Boolean(grid[row][col].value) : false;
    });
  }
  return false;
}
export function checkSpawnCells(coords, grid) {
  return !coords.some(({ row, col }) => grid[row][col].value === 1);
}
export function addEmptyRows(number, grid) {
  let blankRow = new Array(gameWidth);
  blankRow.fill({
    value: 0,
    modifiers: null
  });
  for (let i = 0; i < number; i++) {
    grid.unshift(blankRow.slice(0));
  }
}
export function deleteRows(rows, grid) {
  rows.forEach(row => grid.splice(row, 1));
}
export function clearLines(grid) {
  let linesToClear = [];
  grid.forEach((row, i) => {
    if (row.every(cell => cell.value === 1)) linesToClear.push(i);
  });
  linesToClear.sort((a, b) => b - a);
  if (linesToClear.length !== 0) {
    deleteRows(linesToClear, grid);
    addEmptyRows(linesToClear.length, grid);
    addScore(scores[linesToClear.length - 1]);
    if (score >= levelingUpBase * (level ** 2)) {
      increaseLevel();
      renderLevel(level);
    }
    renderScore(score);
  }
}