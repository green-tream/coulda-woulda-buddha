import Entity from "./Entity";


export default class Player extends Entity {

    private speed: number

    constructor(width: number, height: number, assetName: string) {
        super(width, height, assetName);

        this.speed = 105;
    }

    handleInput(event: KeyboardEvent): void {

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