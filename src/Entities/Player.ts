import { AnimatedSprite, Texture } from "pixi.js";

import Entity from "./Entity";

export default class Player extends Entity {

    private speed: number;
    private isRunning: boolean;
    private animation: AnimatedSprite;
    private animationSpeed;

    constructor(width: number, height: number, assetName: string) {
        super(width, height, assetName);

        this.speed = 5;
        this.animationSpeed = 0.5;
        this.isRunning = false;

        this.loadAnimation();
    }

    loadAnimation(): void { // Cant load/find file           Also, I just randomly copied and pasted some data into frames.json - check data
        const frames = [];

        for (let i = 1; i < 4; i++) {
            frames.push(Texture.from(`${i}.png`));
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

        switch (event.key) {
            case "ArrowRight":
                super.moveSprite(this.speed, 0);
                break;
            case "ArrowLeft":
                super.moveSprite(-1 * this.speed, 0);
                break;
            
        }

    }

}