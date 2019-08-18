import { gameWidth } from '../globals.js';

class Figure {
  constructor (type) {
    this.type = type;
    this.stop = false;
    this.startPos = gameWidth/2;
    this.currentFrame = 1;
    this.className = 'cell--' + this.type;
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
