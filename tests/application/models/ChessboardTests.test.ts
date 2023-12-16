import { Piece, PieceTypes, Position, Tile } from "../../../src/application/models/ChessboardAggregate";
import {describe, expect, test} from '@jest/globals';

describe("A pawn", () => {
    test('should be the default piece', () => {
        const piece = new Piece();
        expect(piece.getState().type).toBe(PieceTypes.Pawn);
    });

    test('should move forward one tile', () => {
        const tile = new Tile(new Position(0, 0));
        const piece = new Piece(tile);
        const tileAhead = new Tile(new Position(0, 1));

        expect(piece.getState().tile).toBe(tile);
        piece.moveTo(tileAhead);
        expect(piece.getState().tile).toBe(tileAhead);
    });
})
