import Entity from "./Entity";


export default class Player extends Entity {

    // constructor(width: number, height: number, assetName: string) {
    //     super(width, height, assetName);
    // }

    speed: number

    constructor(assetName: string) {
        super(assetName);

        this.speed = 5;
    }

    handleInput(event: KeyboardEvent): void {

        switch (event.key) {
            case "ArrowRight":
                this.moveSprite(this.speed, 0);
            case "ArrowLeft":
                this.moveSprite(-1 * this.speed, 0);
            
        }

    }

}