import { Sprite } from "pixi.js";


export default class Block {

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