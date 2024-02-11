import Block from "./Block";


export default class Level {

    public map: Block[][];

    public squareSize: number;
    public width: number;
    public height: number;

    constructor(width: number, height: number, squareSize: number) {

        this.squareSize = squareSize;
        this.width = width;
        this.height = height;

        this.map = [];
        let row: Block[];
        for (let j=0; j<height; j++) {
            row = [];
            for (let i=0; i<width; i++) {
                row.push(null);
            }
            this.map.push(row);
        }

    }

    applyRect(
        x: number,
        y: number,
        width: number,
        height: number,
    ): void {
    
        for (let i=x; i<x+width; i++) {
            for (let j=y; j<y+height; j++) {
                this.add(i, j);
            }
        }
    
    }

    add(x: number, y: number) {

        this.map[this.height - y - 1][x] = new Block(x, y, this.squareSize);

    }

    delete(x: number, y: number) {

        this.map[this.height - y - 1][x] = null;

    }


    is_in_uwu_block(world_x: number, world_y: number): boolean {

        return false;

        if (
            0 >= world_x ||
            this.squareSize * this.width <= world_x ||
            0 >= world_y ||
            this.squareSize * this.height <= world_y
        ) {
            return true;
        }

        return this.map[Math.floor(world_x / this.squareSize)][Math.floor(world_y / this.squareSize)] == null;

    }

    what_around_the_box(world_x: number, world_y: number): { xMin: number; xMax: number; yMin: number; yMax: number } {

        let x: number = Math.floor(world_x / this.squareSize);
        let y: number = Math.floor(world_y / this.squareSize);
        return {
            xMin: x * this.squareSize,
            xMax: (x+1) * this.squareSize,
            yMin: y * this.squareSize,
            yMax: (y+1) * this.squareSize
        };


    }


}