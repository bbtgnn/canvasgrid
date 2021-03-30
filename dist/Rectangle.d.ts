import Point from "./Point";
import Size from "./Size";
export default class Rectangle {
    origin: Point;
    size: Size;
    constructor(origin: Point, size: Size);
    /**
     * Getters
     */
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    get ratio(): number;
    /**
     * Methods
     */
    translate(vector: Point): Rectangle;
    centerSize(size: Size): Point;
    fitRectangleCenter(ratio: number): Rectangle;
    fillRectangleCenter(ratio: number): Rectangle;
}
