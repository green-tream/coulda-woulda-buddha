import { Sprite, Texture } from "pixi.js";
import Entity from "./Entity";


export default class BackgroundObject extends Entity {



    constructor(width: number, height: number, sprite: Sprite) {
        super(width, height, sprite);
    }



}