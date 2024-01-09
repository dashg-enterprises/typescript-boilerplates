import { Aggregate } from "../Aggregate";

export class Chessboard extends Aggregate {
    private tiles: any[];
    constructor(id: number = null, tiles: any[] = []) {
        super(id);
        this.tiles = tiles;
    }
    move(pieceId: number, tileId: number) {

    }
}