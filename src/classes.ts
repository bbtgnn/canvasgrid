function round(v: number, d = 2): number {
  const p = Math.pow(10, d);
  return Math.round(v * p) / p;
}

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = round(x);
    this.y = round(y);
  }

  add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  smult(value: number): Point {
    return new Point(this.x * value, this.y * value);
  }

  vscale(scale: Point, origin = new Point(0, 0)): Point {
    return new Point(
      origin.x + (this.x - origin.x) * scale.x,
      origin.y + (this.y - origin.y) * scale.y
    );
  }

  sscale(scale: number, origin = new Point(0, 0)): Point {
    return this.vscale(new Point(scale, scale), origin);
  }
}

export class Size {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = round(width);
    this.height = round(height);
  }

  get ratio(): number {
    return this.width / this.height;
  }

  fitSize(ratio: number): Size {
    let width: number;
    let height: number;
    //
    if (this.ratio > ratio) {
      height = this.height;
      width = height * ratio;
    }
    //
    else {
      width = this.width;
      height = width / ratio;
    }
    return new Size(width, height);
  }
}

export class Rectangle {
  origin: Point;
  size: Size;

  constructor(origin: Point, size: Size) {
    this.origin = origin;
    this.size = size;
  }

  // Simple shortcuts

  get x(): number {
    return this.origin.x;
  }

  get y(): number {
    return this.origin.y;
  }

  get width(): number {
    return this.size.width;
  }

  get height(): number {
    return this.size.height;
  }

  get ratio(): number {
    return this.size.ratio;
  }

  //

  translate(vector: Point): Rectangle {
    return new Rectangle(this.origin.add(vector), this.size);
  }

  fitRectangleCenter(ratio: number): Rectangle {
    // Getting the base size
    const size = this.size.fitSize(ratio);
    // Then we calculate its new x & y
    const x = this.origin.x + (this.width - size.width) / 2;
    const y = this.origin.y + (this.height - size.height) / 2;
    //
    return new Rectangle(new Point(x, y), size);
  }
}

export class Cell extends Rectangle {
  index: { i: number; j: number };

  constructor(origin: Point, size: Size, index: { i: number; j: number }) {
    super(origin, size);
    this.index = index;
  }

  get i(): number {
    return this.index.i;
  }

  get j(): number {
    return this.index.j;
  }
}

export class UnitGrid {
  rows: number;
  columns: number;
  cell_ratio: number;
  spacing: {
    column: number;
    row: number;
  };

  constructor(
    rows: number,
    columns: number,
    cell_ratio = 1,
    spacing = { column: 0, row: 0 }
  ) {
    this.rows = rows;
    this.columns = columns;
    this.cell_ratio = cell_ratio;
    this.spacing = spacing;
  }

  get height(): number {
    /**
     * number of cells in a column   * cell height +
     * number of gaps between colums * gap height
     */
    return this.rows * 1 + (this.rows - 1) * this.spacing.row;
  }

  get width(): number {
    /**
     * number of cell in row        * cell width +
     * number of gaps between rows  * gap width
     */
    return (
      this.columns * this.cell_ratio + (this.columns - 1) * this.spacing.column
    );
  }

  get ratio(): number {
    return this.width / this.height;
  }

  getCellHeightFromGridHeight(height: number): number {
    return height / this.height;
  }

  getCellHeightFromGridWidth(width: number): number {
    return width / this.width;
  }

  getCells(cell_height = 1, translation = new Point(0, 0)): Array<Cell> {
    const cells: Array<Cell> = [];
    for (let r = 0; r < this.rows; r++) {
      const y: number = r * (1 + this.spacing.row);
      for (let c = 0; c < this.columns; c++) {
        const x: number = c * (this.cell_ratio + this.spacing.column);
        const origin = new Point(x, y).sscale(cell_height).add(translation);
        cells.push(
          new Cell(
            origin,
            new Size(cell_height * this.cell_ratio, cell_height),
            {
              i: r,
              j: c,
            }
          )
        );
      }
    }
    return cells;
  }
}
