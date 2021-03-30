import Point from "./Point";
import Size from "./Size";
import Cell from "./Cell";
export default class Grid {
    rows: number;
    columns: number;
    cell: Size;
    spacing: {
        column: number;
        row: number;
    };
    origin: Point;
    constructor(rows: number, columns: number, cell: Size, spacing?: {
        column: number;
        row: number;
    }, origin?: Point);
    /**
     * Getters
     */
    get height(): number;
    get width(): number;
    get ratio(): number;
    setOrigin(point: Point): Grid;
    /**
     * Methods
     */
    getCells(origin?: Point): Array<Cell>;
    fillHeight(height: number): Grid;
    fillWidth(width: number): Grid;
}
