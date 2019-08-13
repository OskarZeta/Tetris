import { gameWidth } from './globals.js';
let st = gameWidth/2;

class Figure {
  constructor (type) {
    this.type = type;
    this.stop = false;
    switch (type) {
      case 'I' : {
        this.setCoordinates = [
          { row: 0, cell: st - 2 },
          { row: 0, cell: st - 1 },
          { row: 0, cell: st },
          { row: 0, cell: st + 1 }
        ];
        break;
      }
      case 'J' : {
        this.setCoordinates = [
          { row: 0, cell: st - 1 },
          { row: 1, cell: st - 1 },
          { row: 1, cell: st },
          { row: 1, cell: st + 1 }
        ];
        break;
      }
      case 'L' : {
        this.setCoordinates = [
          { row: 0, cell: st + 1 },
          { row: 1, cell: st - 1 },
          { row: 1, cell: st },
          { row: 1, cell: st + 1 }
        ];
        break;
      }
      case 'O' : {
        this.setCoordinates = [
          { row: 0, cell: st - 1 },
          { row: 0, cell: st },
          { row: 1, cell: st - 1 },
          { row: 1, cell: st }
        ];
        break;
      }
      case 'S' : {
        this.setCoordinates = [
          { row: 0, cell: st },
          { row: 0, cell: st + 1 },
          { row: 1, cell: st - 1 },
          { row: 1, cell: st }
        ];
        break;
      }
      case 'T' : {
        this.setCoordinates = [
          { row: 0, cell: st },
          { row: 1, cell: st - 1 },
          { row: 1, cell: st },
          { row: 1, cell: st + 1 }
        ];
        break;
      }
      case 'Z' : {
        this.setCoordinates = [
          { row: 0, cell: st - 1 },
          { row: 0, cell: st },
          { row: 1, cell: st },
          { row: 1, cell: st + 1 }
        ];
        break;
      }
      default : {
        throw new Error('Unknown figure type');
      }
    }
  }
  get getCoordinates() {
    return this.coordinates;
  }
  set setCoordinates(array) {
    this.coordinates = array;
  }
  // checkBottom(array) {
  //   let coords = this.getCoordinates;
  //   let bottomRow = Math.max.apply(null, coords.map(obj => obj.row)) + 1;
  //   if (array[bottomRow]) {
  //     return !array[bottomRow].some((cell, index) => 
  //       cell === 1 && coords.find(pair => pair.cell === index && pair.row === bottomRow - 1)
  //     );
  //   }
  //   return false;
  // }
  move(dir) {
    switch(dir) {
      case 'UP' : {
        this.setCoordinates = this.getCoordinates.map(pair => ({
          row: pair.row - 1,
          cell: pair.cell
        }));
        break;
      }
      case 'LEFT' : {
        this.setCoordinates = this.getCoordinates.map(pair => ({
          row: pair.row,
          cell: pair.cell - 1 
        }));
        break;
      }
      case 'RIGHT' : {
        this.setCoordinates = this.getCoordinates.map(pair => ({
          row: pair.row,
          cell: pair.cell + 1 
        }));
        break;
      }
      case 'DOWN' :
      default : {
        this.setCoordinates = this.getCoordinates.map(pair => ({
          row: pair.row + 1,
          cell: pair.cell
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
