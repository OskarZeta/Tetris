import { checkBottomCells, checkTopCells, checkLeftCells, checkRightCells, updateCells } from './grid';
import { moveFigure, rotateFigure, setCellProps } from './index';

export function userActions(event, figure, grid) {
  if (figure.stop) return;
  switch (event.keyCode) {
    case 37 : {
      if (!checkLeftCells(figure.getCoordinates, grid)) return;
      moveFigure(figure, 'LEFT', grid);
      break;
    }
    case 38 : {
      const nextCoords = figure.rotate(true);
      updateCells(figure.getCoordinates, grid, setCellProps(0, null), false);
      if (checkTopCells(nextCoords, grid) &&
          checkBottomCells(nextCoords, grid) && 
          checkLeftCells(nextCoords, grid, 0) &&
          checkRightCells(nextCoords, grid, 0)) {
            rotateFigure(figure, grid);
      } else {
        updateCells(figure.getCoordinates, grid, setCellProps(1, { className: figure.className }), false);
      }
      break;
    }
    case 39 : {
      if (!checkRightCells(figure.getCoordinates, grid)) return;
      moveFigure(figure, 'RIGHT', grid);
      break;
    }
    case 40 : {
      if (!checkBottomCells(figure.getCoordinates, grid)) return;
      moveFigure(figure, 'DOWN', grid);
      break;
    }
    case 32: {
      while (checkBottomCells(figure.getCoordinates, grid)) {
        moveFigure(figure, 'DOWN', grid);
      }
      break;
    }
  }
}