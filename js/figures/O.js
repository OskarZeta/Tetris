import Figure from './figure';
import { figureTypes } from '../globals';

class Figure_O extends Figure {
  constructor() {
    super(figureTypes[3]);
    this.defaultFrame = [
      { row: 0, col: this.startPos - 1 },
      { row: 0, col: this.startPos },
      { row: 1, col: this.startPos - 1 },
      { row: 1, col: this.startPos }
    ];
    this.setCoordinates = this.defaultFrame;
  }
  rotate(test) {
    //console.log('Are you okay?');
    if (test) return this.defaultFrame;
  }
} 

export default Figure_O;