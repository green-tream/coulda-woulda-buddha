import { AnimatedSprite, Texture } from "pixi.js";

import Entity from "./Entity";

export default class Player {

    private speed: number;
    private isRunning: boolean;
    private animation: AnimatedSprite;
    private animationSpeed;

    constructor(width: number, height: number, assets: any) {
        this.speed = 5;
        this.animationSpeed = 0.5;
        this.isRunning = false;

        this.loadAnimation(assets, "running_animation");
    }

    loadAnimation(assets: any, animationName: string): void {
        const frames = [];

        for (let i = 1; i < 4; i++) {
            frames.push(new Texture(assets[`${animationName}_${i}.png`]));
        }

        this.animation = new AnimatedSprite(frames);
        this.animation.animationSpeed = this.animationSpeed;
        console.log("Animation loaded");
    }

    handleInput(event: KeyboardEvent): void {

        if (!this.isRunning) { // Never stops animation - add event listner on keyup
            this.isRunning = true;
            this.animation.play();
        }

        // switch (event.key) {
        //     case "ArrowRight":
        //         super.moveSprite(this.speed, 0);
        //         break;
        //     case "ArrowLeft":
        //         super.moveSprite(-1 * this.speed, 0);
        //         break;
            
        // }

    }

}