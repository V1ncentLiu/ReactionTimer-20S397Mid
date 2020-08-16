import { Canvas } from '../ui/canvas.js';
import { Board } from '../ui/board.js';
export class SnakeSegment {
    constructor(position) {
        this.colorIndex = 0;
        this.position = position;
    }
    color() {
        var colors = [
            "#FF0000", "#FF9966",
            "#FFFF66", "#66FF66",
            "#66FFFF", "#6699FF",
            "#9966FF", "#FF66FF"
        ];
        this.colorIndex++;
        if (this.colorIndex > colors.length) {
            this.colorIndex = 0;
        }
        return colors[this.colorIndex];
    }
    draw() {
        var boardX = (this.position.X * Board.blockSize);
        var boardY = (this.position.Y * Board.blockSize);
        var size = Board.blockSize;
        Canvas.fill_rect(boardX, boardY, size, size, this.color());
    }
    handle_collision(snake) {
        snake.die();
    }
}
//# sourceMappingURL=snakesegments.js.map