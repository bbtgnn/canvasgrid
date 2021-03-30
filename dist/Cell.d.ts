import Point from "./Point";
import Size from "./Size";
import Rectangle from "./Rectangle";
export default class Cell extends Rectangle {
    index: {
        i: number;
        j: number;
    };
    constructor(origin: Point, size: Size, index: {
        i: number;
        j: number;
    });
    /**
     * Getters
     */
    get i(): number;
    get j(): number;
}
