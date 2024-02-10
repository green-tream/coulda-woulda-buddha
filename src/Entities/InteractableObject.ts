import Entity from "./Entity";


export default class InteractableObject extends Entity {

    constructor(width: number, height: number, texture: string) {
        super(width, height, texture);
    }

}