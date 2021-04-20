import Point from "./Point";
import Size from "./Size";
import Cell from "./Cell";
import Rectangle from "./Rectangle";

export default class Grid {
  rows: number;
  columns: number;
  cell: Size;
  spacing: {
    column: number;
    row: number;
  };
  origin: Point;

  constructor(
    rows: number,
    columns: number,
    cell: Size,
    spacing = {
      column: 0,
      row: 0,
    },
    origin = new Point(0, 0)
  ) {
    this.rows = rows;
    this.columns = columns;
    this.cell = cell;
    this.spacing = spacing;
    this.origin = origin;
  }

  /**
   * Getters
   */

  get height(): number {
    return this.rows * this.cell.height + (this.rows - 1) * this.spacing.row;
  }

  get width(): number {
    return (
      this.columns * this.cell.width + (this.columns - 1) * this.spacing.column
    );
  }

  get size(): Size {
    return new Size(this.width, this.height);
  }

  get ratio(): number {
    return this.size.ratio;
  }

  get rectangle(): Rectangle {
    return new Rectangle(this.origin, this.size);
  }

  setOrigin(point: Point): Grid {
    this.origin = point;
    return this;
  }

  /**
   * Methods
   */

  getCells(origin: Point = this.origin): Array<Cell> {
    // Array contaning all cells
    const cells: Array<Cell> = [];

    // Iterating over rows
    for (let r = 0; r < this.rows; r++) {
      const y: number = origin.y + r * (this.cell.height + this.spacing.row);

      // Iterating over columns
      for (let c = 0; c < this.columns; c++) {
        const x: number =
          origin.x + c * (this.cell.width + this.spacing.column);

        // Adding new cell
        cells.push(
          new Cell(new Point(x, y), this.cell, {
            i: r,
            j: c,
          })
        );
      }
    }
    return cells;
  }

  fillHeight(height: number): Grid {
    const f = height / this.height;
    return new Grid(this.rows, this.columns, this.cell.sscale(f), {
      column: this.spacing.column * f,
      row: this.spacing.row * f,
    });
  }

  fillWidth(width: number): Grid {
    const f = width / this.width;
    return new Grid(this.rows, this.columns, this.cell.sscale(f), {
      column: this.spacing.column * f,
      row: this.spacing.row * f,
    });
  }
}
