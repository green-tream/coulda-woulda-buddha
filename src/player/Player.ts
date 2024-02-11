import { AnimatedSprite, ObservablePoint, Point, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Scene } from "../engine/Scene";
import Level from "../map/Level";
import {
	fadeIn,
	fadeInOut,
	fadeInOutFunc,
	fadeOut,
	fadeOutToScene,
	mathematicalBridge,
	sleep,
} from "../utils";
import { Actions } from "pixi-actions";
import SavedState from "./SavedState";
import { app } from "..";
import LevelScene from "../scenes/LevelScene";
import Box from "../mechanics/Box";
import InteractableObject from "../entities/InteractableObject";

export default class Player {
	private scene: LevelScene;

	private xPos: number = 0;
	private yPos: number = 0;
	private xVel: number = 0;
	private yVel: number = 0;
	private xAcc: number = 0;
	private yAcc: number = 0;

	public gravity: number = 1;

	private width: number;
	private height: number;

	private respawn: { x: number; y: number };

	private onGround: boolean;

	private leftKeyPressed: boolean;
	private rightKeyPressed: boolean;
	private jumpKeyPressed: boolean;

	public carriedBox: Sprite;

	private animationSpeed: number;

	private idleSprite: AnimatedSprite;
	private runningSprite: AnimatedSprite;
	private spriteList: Sprite[];
	private zenSprite: Sprite;
	private assets: any;

	private boxes: Box[] = [];
	private holdingBox: Box;

	private collisonPoints: Point[] = [];

	private state: string = "idle";

	public level: Level; //Change back to private when using
	private reflecting: boolean;

	private levelName: string;
	public canMove: boolean;
	public yOffset: number;
	private tutorialdone = false;

	private previousStates: SavedState[][] = [[]]; //Add in constructir
	private ghostSprites: Sprite[] = [];
	private ghostIndex: number = -1;
	private interactedWith: InteractableObject | null = null;

	constructor(
		spriteScale: number,
		assets: any,
		level: Level,
		respawn: { x: number; y: number },
		scene: LevelScene,
		levelName: string
	) {
		this.level = level;
		this.levelName = levelName;
		this.animationSpeed = 0.1;
		this.respawn = respawn;
		this.position = respawn;
		this.scene = scene;
		this.assets = assets;
		this.canMove = true;
		this.yOffset = 0;

		this.idleSprite = new AnimatedSprite([assets[`${levelName}_idle_sprite`]]);

		this.zenSprite = new Sprite(assets[`${levelName}_zen_sprite`]);
		this.zenSprite.alpha = 0;

		this.runningSprite = this.loadAnimation(assets, `${levelName}_running_animation`);
		this.runningSprite.visible = false;

		this.spriteList = [this.idleSprite, this.runningSprite, this.zenSprite];

		const width = assets[`${levelName}_idle_sprite`].baseTexture.width * spriteScale;
		const height = assets[`${levelName}_idle_sprite`].baseTexture.height * spriteScale;

		this.width = width;
		this.height = height;

		for (const sprite of this.spriteList) {
			sprite.width = width;
			sprite.height = height;
			sprite.anchor.set(0.5);
		}

		if (this.levelName == "queens") {
			this.boxes.push(new Box(assets, this.levelName, this.level, new Point(15, 2)));
			this.boxes.push(new Box(assets, this.levelName, this.level, new Point(23, 2)));
		} else if (this.levelName == "kings") {
		} else if (this.levelName == "lab") {
			this.boxes.push(new Box(assets, this.levelName, this.level, new Point(22, 1)));
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
			case "r":
				this.restartScene();
				break;
			case "q":
				this.interactedWith = this.scene.playerInteract();

				for (const box of this.boxes) {
					box.interact(this);
				}
				break;
		}
	}

