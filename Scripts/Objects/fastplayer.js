import { Speed } from '../types/index.js';
import { Board, Canvas } from '../ui/index.js';
export class FastPlayer {
    constructor() {
        this.color = "#3366FF";
        this.index = FastPlayer.itemsIndex;
        ++FastPlayer.itemsIndex;
        ++FastPlayer.itemsActive;
    }
    handle_collision(snake) {
        snake.setSpeed(Speed.FAST);
        this.destroy();
    }
    draw() {
        if (!this.position) {
            return;
        }
        let x = (this.position.X * Board.blockSize) + 2;
        let y = (this.position.Y * Board.blockSize) + 2;
        let size = Board.blockSize - 4;
        Canvas.draw_rect(x, y, size, size, this.color);
    }
    destroy() {
        Board.removeObj(this.position);
        delete FastPlayer.instances[this.index];
        --FastPlayer.itemsActive;
    }
}
FastPlayer.instances = {};
FastPlayer.itemsIndex = 0;
FastPlayer.itemsActive = 0;
//# sourceMappingURL=fastplayer.js.map