import { Sprite } from "pixi.js";
import Block from "./Block";


export default class BoxBlock extends Block {

    private sprite: Sprite

    constructor(i: number, j: number, size: number, sprite: Sprite) {
        super(i, j, size);
        this.sprite = sprite;
    }

    getSprite(): Sprite {
        return this.sprite;
    }

}