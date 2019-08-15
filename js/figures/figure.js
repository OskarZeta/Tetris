import { gameWidth } from '../globals.js';
let st = gameWidth/2;

class Figure {
  constructor (type) {
    this.type = type;
    this.stop = false;
    this.startPos = st;
    this.currentFrame = 1;
  }
  get getCoordinates() {
    return this.coordinates;
  }
  set setCoordinates(array) {
    this.coordinates = array;
  }
  move(dir) {
    switch(dir) {
      case 'UP' : {
        this.setCoordinates = this.getCoordinates.map(pair => ({
          row: pair.row - 1,
          col: pair.col
        }));
        break;
      }
      case 'LEFT' : {
        this.setCoordinates = this.getCoordinates.map(pair => ({
          row: pair.row,
          col: pair.col - 1 
        }));
        break;
      }
      case 'RIGHT' : {
        this.setCoordinates = this.getCoordinates.map(pair => ({
          row: pair.row,
          col: pair.col + 1 
        }));
        break;
      }
      case 'DOWN' :
      default : {
        this.setCoordinates = this.getCoordinates.map(pair => ({
          row: pair.row + 1,
          col: pair.col
        }));
        break;
      }
    }
  }
  stopMoving() {
    this.stop = true;
  }
}

export default Figure;
