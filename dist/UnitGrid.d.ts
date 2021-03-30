import Size from "./Size";
import Cell from "./Cell";
export default class UnitGrid {
    rows: number;
    columns: number;
    cell_ratio: number;
    spacing: {
        column: number;
        row: number;
    };
    constructor(rows: number, columns: number, cell_ratio?: number, spacing?: {
        column: number;
        row: number;
    });
    /**
     * Getters
     */
    get height(): number;
    get width(): number;
    get ratio(): number;
    get cellSize(): Size;
    /**
     * Methods
     */
    getCellHeightFromGridHeight(height: number): number;
    getCellHeightFromGridWidth(width: number): number;
    getCells(): Array<Cell>;
}
