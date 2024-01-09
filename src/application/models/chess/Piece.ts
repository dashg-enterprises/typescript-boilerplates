import { DomainError } from "../DomainError";
import { PieceTypes } from "./PieceTypes";
import { Tile } from "./Tile";

export class Piece {
    private id: number;
    private type: PieceTypes;
    private tile: Tile;
    private captures: Piece[] = [];
    constructor(tile: Tile = null, type: PieceTypes = PieceTypes.Pawn, id: number = null) {
        this.id = id;
        this.tile = tile;
        this.type = type;
        tile?.occupy(this);
    }
    capture(piece: Piece) {
        this.captures.push(piece);
    }
    moveTo(tile: Tile) {
        if (this.type == PieceTypes.Pawn) {
            const distance = tile.distanceFrom(this.tile);
            if (distance.y < 0 || distance.x < 0) throw new DomainError("Pawns can't move backwards.");
            if (distance.y > 1 || distance.x > 1) throw new DomainError("Pawns can't move more than one space.");
            if (distance.y != 1 && distance.x == 1) throw new DomainError("Pawns can't move sideways.");
            if (distance.y == 1 && distance.x == 1 && !tile.isOccupied()) throw new DomainError("Pawns can only move diagonally to capture.");

            tile.occupy(this);
            this.tile = tile;
        } else if (this.type == PieceTypes.Queen) {
            // validation for queen movement to target tile
        }
    }
    getState() {
        return {
            id: this.id,
            type: this.type,
            tile: this.tile,
            captures: this.captures.map(c => c.getState())
        };
    }
}

