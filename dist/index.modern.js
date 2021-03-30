class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  sub(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }

  smult(value) {
    return new Point(this.x * value, this.y * value);
  }

  vmult(point) {
    return new Point(this.x * point.x, this.y * point.y);
  }

  vscale(scale, origin = new Point(0, 0)) {
    return origin.add(this.sub(origin).vmult(scale));
  }

  sscale(scale, origin = new Point(0, 0)) {
    return this.vscale(new Point(scale, scale), origin);
  }

}

class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  /**
   * Getters
   */


  get ratio() {
    return this.width / this.height;
  }
  /**
   * Methods
   */


  sscale(value) {
    return new Size(this.width * value, this.height * value);
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

  fillSize(ratio) {
    let width;
    let height; //

    if (this.ratio > ratio) {
      width = this.width;
      height = width / ratio;
    } //
    else {
        height = this.height;
        width = height * ratio;
      }

    return new Size(width, height);
  }

}

class Rectangle {
  constructor(origin, size) {
    this.origin = origin;
    this.size = size;
  }
  /**
   * Getters
   */


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
  }
  /**
   * Methods
   */


  translate(vector) {
    return new Rectangle(this.origin.add(vector), this.size);
  }

  centerSize(size) {
    const x = this.origin.x + (this.width - size.width) / 2;
    const y = this.origin.y + (this.height - size.height) / 2;
    return new Point(x, y);
  }

  fitRectangleCenter(ratio) {
    // Getting the base size
    const size = this.size.fitSize(ratio); //

    return new Rectangle(this.centerSize(size), size);
  }

  fillRectangleCenter(ratio) {
    // Getting base size
    const size = this.size.fillSize(ratio); //

    return new Rectangle(this.centerSize(size), size);
  }

}

class Cell extends Rectangle {
  constructor(origin, size, index) {
    super(origin, size);
    this.index = index;
  }
  /**
   * Getters
   */


  get i() {
    return this.index.i;
  }

  get j() {
    return this.index.j;
  }

}

class Grid {
  constructor(rows, columns, cell, spacing = {
    column: 0,
    row: 0
  }, origin = new Point(0, 0)) {
    this.rows = rows;
    this.columns = columns;
    this.cell = cell;
    this.spacing = spacing;
    this.origin = origin;
  }
  /**
   * Getters
   */


  get height() {
    return this.rows * this.cell.height + (this.rows - 1) * this.spacing.row;
  }

  get width() {
    return this.columns * this.cell.width + (this.columns - 1) * this.spacing.column;
  }

  get ratio() {
    return this.width / this.height;
  }

  setOrigin(point) {
    this.origin = point;
    return this;
  }
  /**
   * Methods
   */


  getCells(origin = this.origin) {
    // Array contaning all cells
    const cells = []; // Iterating over rows

    for (let r = 0; r < this.rows; r++) {
      const y = origin.y + r * (this.cell.height + this.spacing.row); // Iterating over columns

      for (let c = 0; c < this.columns; c++) {
        const x = origin.x + c * (this.cell.width + this.spacing.column); // Adding new cell

        cells.push(new Cell(new Point(x, y), this.cell, {
          i: r,
          j: c
        }));
      }
    }

    return cells;
  }

  fillHeight(height) {
    const f = height / this.height;
    return new Grid(this.rows, this.columns, this.cell.sscale(f), {
      column: this.spacing.column * f,
      row: this.spacing.row * f
    });
  }

  fillWidth(width) {
    const f = width / this.width;
    return new Grid(this.rows, this.columns, this.cell.sscale(f), {
      column: this.spacing.column * f,
      row: this.spacing.row * f
    });
  }

}

function getCanvasGrid(mode, canvas, grid) {
  // Creating canvas rectangle
  const canvasRect = new Rectangle(new Point(canvas.x, canvas.y), new Size(canvas.width, canvas.height)); // Creating unit grid

  const unitGrid = new Grid(grid.rows, grid.columns, new Size(grid.cell_ratio, 1), grid.spacing); // Creating grid rectangle

  let gridRect;

  if (mode == "fill") {
    gridRect = canvasRect.fillRectangleCenter(unitGrid.ratio);
  } else {
    gridRect = canvasRect.fitRectangleCenter(unitGrid.ratio);
  } // Setting origin


  const origin = canvasRect.origin.add(gridRect.origin); // Scaling grid

  return unitGrid.fillHeight(gridRect.height).setOrigin(origin);
}

export { Cell, Grid, Point, Rectangle, Size, getCanvasGrid };
//# sourceMappingURL=index.modern.js.map
