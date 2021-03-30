import Grid from "./Grid";
export default function getCanvasGrid(mode: "fill" | "fit", canvas: {
    x: number;
    y: number;
    width: number;
    height: number;
}, grid: {
    rows: number;
    columns: number;
    cell_ratio: number;
    spacing: {
        column: number;
        row: number;
    };
}): Grid;
