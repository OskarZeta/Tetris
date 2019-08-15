import Figure from './figure';
import { figureTypes } from '../globals';

class Figure_J extends Figure {
  constructor() {
    super(figureTypes[1]);
    this.defaultFrame = [
      { row: 0, col: this.startPos - 1 },
      { row: 1, col: this.startPos - 1 },
      { row: 1, col: this.startPos },
      { row: 1, col: this.startPos + 1 }
    ];
    this.setCoordinates = this.defaultFrame;
  }
  changeFrame() {
    this.currentFrame === 4 ?
      this.currentFrame = 1 :
      this.currentFrame++;
  }
  getFrame1Coords() {
    const oldCoords = this.getCoordinates;
    return [
      { row: oldCoords[0].row, col: oldCoords[0].col - 1 },
      { row: oldCoords[1].row + 1, col: oldCoords[1].col },
      { row: oldCoords[2].row, col: oldCoords[2].col + 1 },
      { row: oldCoords[3].row - 1, col: oldCoords[3].col + 2 }
    ];
  }
  getFrame2Coords() {
    const oldCoords = this.getCoordinates;
    return [
      { row: oldCoords[0].row + 2, col: oldCoords[0].col },
      { row: oldCoords[1].row + 1, col: oldCoords[1].col + 1 },
      { row: oldCoords[2].row, col: oldCoords[2].col },
      { row: oldCoords[3].row - 1, col: oldCoords[3].col - 1 }
    ];
  }
  getFrame3Coords() {
    const oldCoords = this.getCoordinates;
    return [
      { row: oldCoords[0].row - 1, col: oldCoords[0].col + 2 },
      { row: oldCoords[1].row - 2, col: oldCoords[1].col + 1 },
      { row: oldCoords[2].row - 1, col: oldCoords[2].col },
      { row: oldCoords[3].row, col: oldCoords[3].col - 1 }
    ];
  }
  getFrame4Coords() {
    const oldCoords = this.getCoordinates;
    return [
      { row: oldCoords[0].row - 1, col: oldCoords[0].col - 1 },
      { row: oldCoords[1].row, col: oldCoords[1].col - 2 },
      { row: oldCoords[2].row + 1, col: oldCoords[2].col - 1 },
      { row: oldCoords[3].row + 2, col: oldCoords[3].col }
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
        coords = this.getFrame3Coords();
        break;
      }
      case 3 : {
        coords = this.getFrame4Coords();
        break;
      }
      case 4 : {
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

export default Figure_J;