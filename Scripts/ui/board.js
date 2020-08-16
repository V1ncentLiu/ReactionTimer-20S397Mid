import { Position } from '../types/position.js';
import { Canvas } from './canvas.js';
export class Board {
    static placeObj(object, position) {
        Board.grid[position.X][position.Y] = object;
        object.position = Position.copy(position);
    }
    static removeObj(position) {
        Board.grid[position.X][position.Y] = null;
    }
    static moveObj(object, newPosition) {
        Board.removeObj(object.position);
        Board.placeObj(object, newPosition);
    }
    static randPlace(object) {
        var position = Board.randPosGen();
        Board.placeObj(object, position);
    }
    static moveToRand(object) {
        var position = Board.randPosGen();
        Board.moveObj(object, position);
    }
    static randPosGen() {
        var position;
        while (!position) {
            var x = Math.floor(Math.random() * Board.width);
            var y = Math.floor(Math.random() * Board.height);
            if (!Board.grid[x][y]) {
                return new Position(x, y);
            }
        }
    }
    static init() {
        Board.height = Canvas.height / Board.blockSize;
        Board.height = Canvas.width / Board.blockSize;
        Board.grid = new Array(Board.width);
        for (var i = 0, j = Board.width; i != j; i++) {
            Board.grid[i] = new Array(Board.height);
        }
        Canvas.fill(Board.bgColor);
        for (var cx = 0; cx < Board.length; cx++) {
            for (var cy = 0; cy < Board.height; cy++) {
                if (Board.grid[cx][cy]) {
                    Board.grid[cx][cy].draw();
                }
            }
        }
    }
    static draw() {
        Canvas.fill(Board.bgColor);
        for (var i = 0; i < Board.width; i++) {
            for (var j = 0; j < Board.height; j++) {
                if (Board.grid[i][j]) {
                    Board.grid[i][j].draw;
                }
            }
        }
    }
}
Board.bgColor = "#000000";
Board.gridColor = "FFFFFF";
Board.blockSize = 0;
Board.height = 0;
Board.width = 0;
//# sourceMappingURL=board.js.map