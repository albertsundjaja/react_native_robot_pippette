// transform cartesian coordinate (0, 0) at bottom left to matrix position (0, 0) top left
const cartesianToMatrixCoor = (x, y, size) => {
    let i = size - y;
    let j = x;
    return [i, j];
}

const matrixToCartesianCoor = (i, j, size) => {
    let x = j;
    let y = size - i;
    return [x, y];
}

module.exports = {
    cartesianToMatrixCoor,
    matrixToCartesianCoor
}