import { AnimatedSprite, ObservablePoint, Sprite, Texture } from "pixi.js";
import { Scene } from "../engine/Scene";
import Level from "../map/Level";
import { fadeIn, fadeInOut, fadeOut, sleep } from "../utils";
import { Actions } from "pixi-actions";

export default class Player {
	private scene: Scene;

	private xPos: number = 0;
	private yPos: number = 0;
	private xVel: number = 0;
	private yVel: number = 0;
	private xAcc: number = 0;
	private yAcc: number = 0;

	private width: number;
	private height: number;

	private respawn: { x: number; y: number };

	private onGround: boolean;

	private leftKeyPressed: boolean;
	private rightKeyPressed: boolean;
	private jumpKeyPressed: boolean;
	private interactKeyPressed: boolean;

	private animationSpeed: number;

	private idleSprite: AnimatedSprite;
	private runningSprite: AnimatedSprite;
	private spriteList: Sprite[];
	private zenSprite: Sprite;

	private maxspeed: number;
	private velocity: number;

	public level: Level; //Change back to private when using
	private reflecting: boolean;

	private levelName: string;

	constructor(spriteScale: number, assets: any, level: Level, respawn: { x: number; y: number }, scene: Scene, levelName: string) {
		this.level = level;
		this.levelName = levelName;
		this.animationSpeed = 0.1;
		this.respawn = respawn;
		this.position = respawn;
		this.scene = scene;

		this.idleSprite = new AnimatedSprite([assets[`${levelName}_idle_sprite`]]);

		this.zenSprite = new Sprite(assets[`${levelName}_zen_sprite`]);
		this.zenSprite.alpha = 0;

		this.runningSprite = this.loadAnimation(assets, `${levelName}_running_animation`);
		this.runningSprite.visible = false;

		this.spriteList = [
			this.idleSprite,
			this.runningSprite,
			this.zenSprite
		];

		const width = assets[`${levelName}_idle_sprite`].baseTexture.width * spriteScale;
		const height = assets[`${levelName}_idle_sprite`].baseTexture.height * spriteScale;

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
			case "e":
				this.startReflection();
				break;
		}
	}

	update(delta: number): void {
		this.updateInputs();
		this.updatePhysics(delta);
		this.updateVisuals();

		// console.log('Player position:', this.xPos, this.yPos);
		// console.log('Player velocity:', this.xVel, this.yVel);
		// console.log('Player acceleration:', this.xAcc, this.yAcc);
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

		// None
		if (!this.rightKeyPressed && !this.leftKeyPressed) {
			this.xAcc = 0;
		}

		// Jump
		if (this.jumpKeyPressed && this.onGround) {
			this.yVel = -15;
			this.onGround = false;
		}

		// Gravity
		this.yAcc = 1;
	}

	public setVisible(visible: boolean) {
		for (const sprite of this.spriteList) {
			sprite.visible = visible;
		}
	}

	private startReflection() {
		if (this.reflecting) return;
		if (!this.onGround || Math.abs(this.xVel) > 0.1) return;
		this.reflecting = true;

		Actions.sequence(
			Actions.parallel(Actions.fadeIn(this.zenSprite, 1), Actions.fadeOut(this.idleSprite, 1)),
			Actions.delay(1),
			// fadeOut(this.scene),
			Actions.runFunc(() => (this.position = this.respawn)),
			// fadeIn(this.scene),
			Actions.delay(1),
			Actions.parallel(Actions.fadeIn(this.idleSprite, 1), Actions.fadeOut(this.zenSprite, 1))
		).play();

		this.reflecting = false;
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
				sprite.width = this.width;
			} else if (this.xVel < 0) {
				sprite.scale.x = -1;
				sprite.width = this.width;
			}
		}
	}

	private changeSprites(): void {
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

	private updatePhysics(delta: number): void {
		if (!this.leftKeyPressed && !this.rightKeyPressed) {
			this.xVel *= 0.4;
		} else {
			this.xVel *= 0.9;
		}

		// Update position
		this.xVel += this.xAcc;
		this.yVel += this.yAcc;
		this.yVel = Math.min(this.yVel, 40);

		this.xPos += this.xVel;
		if (this.xVel > 0) {
			// Right wall
			if (this.pointInCollision(this.topRight) || this.pointInCollision(this.bottomRight)) {
				this.rightEdgePosition =
					Math.min(
						this.pointTileBounds(this.topRight).xMin,
						this.pointTileBounds(this.bottomRight).xMin
					) - 0.1;
				this.xVel = 0;
				console.log("right wall");
			}
		} else if (this.xVel < 0) {
			// Left wall
			if (this.pointInCollision(this.topLeft) || this.pointInCollision(this.bottomLeft)) {
				this.leftEdgePosition =
					Math.max(
						this.pointTileBounds(this.topLeft).xMax,
						this.pointTileBounds(this.bottomLeft).xMax
					) + 0.1;
				this.xVel = 0;
				console.log("left wall");
			}
		}

		this.yPos += this.yVel;
		this.onGround = false;
		if (this.yVel > 0) {
			// Ground
			if (this.pointInCollision(this.bottomLeft) || this.pointInCollision(this.bottomRight)) {
				this.bottomEdgePosition =
					Math.min(
						this.pointTileBounds(this.bottomLeft).yMin,
						this.pointTileBounds(this.bottomRight).yMin
					) - 0.1;
				this.yVel = 0;
				this.onGround = true;
				console.log("ground");
			}
		} else if (this.yVel < 0) {
			// Ceiling
			if (this.pointInCollision(this.topLeft) || this.pointInCollision(this.topRight)) {
				this.topEdgePosition =
					Math.max(
						this.pointTileBounds(this.topLeft).yMax,
						this.pointTileBounds(this.topRight).yMax
					) + 0.1;
				this.yVel = 1;
				console.log("ceiling");
			}
		}
	}

	pointInCollision(point: { x: number; y: number }): boolean {
		return this.level.is_in_uwu_block(point.x, point.y);
	}

	pointTileBounds(point: { x: number; y: number }): {
		xMin: number;
		xMax: number;
		yMin: number;
		yMax: number;
	} {
		return this.level.what_around_the_box(point.x, point.y);
	}

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

	get mIdleSprite() {
		return this.idleSprite;
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
