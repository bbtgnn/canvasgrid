function round(v, d = 2) {
  const p = Math.pow(10, d);
  return Math.round(v * p) / p;
}

class Point {
  constructor(x, y) {
    this.x = round(x);
    this.y = round(y);
  }

  add(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  smult(value) {
    return new Point(this.x * value, this.y * value);
  }

  vscale(scale, origin = new Point(0, 0)) {
    return new Point(origin.x + (this.x - origin.x) * scale.x, origin.y + (this.y - origin.y) * scale.y);
  }

  sscale(scale, origin = new Point(0, 0)) {
    return this.vscale(new Point(scale, scale), origin);
  }

}
class Size {
  constructor(width, height) {
    this.width = round(width);
    this.height = round(height);
  }

  get ratio() {
    return this.width / this.height;
  }

  fitSize(ratio) {
    let width;
    let height; //

    if (this.ratio > ratio) {
      height = this.height;
      width = height * ratio;
    } //
    else {
        width = this.width;
        height = width / ratio;
      }

    return new Size(width, height);
  }

}
class Rectangle {
  constructor(origin, size) {
    this.origin = origin;
    this.size = size;
  } // Simple shortcuts


  get x() {
    return this.origin.x;
  }

  get y() {
    return this.origin.y;
  }

  get width() {
    return this.size.width;
  }

  get height() {
    return this.size.height;
  }

  get ratio() {
    return this.size.ratio;
  } //


  translate(vector) {
    return new Rectangle(this.origin.add(vector), this.size);
  }

  fitRectangleCenter(ratio) {
    // Getting the base size
    const size = this.size.fitSize(ratio); // Then we calculate its new x & y

    const x = this.origin.x + (this.width - size.width) / 2;
    const y = this.origin.y + (this.height - size.height) / 2; //

    return new Rectangle(new Point(x, y), size);
  }

}
class Cell extends Rectangle {
  constructor(origin, size, index) {
    super(origin, size);
    this.index = index;
  }

  get i() {
    return this.index.i;
  }

  get j() {
    return this.index.j;
  }

}
class UnitGrid {
  constructor(rows, columns, cell_ratio = 1, spacing = {
    column: 0,
    row: 0
  }) {
    this.rows = rows;
    this.columns = columns;
    this.cell_ratio = cell_ratio;
    this.spacing = spacing;
  }

  get height() {
    /**
     * number of cells in a column   * cell height +
     * number of gaps between colums * gap height
     */
    return this.rows * 1 + (this.rows - 1) * this.spacing.row;
  }

  get width() {
    /**
     * number of cell in row        * cell width +
     * number of gaps between rows  * gap width
     */
    return this.columns * this.cell_ratio + (this.columns - 1) * this.spacing.column;
  }

  get ratio() {
    return this.width / this.height;
  }

  getCellHeightFromGridHeight(height) {
    return height / this.height;
  }

  getCellHeightFromGridWidth(width) {
    return width / this.width;
  }

  getCells(cell_height = 1, translation = new Point(0, 0)) {
    const cells = [];

    for (let r = 0; r < this.rows; r++) {
      const y = r * (1 + this.spacing.row);

      for (let c = 0; c < this.columns; c++) {
        const x = c * (this.cell_ratio + this.spacing.column);
        const origin = new Point(x, y).sscale(cell_height).add(translation);
        cells.push(new Cell(origin, new Size(cell_height * this.cell_ratio, cell_height), {
          i: r,
          j: c
        }));
      }
    }

    return cells;
  }

}

export { Cell, Point, Rectangle, Size, UnitGrid };
//# sourceMappingURL=index.modern.js.map
