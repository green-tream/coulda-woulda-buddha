import { AnimatedSprite, Sprite, Texture } from "pixi.js";

export default class Player {
	private speed: number;
	private isRunning: boolean;
	private animationSpeed;

	private idleSprite: AnimatedSprite;
	private runningSprite: AnimatedSprite;
	private spriteList: AnimatedSprite[];

	constructor(width: number, height: number, assets: any) {
		this.speed = 5;
		this.animationSpeed = 0.5;
		this.isRunning = false;

		this.spriteList = [this.idleSprite, this.runningSprite];

		this.idleSprite = new AnimatedSprite([new Texture(assets["idle_sprite"])]);

		this.loadAnimation(assets, "running_animation", this.runningSprite);
	}

	loadAnimation(
		assets: any,
		animationName: string,
		store: AnimatedSprite
	): void {
		const frames: Texture[] = [];

		for (let i = 1; i < 4; i++) {
			frames.push(assets[`${animationName}_${i}`]);
		}

		store = new AnimatedSprite(frames);
		store.animationSpeed = this.animationSpeed;
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

	handleKeyup(event: KeyboardEvent): void {
		this.runningSprite.visible = false;
		this.idleSprite.visible = true;
	}

	getSprites(): AnimatedSprite[] {
		return this.spriteList;
	}

	position(posx: number, posy: number): void {
		for (const sprite of this.spriteList) {
			sprite.x = posx;
			sprite.y = posy;
		}
	}

	moveSprite(x: number, y: number): void {
		for (const sprite of this.spriteList) {
			sprite.x += x;
			sprite.y += y;
		}
	}
}
