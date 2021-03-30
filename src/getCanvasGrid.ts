import Grid from "./Grid";
import Point from "./Point";
import Rectangle from "./Rectangle";
import Size from "./Size";

export default function getCanvasGrid(
  mode: "fill" | "fit",
  canvas: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  grid: {
    rows: number;
    columns: number;
    cell_ratio: number;
    spacing: { column: number; row: number };
  }
): Grid {
  // Creating canvas rectangle
  const canvasRect = new Rectangle(
    new Point(canvas.x, canvas.y),
    new Size(canvas.width, canvas.height)
  );

  // Creating unit grid
  const unitGrid = new Grid(
    grid.rows,
    grid.columns,
    new Size(grid.cell_ratio, 1),
    grid.spacing
  );

  // Creating grid rectangle
  let gridRect: Rectangle;
  if (mode == "fill") {
    gridRect = canvasRect.fillRectangleCenter(unitGrid.ratio);
  } else {
    gridRect = canvasRect.fitRectangleCenter(unitGrid.ratio);
  }

  // Setting origin
  const origin = canvasRect.origin.add(gridRect.origin);

  // Scaling grid
  return unitGrid.fillHeight(gridRect.height).setOrigin(origin);
}
