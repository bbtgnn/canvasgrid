import Point from "./Point";
import Size from "./Size";

export default class Rectangle {
  origin: Point;
  size: Size;

  constructor(origin: Point, size: Size) {
    this.origin = origin;
    this.size = size;
  }

  /**
   * Getters
   */

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

  /**
   * Methods
   */

  translate(vector: Point): Rectangle {
    return new Rectangle(this.origin.add(vector), this.size);
  }

  centerSize(size: Size): Point {
    const x = this.origin.x + (this.width - size.width) / 2;
    const y = this.origin.y + (this.height - size.height) / 2;
    return new Point(x, y);
  }

  fitRectangleCenter(ratio: number): Rectangle {
    // Getting the base size
    const size = this.size.fitSize(ratio);
    //
    return new Rectangle(this.centerSize(size), size);
  }

  fillRectangleCenter(ratio: number): Rectangle {
    // Getting base size
    const size = this.size.fillSize(ratio);
    //
    return new Rectangle(this.centerSize(size), size);
  }
}
