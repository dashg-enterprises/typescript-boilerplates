import { Piece, PieceTypes, Position, Tile } from "../../../src/application/models/ChessboardAggregate";
import {describe, expect, test} from '@jest/globals';

describe("A pawn", () => {
    test('is the default piece', () => {
        const piece = new Piece();
        expect(piece.getState().type).toBe(PieceTypes.Pawn);
    });

    test('begins on the given tile', () => {
        const tile = new Tile(new Position(0, 0));
        const piece = new Piece(tile);

        expect(piece.getState().tile).toBe(tile);
    });

    test('can move forward one tile', () => {
        const tile = new Tile(new Position(0, 0));
        const piece = new Piece(tile);
        const tileAhead = new Tile(new Position(0, 1));

        piece.moveTo(tileAhead);
        
        expect(piece.getState().tile).toBe(tileAhead);
    });

    test('can move one tile diagonally when there is a piece to capture', () => {
        const startingTile = new Tile(new Position(0, 0));
        const tileDiagonallyRight = new Tile(new Position(1, 1));
        //const tileDiagonallyLeft = new Tile(new Position(-1, 1));
        const piece = new Piece(startingTile);
        const otherPiece = new Piece(tileDiagonallyRight);

        piece.moveTo(tileDiagonallyRight);

        expect(piece.getState().tile).toBe(tileDiagonallyRight);
        expect(piece.getState().captures.find(capturedPiece => capturedPiece.getState().id == otherPiece.getState().id)).toBe(otherPiece);
    });
})
