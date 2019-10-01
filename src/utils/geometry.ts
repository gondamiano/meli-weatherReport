import Planet from "../models/planet";
import { getBetasoide, getVulcano, getFerengi } from "../dummy/planetDummy";

function isStraightLine(A_x : number, A_y : number, B_x : number, B_y : number, C_x : number, C_y : number) {
    let area : number = calculateArea(A_x, A_y, B_x, B_y, C_x, C_y);
    if(area === 0) {
        return true;
    }
    else return false;
}

function heronFormula(A_x : number, A_y : number, B_x : number, B_y : number, C_x : number, C_y : number) {
    let distanceAB : number = Math.pow((A_x - B_x), 2) + Math.pow((A_y - B_y), 2);
    let distanceBC : number = Math.pow((B_x - C_x), 2) + Math.pow((B_y - C_y), 2);
    let distanceCA : number = Math.pow((C_x - A_x), 2) + Math.pow((C_y - A_y), 2);
    distanceAB = Math.sqrt(distanceAB);
    distanceBC = Math.sqrt(distanceBC);
    distanceCA = Math.sqrt(distanceCA);
    let p = fixed((distanceAB + distanceBC + distanceCA) / 2);    
    let result = Math.sqrt(p * (p - distanceAB) * (p - distanceBC) * (p - distanceCA));    
    return result;
}

function calculateArea(A_x : number, A_y : number, B_x : number, B_y : number, C_x : number, C_y : number) {
    let area : number = (A_x * (B_y - C_y) + B_x * (C_y - A_y) + C_x * (A_y - B_y))/2;
    return Math.abs(area);
}

function checkSunInsideTriangle(A : Planet, B : Planet, C : Planet, sunX : number, sunY : number) {
    let triangleArea = calculateArea(A.x, A.y, B.x, B.y, C.x, C.y);
    let P1 = calculateArea(sunX, sunY, B.x, B.y, C.x, C.y);
    let P2 = calculateArea(A.x, A.y, sunX, sunY, C.x, C.y);
    let P3 = calculateArea(A.x, A.y, B.x, B.y, sunX, sunY);
    triangleArea = fixed(triangleArea);
    let sunArea = fixed(P1+P2+P3);    
    return sunArea === triangleArea ?  true :  false
}

function calculateTrianglePerimeter(A : Planet, B : Planet, C : Planet, sunX : number, sunY : number) {    
    let d1 : number = A.getDistance(B);
    let d2 : number = B.getDistance(C);
    let d3 : number = C.getDistance(A);
    return (d1 + d2 + d3);
}

function fixed(input : number) {
    return parseFloat(input.toFixed(2));
}


export {isStraightLine, checkSunInsideTriangle, calculateTrianglePerimeter, heronFormula};


//let array : Planet[] = [getBetasoide() , getVulcano(), getFerengi()];
if(checkSunInsideTriangle(getBetasoide(), getVulcano(), getFerengi(), 0, 0)) {
    console.log("piola");
}
else {
    console.log("malazo");
    
}