import figureClasses from './figures/index';

export function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }
}
export function pickRandomFigure() {
  return figureClasses[Math.floor(Math.random() * figureClasses.length)];
}
export function setCellProps(value, modifiers) {
  return { value, modifiers };
}