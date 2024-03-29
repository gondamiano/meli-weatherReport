"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// retorna true si los tres puntos estan alineados
function isStraightLine(A_x, A_y, B_x, B_y, C_x, C_y) {
    let area = calculateArea(A_x, A_y, B_x, B_y, C_x, C_y);
    if (area === 0) {
        return true;
    }
    else
        return false;
}
exports.isStraightLine = isStraightLine;
//// heron formula para calcular el area
function heronFormula(A_x, A_y, B_x, B_y, C_x, C_y) {
    let distanceAB = Math.pow((A_x - B_x), 2) + Math.pow((A_y - B_y), 2);
    let distanceBC = Math.pow((B_x - C_x), 2) + Math.pow((B_y - C_y), 2);
    let distanceCA = Math.pow((C_x - A_x), 2) + Math.pow((C_y - A_y), 2);
    distanceAB = Math.sqrt(distanceAB);
    distanceBC = Math.sqrt(distanceBC);
    distanceCA = Math.sqrt(distanceCA);
    let p = fixed((distanceAB + distanceBC + distanceCA) / 2);
    let result = Math.sqrt(p * (p - distanceAB) * (p - distanceBC) * (p - distanceCA));
    return result;
}
exports.heronFormula = heronFormula;
//// otra forma de calcular el area 
function calculateArea(A_x, A_y, B_x, B_y, C_x, C_y) {
    let area = (A_x * (B_y - C_y) + B_x * (C_y - A_y) + C_x * (A_y - B_y)) / 2;
    return Math.abs(area);
}
function checkSunInsideTriangle(A, B, C, sunX, sunY) {
    let triangleArea = calculateArea(A.x, A.y, B.x, B.y, C.x, C.y);
    let P1 = calculateArea(sunX, sunY, B.x, B.y, C.x, C.y);
    let P2 = calculateArea(A.x, A.y, sunX, sunY, C.x, C.y);
    let P3 = calculateArea(A.x, A.y, B.x, B.y, sunX, sunY);
    triangleArea = fixed(triangleArea);
    let sunArea = fixed(P1 + P2 + P3);
    return sunArea === triangleArea ? true : false;
}
exports.checkSunInsideTriangle = checkSunInsideTriangle;
//// retorna el permietro de los tres planetas utilizando la distancia entre ellos 
function calculateTrianglePerimeter(A, B, C) {
    let d1 = A.getDistance(B);
    let d2 = B.getDistance(C);
    let d3 = C.getDistance(A);
    return (d1 + d2 + d3);
}
exports.calculateTrianglePerimeter = calculateTrianglePerimeter;
//// fixed input con dos decimales
function fixed(input) {
    return parseFloat(input.toFixed(2));
}
