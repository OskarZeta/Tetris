export function renderCell(occupied) {
  let cellEl = document.createElement('DIV');
  cellEl.classList.add('cell');
  if (occupied) cellEl.classList.add('cell--occupied');
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
export function clearGame() {
  let gameEl = document.getElementById('game');
  gameEl.innerHTML = '';
}