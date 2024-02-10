import { Sprite, Texture } from "pixi.js";
import Entity from "./Entity";


export default class ForegroundObject extends Entity {


    constructor(width: number, height: number, texture: Texture) {
        super(width, height, texture);
    }
    

}