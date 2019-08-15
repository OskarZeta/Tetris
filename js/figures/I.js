import Figure from './figure';
import { figureTypes } from '../globals';

class Figure_I extends Figure {
  constructor() {
    super(figureTypes[0]);
    this.defaultFrame = [
      { row: 0, col: this.startPos - 2 },
      { row: 0, col: this.startPos - 1 },
      { row: 0, col: this.startPos },
      { row: 0, col: this.startPos + 1 }
    ];
    this.setCoordinates = this.defaultFrame;
  }
  changeFrame() {
    this.currentFrame === 2 ?
      this.currentFrame = 1 :
      this.currentFrame++;
  }
  getFrame1Coords() {
    const oldCoords = this.getCoordinates;
    return [
      { row: oldCoords[0].row + 1, col: oldCoords[0].col - 1 },
      { row: oldCoords[1].row, col: oldCoords[1].col },
      { row: oldCoords[2].row - 1, col: oldCoords[2].col + 1 },
      { row: oldCoords[3].row - 2, col: oldCoords[3].col + 2 }
    ];
  }
  getFrame2Coords() {
    const oldCoords = this.getCoordinates;
    return [
      { row: oldCoords[0].row - 1, col: oldCoords[0].col + 1 },
      { row: oldCoords[1].row, col: oldCoords[1].col },
      { row: oldCoords[2].row + 1, col: oldCoords[2].col - 1 },
      { row: oldCoords[3].row + 2, col: oldCoords[3].col - 2 }
    ];
  }
  rotate(test) {
    const frame = this.currentFrame;
    let coords = [];
    switch(frame) {
      case 1 : {
        coords = this.getFrame2Coords();
        break;
      }
      case 2 : {
        coords = this.getFrame1Coords();
        break;
      }
      default : {
        coords = this.defaultFrame;
      }
    } 
    if (test) return coords;
    this.changeFrame();
    this.setCoordinates = coords;
  }
} 

export default Figure_I;