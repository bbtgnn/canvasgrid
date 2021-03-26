import { Point, Size, Rectangle, UnitGrid } from "../index";
import paper from "paper";

// Getting canvas
const canvas = document.getElementById("canvas");

// Setup paperjs
(paper as any).setup(canvas);

// Creating rectangle
const r = new Rectangle(new Point(20, 30), new Size(400, 400));
console.log(r);

// Drawing rectangle
const rp = new paper.Path.Rectangle(r);
(rp as any).strokeColor = "red";

// Creating grid
const ug = new UnitGrid(10, 10, 0.5, { column: 0.5, row: 1 });

// Fitting rectange
const f = r.fitRectangleCenter(ug.ratio);

// Drawing fitted rectangle
const fp = new paper.Path.Rectangle(f);
// (fp as any).strokeColor = "teal";

// New grid

for (let c of ug.getCells(ug.getCellHeightFromGridHeight(f.height), f.origin)) {
  console.log(c);
  // Drawing it
  const cshp = new paper.Path.Rectangle(c);
  (cshp as any).strokeColor = "teal";
}
