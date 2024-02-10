import { AnimatedSprite, ObservablePoint, Sprite, Texture } from "pixi.js";

export default class Player {
    private xPos: number;
    private yPos: number;
    private xVel: number;
    private yVel: number;
    private xAcc: number;
    private yAcc: number;


    private onGround: boolean;


    private leftKeyPressed: boolean;
    private rightKeyPressed: boolean;
    private jumpKeyPressed: boolean;
    private interactKeyPressed: boolean;

    
	private speed: number;
	private isRunning: boolean;
	private animationSpeed;

    private idleSprite: AnimatedSprite;
    private runningSprite: AnimatedSprite;
    private spriteList: AnimatedSprite[];

    constructor(width: number, height: number, assets: any) {
        this.speed = 5;
        this.animationSpeed = 0.1;

        this.idleSprite = new AnimatedSprite([assets["idle_sprite"]])

        this.runningSprite = this.loadAnimation(assets, "running_animation");
        this.runningSprite.visible = false;

		this.spriteList = [this.idleSprite, this.runningSprite];


        for (const sprite of this.spriteList) {
            sprite.width = width;
            sprite.height = height;
            sprite.anchor.set(0.5);
        }
    }

    loadAnimation(assets: any, animationName: string): AnimatedSprite {
        const frames: Texture[] = [];

		for (let i = 1; i < 4; i++) {
			frames.push(assets[`${animationName}_${i}`]);
		}

        const animation: AnimatedSprite = new AnimatedSprite(frames);
        animation.animationSpeed = this.animationSpeed;
        return animation;
    }

	handleKeydown(event: KeyboardEvent): void {
        switch (event.key) {
            case "a":
                this.leftKeyPressed = true;
                break;
            case "d":
                this.rightKeyPressed = true;
                break;
            case " ":
                this.jumpKeyPressed = true;
                break;
        }
        
        return;

		switch (event.key) {
			case "ArrowRight":
				this.moveSprite(this.speed, 0);
				this.runningSprite.visible = true;
				this.idleSprite.visible = false;
				break;
			case "ArrowLeft":
				this.moveSprite(-1 * this.speed, 0);
				this.runningSprite.visible = true;
				this.idleSprite.visible = false;
				break;
		}

        switch (event.key) {
            case "ArrowRight":
                this.moveSprite(this.speed, 0);
                this.runningSprite.visible = true;
                this.idleSprite.visible = false; 
                this.runningSprite.play();
                this.runningSprite.scale.x = 1;
                this.runningSprite.width = this.idleSprite.width;
                break;
            case "ArrowLeft":
                this.moveSprite(-1 * this.speed, 0);
                this.runningSprite.visible = true;
                this.idleSprite.visible = false; 
                this.runningSprite.play();
                this.runningSprite.scale.x = -1;
                this.runningSprite.width = this.idleSprite.width;
                break;
        }
    }

    handleKeyup(event: KeyboardEvent): void {
        switch (event.key) {
            case "a":
                this.leftKeyPressed = false;
                break;
            case "d":
                this.rightKeyPressed = false;
                break;
            case " ":
                this.jumpKeyPressed = false;
                break;
        }
        
        return;

        this.runningSprite.visible = false;
        this.idleSprite.visible = true; 
        this.runningSprite.stop();
    }

    update(delta: number): void {
        
        this.updateInputs();
        
        this.updateVisuals();


        this.xVel += this.xAcc;
        this.yVel += this.yAcc;
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }

    updateInputs(): void {
        // Left
        if (this.leftKeyPressed && !this.rightKeyPressed) {
            // Initial speed boost when starting to move
            if (Math.abs(this.xVel) < 5) {
                this.xAcc = -2;
            } else {
                this.xAcc = -1;
            }

        } 
        
        // Right
        if (this.rightKeyPressed && !this.leftKeyPressed) {
            // Initial speed boost when starting to move
            if (Math.abs(this.xVel) < 5) {
                this.xAcc = 2;
            } else {
                this.xAcc = 1;
            }
        }
        this.xVel *= 0.9;

        // Jump
        if (this.jumpKeyPressed && this.onGround) {
            this.yVel = 10;
            this.onGround = false;
        }
        
        // Gravity
        this.yAcc = -1;
    }

    private updateVisuals(): void {
        for (const sprite of this.spriteList) {
            sprite.position.x = this.xPos;
            sprite.position.y = this.yPos;
        }
    }

    private updateSprites(): void {
        if (this.xVel > 0) {
            this.runningSprite.scale.x = 1;
            this.runningSprite.width = this.idleSprite.width;
        } else if (this.xVel < 0) {
            this.runningSprite.scale.x = -1;
            this.runningSprite.width = this.idleSprite.width;
        }
    }

    getPosition() : { x: number; y: number; } {
        return { x: this.xPos, y: this.yPos };
    }

}
