export function renderCell({ value, modifiers }) {
  const cellEl = document.createElement('DIV');
  cellEl.classList.add('cell');
  if (value === 1) cellEl.classList.add('cell--occupied');
  if (modifiers) {
    cellEl.classList.add(modifiers.className);
  }
  return cellEl;
}
export function renderRow(row) {
  const rowEl = document.createElement('DIV');
  rowEl.classList.add('row');
  for (let i = 0; i < row.length; i++) {
    let cell = renderCell(row[i]);
    rowEl.appendChild(cell);
  }
  return rowEl;
}
export function renderGame(array) {
  const gameEl = document.getElementById('game');
  clearElement(gameEl);
  for (let i = 0; i < array.length; i++) {
    let row = renderRow(array[i]);
    gameEl.appendChild(row);
  }
}
export function renderNextFigure(array) {
  const nextEl = document.getElementById('next');
  clearElement(nextEl);
  for (let i = 0; i < array.length; i++) {
    let row = renderRow(array[i]);
    nextEl.appendChild(row);
  }
}
export function renderScore(score) {
  const scoreEl = document.getElementById('score');
  scoreEl.innerHTML = score;
}
export function renderLevel(level) {
  const levelEl = document.getElementById('level');
  levelEl.innerHTML = level;
}
export function clearElement(element) {
  element.innerHTML = '';
}