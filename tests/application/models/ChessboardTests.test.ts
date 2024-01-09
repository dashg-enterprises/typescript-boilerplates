import { Piece } from "../../../src/application/models/chess/Piece";
import { PieceTypes } from "../../../src/application/models/chess/PieceTypes";
import { Tile } from "../../../src/application/models/chess/Tile";
import { Position } from "../../../src/application/models/chess/Position";
import {describe, expect, test} from '@jest/globals';

describe("A queen", () => {
    test('is constructed when Queen is specified', () => {
        const piece = new Piece();
        const typeOfPiece = piece.getState().type;
        expect(typeOfPiece).toBe(PieceTypes.Queen);
    });
});

describe("A pawn", () => {
    test('is the default piece', () => {
        const piece = new Piece();
        const typeOfPiece = piece.getState().type;
        expect(typeOfPiece).toBe(PieceTypes.Pawn);
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

        const capturedPiece = piece.getState().captures[0];
        expect(capturedPiece).toBe(otherPiece);
    });
})
