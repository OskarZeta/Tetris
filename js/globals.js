export let gameWidth = 10;
export let gameHeight = 20; 
export let nextFieldHeight = 4;
export let nextFieldWidth = 9;
export let movementSpeeds = [ 700, 500, 450, 350, 300, 250, 200, 150, 100, 50 ];
export let loopRate = 400;
export const figureTypes = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
export const scores = [100, 300, 700, 1500];
export const levelingUpBase = 1000;
export const levelsLimit = 10;
export let score = 0;
export let level = 1;
export let gameState = {};
export let pause = false;

export function addScore(value) {
  score += value;
}
export function increaseLevel() {
  if (level < levelsLimit) level++;
}
export function setPause(value) {
  pause = value;
}
export function saveGameState(state) {
  gameState = state;
}