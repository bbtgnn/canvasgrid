import Point from "./Point";

export default class Size {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  /**
   * Getters
   */

  get ratio(): number {
    return this.width / this.height;
  }

  /**
   * Methods
   */

  sscale(value: number): Size {
    return new Size(this.width * value, this.height * value);
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

  fillSize(ratio: number): Size {
    let width: number;
    let height: number;
    //
    if (this.ratio > ratio) {
      width = this.width;
      height = width / ratio;
    }
    //
    else {
      height = this.height;
      width = height * ratio;
    }
    return new Size(width, height);
  }
}
