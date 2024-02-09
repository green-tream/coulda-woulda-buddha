

export default abstract class Entity {

    private width: number;
    private height: number;
    private assetName: string;


    constructor(width: number, height: number, assetName: string) {

        this.width = width;
        this.height = height;
        this.assetName = assetName; // Do we need?

    }

}