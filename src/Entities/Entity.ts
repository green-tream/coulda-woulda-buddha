import { Sprite } from "pixi.js";


export default abstract class Entity {

    // private width: number;
    // private height: number;
    private sprite: Sprite;


    constructor(width: number, height: number, assetName: string) {

        // this.width = width;
        // this.height = height;
        this.sprite = Sprite.from(assetName);
        this.sprite.anchor.set(0.5);

        this.sprite.width = width;
        this.sprite.height = height;

    }

    position(posx: number, posy: number): void {

        this.sprite.x = posx;
        this.sprite.y = posy;

    }

    getSprite(): Sprite {
        return this.sprite;
    }

    moveSprite(x: number, y: number): void {

        this.sprite.x += x;
        this.sprite.y += y;

    }

}