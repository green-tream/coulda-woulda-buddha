export default class Block {
	private i: number;
	private j: number;
	private _size: number;

	constructor(i: number, j: number, size: number) {
		this.i = i;
		this.j = j;
		this._size = size;
	}

	get x(): number {
		return this.i;
	}

	get y(): number {
		return this.j;
	}

	get size(): number {
		return this._size;
	}
}