	update(delta: number): void {
		this.updateInputs();
		this.updatePhysics(delta);
		this.updateVisuals();

		if (
			this.holdingBox !== undefined &&
			this.tutorialdone == false &&
			this.position.x > 600 &&
			this.levelName == "queens"
		) {
			this.tutorialdone = true;
			this.popUpText(["press e to reflect\non your actions..."]).play();
		}

		const ghostsWithBoxes = [];

		for (let i = 0; i < this.previousStates.length - 1; i++) {
			if (this.ghostIndex == -1) {
				continue;
			}
			if (
				this.previousStates[i][Math.min(this.ghostIndex, this.previousStates[i].length - 1)]
					.state == "holding-on-to-a-fucking-box"
			) {
				ghostsWithBoxes.push(this.ghostSprites[i]);
			}

			if (this.previousStates[i].length < this.ghostIndex + 1) {
				continue;
			}

			if (this.previousStates[i][this.ghostIndex].istate.type == "interact") {
				this.previousStates[i][this.ghostIndex].istate.data.interact(this, this.assets);
			}

			if (this.ghostSprites[i].alpha == 0) {
				Actions.fadeTo(this.ghostSprites[i], 0.8, 0.5).play();
			}

			this.ghostSprites[i].alpha = 0.5;
			this.ghostSprites[i].position.x = this.previousStates[i][this.ghostIndex].position.x;
			this.ghostSprites[i].position.y =
				this.previousStates[i][this.ghostIndex].position.y +
				(this.levelName == "queens"
					? mathematicalBridge(this.previousStates[i][this.ghostIndex].position.x)
					: 0);
		}
		if (this.state == "holding-on-to-a-fucking-box") {
			ghostsWithBoxes.push(this.idleSprite);
		}
		const temp_boxes = this.boxes.toSorted((a, b) => {
			if (a.interactable && !b.interactable) {
				return -1; // a should come before b
			} else if (!a.interactable && b.interactable) {
				return 1; // b should come before a
			} else {
				return 0; // No change in order
			}
		});
		while (this.collisonPoints.length > 0) {
			const collisionPoint = this.collisonPoints.pop();
			this.level.delete(collisionPoint.x, this.level.height - collisionPoint.y);
			// console.log(this.level.height - collisionPoint.y);
		}

		for (const box of temp_boxes) {
			if (this.ghostIndex > box.memoryFrames && ghostsWithBoxes.length > 0) {
				const coords = ghostsWithBoxes.shift().position;
				box.box_sprite.position.x = coords.x;
				box.box_sprite.position.y = coords.y - 120; //OFFSET
				box.box_sprite.visible = true;

				// COLLISION
				const tileCoords = this.level.WorldToLocal(coords);
				tileCoords.y -= 3;
				if (
					tileCoords.x > 1 &&
					tileCoords.x < this.level.width - 1 &&
					tileCoords.y > 1 &&
					tileCoords.y < this.level.height - 1 &&
					this.level.map[this.level.height - tileCoords.y][tileCoords.x] == null &&
					this.level.map[this.level.height - tileCoords.y][tileCoords.x - 1] == null &&
					this.level.map[this.level.height - tileCoords.y][tileCoords.x + 1] == null
				) {
					// console.log(this.level.height - tileCoords.y)
					this.level.add(tileCoords.x, this.level.height - tileCoords.y);
					this.collisonPoints.push(new Point(tileCoords.x, tileCoords.y));
					tileCoords.x += 1;
					this.level.add(tileCoords.x, this.level.height - tileCoords.y);
					this.collisonPoints.push(new Point(tileCoords.x, tileCoords.y));
					tileCoords.x -= 1;
					this.level.add(tileCoords.x, this.level.height - tileCoords.y);
					this.collisonPoints.push(new Point(tileCoords.x, tileCoords.y));
				}
			} else {
				box.spawn(box.original);
			}
		}

		if (this.canMove) {
			this.saveState();
			this.ghostIndex++;
		}
	}

	saveState() {
		let state = {
			type: "running",
			data: null,
		};

		if (this.interactedWith) {
			state = {
				type: "interact",
				data: this.interactedWith,
			};

			this.interactedWith = null;
		}

		this.previousStates[this.previousStates.length - 1].push({
			position: new Point(this.xPos, this.yPos),
			state: this.state,
			istate: state,
		});
	}

	updateInputs(): void {
		if (!this.canMove) {
			this.leftKeyPressed = false;
			this.rightKeyPressed = false;
			this.jumpKeyPressed = false;
		}

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
			this.yVel = -22.5;
			this.onGround = false;
		}

