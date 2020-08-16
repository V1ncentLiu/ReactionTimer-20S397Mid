import { Speed } from '../types/index.js';
import { Board, Canvas } from '../ui/index.js';
export class SlowPlayer {
    constructor() {
        this.color = "#3366FF";
        this.index = SlowPlayer.itemsIndex;
        ++SlowPlayer.itemsIndex;
        ++SlowPlayer.itemsActive;
    }
    handle_collision(snake) {
        snake.setSpeed(Speed.SLOW);
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
        delete SlowPlayer.instances[this.index];
        --SlowPlayer.itemsActive;
    }
}
SlowPlayer.instances = {};
SlowPlayer.itemsIndex = 0;
SlowPlayer.itemsActive = 0;
//# sourceMappingURL=slowplayer.js.map