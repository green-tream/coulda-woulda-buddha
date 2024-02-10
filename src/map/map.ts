import { Sprite } from "pixi.js";



export default class Level {

    private map: Block[][];

    private squareSize: number;
    private width: number;
    private height: number;

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

    add(x: number, y: number, label: string, asset: Sprite) {

        this.map[this.height - y][this.width - x] = new Block(label, x, y, this.squareSize, asset);

    }

    delete(x: number, y: number) {
        // This is probably wrong, wait for someone to start complaining
        this.map[this.height - y][this.width - x] = null;

    }


    is_in_uwu_block(world_x: number, world_y: number): boolean {

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

class Block {

    private i: number;
    private j: number;
    private _size: number;
    private _sprite: Sprite;
    private _label: string;
    
    private valid_labels: string[] = ["air"];

    constructor(label: string, i: number, j: number, size: number, sprite: Sprite) {
        this.i = i;
        this.j = j;
        this._size = size;
        this._sprite = sprite;
        if (!this.valid_labels.includes(label)) {throw Error("That isn't a valid label, you doofus - see me after class")}
        this._label = label;
    }

    get x(): number {
        return this.i;
    }

    get y(): number {
        return this.j;
    }

    get size(): number {
        return this._size;
    }

    get sprite(): Sprite {
        return this._sprite;
    }
    get label(): string {
        return this._label;
    }

}