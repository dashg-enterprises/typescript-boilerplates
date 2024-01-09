import { PieceTypes } from "./PieceTypes";
import { Piece } from "./Piece";
import { Tile } from "./Tile";

export interface IPieceFactory {
    createPawn(): Piece;
    createQueen(): Piece;
    createKing(): Piece;
    
    rehydratePawn(id: number, tile: Tile): Piece;
    rehydrateQueen(id: number, tile: Tile): Piece;
    rehydrateKing(id: number, tile: Tile): Piece;
}

export class PieceFactory implements IPieceFactory {
    createPawn(): Piece {
        return new Piece();
    }
    createQueen(): Piece {
        return new Piece(null, PieceTypes.Queen);
    }
    createKing(): Piece {
        return new Piece(null, PieceTypes.King);
    }

    rehydratePawn(id: number, tile: Tile): Piece {
        return new Piece(tile, PieceTypes.Pawn, id);
    }
    rehydrateQueen(id: number, tile: Tile): Piece {
        return new Piece(tile, PieceTypes.Queen, id);
    }
    rehydrateKing(id: number, tile: Tile): Piece {
        return new Piece(tile, PieceTypes.King, id);
    }
}
