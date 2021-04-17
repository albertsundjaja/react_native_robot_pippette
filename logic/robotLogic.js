/**
 * this file contains code that simulate the backend
 */
 
import { matrixToCartesianCoor, cartesianToMatrixCoor } from '../utils/matrixUtil';

// store the current state of the matrix
let currentMatrix = [];

// store the flag whether robot has issued first PLACE command
let placed = false;

// store the current position of the robot in matrix coordinate
let robotPosition = {i: -1, j: -1}

// returns empty matrix size x size in dimension
const initWellMatrix = (size) => {
    let matrix = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(
                {
                    row: i, 
                    col: j, 
                    x: matrixToCartesianCoor(i, j, size-1)[0],
                    y: matrixToCartesianCoor(i, j, size-1)[1], 
                    robot: false,
                    filled: false 
                });
        }
        matrix.push(row);
    }
    currentMatrix = matrix;
    placed = false;
    return matrix;
}

/**
 * Place the robot in the coordinate
 * @param {object} coor cartesian coordinate in the form of {x, y} 
 */
const place = (coor) => {
    if (isOutOfBound(coor, currentMatrix)) {
        throw new Error('Out of bound, please check x and y.');
    }

    let [matrixI, matrixJ] = cartesianToMatrixCoor(coor.x, coor.y, currentMatrix.length);

    // remove old robot position
    currentMatrix[robotPosition.i, robotPosition.j].robot = false;
    // place robot in new position
    currentMatrix[matrixI, matrixJ].robot = true;
    // store robot position
    robotPosition = {i: matrixI, j: matrixJ};

    return currentMatrix;
}

/**
 * Check if coordinate is out of bound in the matrix
 * @param {object} coor cartesian coordinate in the form of {x, y}
 * @param {array} matrix the array matrix
 * @returns {boolean}
 */
const isOutOfBound = (coor, matrix) => {
    return false
}

module.exports = {
    initWellMatrix,
    place
}