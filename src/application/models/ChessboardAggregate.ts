import { DomainError } from "./DomainError";

export class ChessboardAggregate {
    private id: number;
    private tiles: any[];
    constructor(id: number = null, tiles: any[] = []) {
        this.id = id;
        this.tiles = tiles;
    }
    move(pieceId: number, tileId: number) {

    }
}

export class PositionValue {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class TileEntity {
    private id: number;
    private piece: PieceEntity;
    private position: PositionValue;
    occupy(piece: PieceEntity) {
        if (this.piece) {
            piece.capture(this.piece);
        }
        this.piece = piece;
    }
    isOccupied() {
        return !!this.piece;
    }
    distanceFrom(tile: TileEntity): PositionValue {
        return {
            x: this.position.x - tile.position.x,
            y: this.position.y - tile.position.y
        }
    }
}

export class PieceEntity {
    private id: number;
    private type: string;
    private tile: TileEntity;
    private captures: PieceEntity[] = [];
    constructor(id: number = null, type: string = "Pawn") {
        this.id = id;
        this.type = type;
    }
    capture(piece: PieceEntity) {
        this.captures.push(piece);
    }
    moveTo(tile: TileEntity) {
        if (this.type == "Pawn") {
            const distance = tile.distanceFrom(this.tile);
            if (distance.y < 0 || distance.x < 0) throw new DomainError("Pawns can't move backwards.");
            if (distance.y > 1 || distance.x > 1) throw new DomainError("Pawns can't move more than one space.");
            if (distance.y != 1 && distance.x == 1) throw new DomainError("Pawns can't move sideways.");
            if (distance.y == 1 && distance.x == 1 && !tile.isOccupied()) throw new DomainError("Pawns can only move diagonally to capture.");
        
            tile.occupy(this);
        }
    }
}