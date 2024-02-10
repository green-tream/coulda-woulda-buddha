import { AnimatedSprite, ObservablePoint, Sprite, Texture } from "pixi.js";
import { Scene } from "../engine/Scene";

export default class Player {
	private xPos: number;
	private yPos: number;
	private xVel: number;
	private yVel: number;
	private xAcc: number;
	private yAcc: number;

	private width: number;
	private height: number;

	private onGround: boolean;

	private leftKeyPressed: boolean;
	private rightKeyPressed: boolean;
	private jumpKeyPressed: boolean;
	private interactKeyPressed: boolean;

	private animationSpeed;

	private idleSprite: AnimatedSprite;
	private runningSprite: AnimatedSprite;
	private spriteList: AnimatedSprite[];

    private maxspeed: number;
    private velocity: number

	constructor(width: number, height: number, assets: any, scene: Scene) {
		this.animationSpeed = 0.1;

		this.idleSprite = new AnimatedSprite([assets["idle_sprite"]]);

		this.runningSprite = this.loadAnimation(assets, "running_animation");
		this.runningSprite.visible = false;

		this.spriteList = [this.idleSprite, this.runningSprite];

		this.width = width;
		this.height = height;

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
	}

	update(delta: number): void {
		this.updateInputs();
		// this.updatePhysics(delta);
		this.updateVisuals();
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
			this.yVel = -10;
			this.onGround = false;
		}

		// Gravity
		this.yAcc = -1;
	}

	private updateVisuals(): void {
		this.changeSprites();
		this.moveSprites();
	}

	private moveSprites(): void {
		for (const sprite of this.spriteList) {
			sprite.position.x = this.xPos;
			sprite.position.y = this.yPos;

			if (this.xVel > 0) {
				sprite.scale.x = 1;
			} else if (this.xVel < 0) {
				sprite.scale.x = -1;
			}
		}
	}

	private changeSprites(): void {
		// if (this.xVel > 0) {
		//     this.runningSprite.scale.x = 1;
		//     this.runningSprite.width = this.idleSprite.width;
		// } else if (this.xVel < 0) {
		//     this.runningSprite.scale.x = -1;
		//     this.runningSprite.width = this.idleSprite.width;
		// }

		if (Math.abs(this.xVel) > 0.1) {
			this.runningSprite.visible = true;
			this.idleSprite.visible = false;
			this.runningSprite.play();
		} else {
			this.runningSprite.visible = false;
			this.idleSprite.visible = true;
			this.runningSprite.stop();
		}
	}

	// private updatePhysics(delta: number): void {
	// 	this.yAcc = -5;
	// 	// Update position
	// 	this.xVel += this.xAcc;
	// 	this.yVel += this.yAcc;
	// 	this.yVel = Math.min(this.yVel, 10);

	// 	this.xPos += this.xVel;
	// 	if (this.xVel > 0) {
	// 		if (
	// 			this.pointInCollision(this.topRight) ||
	// 			this.pointInCollision(this.bottomRight)
	// 		) {
	// 			// TODO: move slightly to left
	// 			this.xPos = Math.min(
	// 				this.pointTileBounds(this.topRight).xMin,
	// 				this.pointTileBounds(this.bottomRight).xMin
	// 			);
	// 			this.xVel = 0;
	// 		}
	// 	} else if (this.xVel < 0) {
	// 		if (
	// 			this.pointInCollision(this.topLeft) ||
	// 			this.pointInCollision(this.bottomLeft)
	// 		) {
	// 			// TODO: move slightly to right
	// 			this.xPos = Math.max(
	// 				this.pointTileBounds(this.topLeft).xMax,
	// 				this.pointTileBounds(this.bottomLeft).xMax
	// 			);
	// 			this.xVel = 0;
	// 		}
	// 	}
	// 	// TODO: x vel pos
	// }

	// pointInCollision(point: { x: number; y: number }): boolean {}

	// pointTileBounds(point: { x: number; y: number }): {
	// 	xMin: number;
	// 	xMax: number;
	// 	yMin: number;
	// 	yMax: number;
	// } {
	// }

	addToScene(scene: Scene): void {
		for (const sprite of this.spriteList) {
			scene.addDisplayObject(sprite);
		}
	}

	get bottomLeft(): { x: number; y: number } {
		return { x: this.xPos - this.width / 2, y: this.yPos + this.height / 2 };
	}

	get bottomRight(): { x: number; y: number } {
		return { x: this.xPos + this.width / 2, y: this.yPos + this.height / 2 };
	}

	get topLeft(): { x: number; y: number } {
		return { x: this.xPos - this.width / 2, y: this.yPos - this.height / 2 };
	}

	get topRight(): { x: number; y: number } {
		return { x: this.xPos + this.width / 2, y: this.yPos - this.height / 2 };
	}

	get position(): { x: number; y: number } {
		return { x: this.xPos, y: this.yPos };
	}

	set position(pos: { x: number; y: number }) {
		this.xPos = pos.x;
		this.yPos = pos.y;
	}

	set rightEdgePosition(x: number) {
		this.xPos = x - this.width / 2;
	}

	set leftEdgePosition(x: number) {
		this.xPos = x + this.width / 2;
	}

	set bottomEdgePosition(y: number) {
		this.yPos = y - this.height / 2;
	}

	set topEdgePosition(y: number) {
		this.yPos = y + this.height / 2;
	}
}
