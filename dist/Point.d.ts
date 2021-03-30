export default class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(point: Point): Point;
    sub(point: Point): Point;
    smult(value: number): Point;
    vmult(point: Point): Point;
    vscale(scale: Point, origin?: Point): Point;
    sscale(scale: number, origin?: Point): Point;
}
