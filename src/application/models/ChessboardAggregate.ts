import { Aggregate } from "./Aggregate";
import { DomainError } from "./DomainError";
import { IIdentifiable } from "./IIdentifiable";

export class Chessboard extends Aggregate {
    private tiles: any[];
    constructor(id: number = null, tiles: any[] = []) {
        super(id);
        this.tiles = tiles;
    }
    move(pieceId: number, tileId: number) {

    }
}

export class Position {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

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
        }
    }
}

export enum PieceTypes {
    Pawn = "Pawn",
    King = "King"
}

export class Piece {
    private id: number;
    private type: string;
    private tile: Tile;
    private captures: Piece[] = [];
    constructor(tile: Tile = null, id: number = null, type: string = PieceTypes.Pawn) {
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
        } else if (this.type == "Queen") {
            
        }
    }
    getState() {
        return {
            id: this.id, 
            type: this.type,
            tile: this.tile,
            captures: this.captures
        }
    }
}