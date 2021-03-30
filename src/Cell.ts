import Point from "./Point";
import Size from "./Size";
import Rectangle from "./Rectangle";

export default class Cell extends Rectangle {
  index: { i: number; j: number };

  constructor(origin: Point, size: Size, index: { i: number; j: number }) {
    super(origin, size);
    this.index = index;
  }

  /**
   * Getters
   */

  get i(): number {
    return this.index.i;
  }

  get j(): number {
    return this.index.j;
  }
}