		// Gravity
		this.yAcc = this.gravity;
	}

	private restartScene() {
		fadeOutToScene(this.scene, (this.scene as LevelScene).LEVEL, this.scene.viewport).play();
	}

	private startReflection() {
		if (this.reflecting) return;
		if (!this.onGround || Math.abs(this.xVel) > 0.1) return;
		this.reflecting = true;
		this.canMove = false;

		for (let i = 0; i < this.previousStates.length - 1; i++) {
			this.ghostSprites[i].alpha = 0;
		}

		Actions.sequence(
			Actions.parallel(Actions.fadeIn(this.zenSprite, 1), Actions.fadeOut(this.idleSprite, 1)),
			Actions.delay(0.75),
			fadeInOutFunc(this.scene, this.scene.viewport, () => (this.position = this.respawn), 0.5),
			Actions.delay(0.75),
			Actions.parallel(Actions.fadeIn(this.idleSprite, 1), Actions.fadeOut(this.zenSprite, 1)),
			Actions.runFunc(() => (this.canMove = true)),
			Actions.runFunc(() => (this.reflecting = false))
		).play();

		const ghostSprite = new Sprite(this.assets[`${this.levelName}_ghost_sprite`]);
		ghostSprite.width = this.width;
		ghostSprite.height = this.height;
		ghostSprite.anchor.set(0.5);
		ghostSprite.alpha = 0;
		this.ghostSprites.push(ghostSprite);
		this.scene.addDisplayObject(ghostSprite);

		this.previousStates.push([]);
		this.ghostIndex = -1;
		this.state = "idle";

		for (const box of this.boxes) {
			box.box_sprite.visible = false;
		}
	}

	private updateVisuals(): void {
		this.changeSprites();
		this.moveSprites();
	}

	private moveSprites(): void {
		for (const sprite of this.spriteList) {
			sprite.position.x = this.xPos;
			sprite.position.y = this.yPos + this.yOffset;

			if (this.xVel > 0) {
				sprite.scale.x = 1;
				sprite.width = this.width;
			} else if (this.xVel < 0) {
				sprite.scale.x = -1;
				sprite.width = this.width;
			}
		}
		if (this.state == "holding-on-to-a-fucking-box") {
			this.holdingBox.box_sprite.position.x = this.xPos;
			this.holdingBox.box_sprite.position.y = this.yPos + this.yOffset - 130;
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

	public pickupBox(box: Box): boolean {
		if (this.state != "holding-on-to-a-fucking-box") {
			box.box_sprite = new Sprite(this.scene.assets[`${this.levelName}_box`]);
			box.box_sprite.anchor.set(0.5);
			box.box_sprite.width = 60;
			box.box_sprite.height = 60;
			this.scene.addDisplayObject(box.box_sprite);
			this.state = "holding-on-to-a-fucking-box";
			this.holdingBox = box;
			box.memoryFrames = this.ghostIndex;
			box.destroy(box.position);
			return true;
		}
		return false;
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
			if (
				this.pointInCollision(this.topRight) ||
				this.pointInCollision(this.bottomRight) ||
				this.pointInCollision(this.rightCenter)
			) {
				this.rightEdgePosition =
					Math.min(
						this.pointTileBounds(this.topRight).xMin,
						this.pointTileBounds(this.bottomRight).xMin,
						this.pointTileBounds(this.rightCenter).xMin
					) - 0.1;
				this.xVel = 0;
			}
		} else if (this.xVel < 0) {
			// Left wall
			if (
				this.pointInCollision(this.topLeft) ||
				this.pointInCollision(this.bottomLeft) ||
				this.pointInCollision(this.leftCenter)
			) {
				this.leftEdgePosition =
					Math.max(
						this.pointTileBounds(this.topLeft).xMax,
						this.pointTileBounds(this.bottomLeft).xMax,
						this.pointTileBounds(this.leftCenter).xMax
					) + 0.1;
				this.xVel = 0;
			}
		}

		this.yPos += this.yVel;
		this.onGround = false;
		if (this.yVel > 0) {
			// Ground
			if (
				this.pointInCollision(this.bottomLeft) ||
				this.pointInCollision(this.bottomRight) ||
				this.pointInCollision(this.bottomCenter)
			) {
				this.bottomEdgePosition =
					Math.min(
						this.pointTileBounds(this.bottomLeft).yMin,
						this.pointTileBounds(this.bottomRight).yMin,
						this.pointTileBounds(this.bottomCenter).yMin
					) - 0.1;
				this.yVel = 0;
				this.onGround = true;
			}
		} else if (this.yVel < 0) {
			// Ceiling
			if (
				this.pointInCollision(this.topLeft) ||
				this.pointInCollision(this.topRight) ||
				this.pointInCollision(this.topCenter)
			) {
				this.topEdgePosition =
					Math.max(
						this.pointTileBounds(this.topLeft).yMax,
						this.pointTileBounds(this.topRight).yMax,
						this.pointTileBounds(this.topCenter).yMax
					) + 0.1;
				this.yVel = 1;
			}
		}
	}

	popUpText(txts: string[]) {
		const style = new TextStyle({
			fontFamily: "Gloria Hallelujah",
			fill: "#FFFFFF",
			fontSize: 16,
			align: "center",
		});

		const texts = txts.map((txt) => new Text(txt, style));

		for (const text of texts) {
			text.alpha = 0;
			text.anchor.set(0.5, 1);
			text.position.set(this.xPos, this.yPos - 45);
			this.scene.addDisplayObject(text);
		}

		return Actions.sequence(
			...texts.map((t) =>
				Actions.sequence(Actions.fadeIn(t, 0.3), Actions.delay(2), Actions.fadeOut(t, 0.3))
			)
		);
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

	addMotion(x = 0, y = 0) {
		this.xVel += x;
		this.yVel += y;
	}

	get bottomLeft(): { x: number; y: number } {
		return { x: this.xPos - this.width / 2, y: this.yPos + this.height / 2 };
	}

	get bottomRight(): { x: number; y: number } {
		return { x: this.xPos + this.width / 2, y: this.yPos + this.height / 2 };
	}

	get bottomCenter(): { x: number; y: number } {
		return { x: this.xPos, y: this.yPos + this.height / 2 };
	}

	get topLeft(): { x: number; y: number } {
		return { x: this.xPos - this.width / 2, y: this.yPos - this.height / 2 };
	}

	get topCenter(): { x: number; y: number } {
		return { x: this.xPos, y: this.yPos - this.height / 2 };
	}

	get topRight(): { x: number; y: number } {
		return { x: this.xPos + this.width / 2, y: this.yPos - this.height / 2 };
	}

	get leftCenter(): { x: number; y: number } {
		return { x: this.xPos - this.width / 2, y: this.yPos };
	}

	get rightCenter(): { x: number; y: number } {
		return { x: this.xPos + this.width / 2, y: this.yPos };
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

	ghostCount(): number {
		return this.previousStates.length;
	}
}
