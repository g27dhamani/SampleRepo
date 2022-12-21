"use strict";
// let sample: number = 1223
// console.log(sample)
exports.__esModule = true;
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2);
        case "rectangle":
            return shape.width * shape.length;
        case "square":
            return Math.pow(shape.side, 2);
        default:
            var exp = shape;
            return exp;
    }
}
var figure = {
    kind: "circle",
    radius: 23
};
console.log(getArea(figure));
