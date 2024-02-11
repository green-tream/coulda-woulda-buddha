import InteractableObject from "../entities/InteractableObject";
import Player from "../player/Player";
import LevelScene from "../scenes/LevelScene";

class Box extends InteractableObject {
	private respawnPos: { x: number; y: number };
	private interactedGhostNumber: number = 9999999;
	
	constructor(scene, respawnPos: { x: number; y: number } ) {
		super(100, 100, scene.assets.box, scene);
		this.respawnPos = respawnPos;
	}

	respawn(): void {
		this.moveSprite(this.respawnPos.x, this.respawnPos.y);
	}

	interact(player: Player) {
		if (!this.canInteract(player)) {
			return;
		}
		this.interactedGhostNumber = player.ghostCount();

	}

	canInteract(player: Player): boolean {
		return player.ghostCount() > this.interactedGhostNumber;
	}

	update(): void {
		
	}
}
