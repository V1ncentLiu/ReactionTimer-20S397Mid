import { Canvas, Board } from '../ui/index.js';
export class Coin {
    constructor(value) {
        this.val = value;
        this.idx = Coin.coinsIndex;
        ++Coin.coinsIndex;
        ++Coin.coinsActive;
    }
    static rand() {
        return new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)]);
    }
    handle_collision(snake) {
        snake.pts += this.val;
        snake.maxLength += 8;
        this.destroy();
    }
    draw() {
        if (!this.position) {
            return;
        }
        var x = (this.position.X * Board.blockSize) + (Board.blockSize / 2);
        var y = (this.position.Y * Board.blockSize) + (Board.blockSize / 2);
        var r = (Board.blockSize / 2) - 1;
        //Canvas
        Canvas.context.beginPath();
        Canvas.context.arc(x, y, r, 0, 2 * Math.PI, false);
        Canvas.context.strokeStyle = "#aaaa00";
        Canvas.context.fillStyle = '#999900';
        Canvas.context.stroke();
        Canvas.context.fill();
    }
    destroy() {
        Board.removeObj(this.position);
        delete Coin.instances[this.idx];
        --Coin.coinsActive;
    }
}
Coin.values = [100, 200, 300, 400, 500];
Coin.instances = {};
Coin.coinsIndex = 0;
Coin.coinsActive = 0;
//# sourceMappingURL=coin.js.map