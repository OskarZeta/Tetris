import Figure from './figure';
import { figureTypes } from '../globals';

class Figure_Z extends Figure {
  constructor() {
    super(figureTypes[6]);
    this.defaultFrame = [
      { row: 0, col: this.startPos - 1 },
      { row: 0, col: this.startPos },
      { row: 1, col: this.startPos },
      { row: 1, col: this.startPos + 1 }
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
      { row: oldCoords[0].row - 2, col: oldCoords[0].col },
      { row: oldCoords[1].row - 1, col: oldCoords[1].col + 1 },
      { row: oldCoords[2].row, col: oldCoords[2].col },
      { row: oldCoords[3].row + 1, col: oldCoords[3].col + 1 }
    ];
  }
  getFrame2Coords() {
    const oldCoords = this.getCoordinates;
    return [
      { row: oldCoords[0].row + 2, col: oldCoords[0].col },
      { row: oldCoords[1].row + 1, col: oldCoords[1].col - 1 },
      { row: oldCoords[2].row, col: oldCoords[2].col },
      { row: oldCoords[3].row - 1, col: oldCoords[3].col - 1 }
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

export default Figure_Z;