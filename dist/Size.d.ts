export default class Size {
    width: number;
    height: number;
    constructor(width: number, height: number);
    /**
     * Getters
     */
    get ratio(): number;
    /**
     * Methods
     */
    sscale(value: number): Size;
    fitSize(ratio: number): Size;
    fillSize(ratio: number): Size;
}
