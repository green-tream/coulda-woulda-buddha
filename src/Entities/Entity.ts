import { Sprite } from "pixi.js";


export default abstract class Entity {

    private width: number;
    private height: number;
    private sprite: Sprite;


    constructor(width: number, height: number, assetName: string) {

        this.width = width;
        this.height = height;
        this.sprite = Sprite.from('/sprites/buddha/zen_1.png'); // Do we need?

    }

    blit(posx: number, posy: number): void {

        this.sprite.x = posx;
        this.sprite.y = posy;

    }

}