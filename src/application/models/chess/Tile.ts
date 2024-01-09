import { IIdentifiable } from "../IIdentifiable";
import { Position } from "./Position";
import { Piece } from "./Piece";


export class Tile implements IIdentifiable {
    readonly id: number;
    private piece: Piece;
    private position: Position;
    constructor(position: Position, piece: Piece = null, id: number = null) {
        this.id = id;
        this.piece = piece;
        this.position = position;
    }
    occupy(piece: Piece) {
        if (this.isOccupied()) {
            piece.capture(this.piece);
        }
        this.piece = piece;
    }
    isOccupied() {
        return !!this.piece;
    }
    distanceFrom(tile: Tile): Position {
        return {
            x: this.position.x - tile.position.x,
            y: this.position.y - tile.position.y
        };
    }
}
