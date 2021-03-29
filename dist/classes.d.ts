export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(point: Point): Point;
    smult(value: number): Point;
    vscale(scale: Point, origin?: Point): Point;
    sscale(scale: number, origin?: Point): Point;
}
export declare class Size {
    width: number;
    height: number;
    constructor(width: number, height: number);
    get ratio(): number;
    fitSize(ratio: number): Size;
}
export declare class Rectangle {
    origin: Point;
    size: Size;
    constructor(origin: Point, size: Size);
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    get ratio(): number;
    translate(vector: Point): Rectangle;
    fitRectangleCenter(ratio: number): Rectangle;
}
export declare class Cell extends Rectangle {
    index: {
        i: number;
        j: number;
    };
    constructor(origin: Point, size: Size, index: {
        i: number;
        j: number;
    });
    get i(): number;
    get j(): number;
}
export declare class UnitGrid {
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
    get height(): number;
    get width(): number;
    get ratio(): number;
    getCellHeightFromGridHeight(height: number): number;
    getCellHeightFromGridWidth(width: number): number;
    getCells(cell_height?: number, translation?: Point): Array<Cell>;
}
