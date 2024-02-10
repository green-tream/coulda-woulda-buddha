import { AnimatedSprite, ObservablePoint, Sprite, Texture } from "pixi.js";

export default class Player {
	private speed: number;
	private isRunning: boolean;
	private animationSpeed;

    private speed: number;
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
        this.runningSprite.visible = false;
        this.idleSprite.visible = true; 
        this.runningSprite.stop();
    }

	position(posx: number, posy: number): void {
		for (const sprite of this.spriteList) {
			sprite.x = posx;
			sprite.y = posy;
		}
	}

    position(posx: number, posy: number): void {

        for (const sprite of this.spriteList) {
            sprite.position.x = posx;
            sprite.position.y = posy;
        }

    }

    moveSprite(x: number, y: number): void {

        for (const sprite of this.spriteList) {
            sprite.position.x += x;
            sprite.position.y += y;
        }

    }

}
