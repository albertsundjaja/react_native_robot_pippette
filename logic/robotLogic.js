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

const move = async (direction) => {
    if (!placed) {
        throw new Error("Please issue a PLACE command first.");
    }

    let xChange = 0;
    let yChange = 0;
    switch (direction) {
        case 'N':
            yChange = 1;
            break;
        case 'W':
            xChange = -1;
            break;
        case 'S':
            yChange = -1;
            break;
        case 'E':
            xChange = 1;
            break;
        default:
            throw new Error("Invalid move. Valid move is N, W, S or E.");
    }
    
    // current robot position
    let [x, y] = matrixToCartesianCoor(robotPosition.i, robotPosition.j, matrixMax[0]);
    let newPosition = {x: x + xChange, y: y + yChange};

    let newMatrix = currentMatrix;
    try {
        newMatrix = await place(newPosition)
    } catch (ex) {
        throw ex;
    }

    return _.cloneDeep(newMatrix);

}

/**
 * Check if coordinate is out of bound in the matrix
 * Note that it doesn't matter if the given coordinate is in cartesian/matrix form as they have the same bound in square condition
 * @param {object} coor cartesian/matrix coordinate in the form of {x, y}
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
    place,
    move
}