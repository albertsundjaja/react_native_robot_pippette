/**
 * this file contains code that simulate the backend
 */
 
import { matrixToCartesianCoor, cartesianToMatrixCoor } from '../utils/matrixUtil';
import _, { conformsTo } from 'lodash';

// store the current state of the matrix
let currentMatrix = [];
// store the matrix max position [i, j];
let matrixMax = [0, 0];

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
    // matrix index starts at 0 hence size -1
    matrixMax = [size - 1, size - 1];
    currentMatrix = matrix;
    placed = false;
    return _.cloneDeep(matrix);
}

/**
 * Place the robot in the coordinate
 * @param {object} coor cartesian coordinate in the form of {x, y} 
 */
const place = async (coorData) => {
    if (isOutOfBound(coorData)) {
        throw new Error('Out of bound, please check x and y.');
    }

    // make copy since we are not supposed to mutate the react state in this simulated backend
    let coor = {...coorData}
    // convert to int
    try {
        coor.x = parseInt(coor.x);
        coor.y = parseInt(coor.y);
    } catch (ex) {
        throw new Error('x and y need to be valid integer.')
    }
    

    placed = true;

    let [matrixI, matrixJ] = cartesianToMatrixCoor(coor.x, coor.y, matrixMax[0]);
    // remove old robot position
    if (robotPosition.i != -1) {
        currentMatrix[robotPosition.i][robotPosition.j].robot = false;
    }
    // place robot in new position
    currentMatrix[matrixI][matrixJ]["robot"] = true;
    // store robot position
    robotPosition = {i: matrixI, j: matrixJ};

    return _.cloneDeep(currentMatrix);
}

/**
 * Check if coordinate is out of bound in the matrix
 * @param {object} coor cartesian coordinate in the form of {x, y}
 * @param {array} matrix the array matrix
 * @returns {boolean}
 */
const isOutOfBound = (coor) => {
    if (coor.x < 0 || coor.y < 0 || coor.x > matrixMax[0] || coor.y > matrixMax[1]) {
        return true;
    }
    return false
}

module.exports = {
    initWellMatrix,
    place
}