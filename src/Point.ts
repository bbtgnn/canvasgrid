export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  sub(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }

  smult(value: number): Point {
    return new Point(this.x * value, this.y * value);
  }

  vmult(point: Point): Point {
    return new Point(this.x * point.x, this.y * point.y);
  }

  vscale(scale: Point, origin = new Point(0, 0)): Point {
    return origin.add(this.sub(origin).vmult(scale));
  }

  sscale(scale: number, origin = new Point(0, 0)): Point {
    return this.vscale(new Point(scale, scale), origin);
  }
}
