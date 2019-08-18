export function renderCell({ value, modifiers }) {
  let cellEl = document.createElement('DIV');
  cellEl.classList.add('cell');
  if (value === 1) cellEl.classList.add('cell--occupied');
  if (modifiers) {
    cellEl.classList.add(modifiers.className);
  }
  return cellEl;
}
export function renderRow(row) {
  let rowEl = document.createElement('DIV');
  rowEl.classList.add('row');
  for (let i = 0; i < row.length; i++) {
    let cell = renderCell(row[i]);
    rowEl.appendChild(cell);
  }
  return rowEl;
}
export function renderGame(array) {
  let gameEl = document.getElementById('game');
  clearGame();
  for (let i = 0; i < array.length; i++) {
    let row = renderRow(array[i]);
    gameEl.appendChild(row);
  }
}
export function renderScore(score) {
  let scoreEl = document.getElementById('score');
  scoreEl.innerHTML = score;
}
export function clearGame() {
  let gameEl = document.getElementById('game');
  gameEl.innerHTML = '';
}