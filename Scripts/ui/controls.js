import { Directions, Keys } from '../types/index.js';
import { Game } from '../Core/game.js';
export class Controls {
    static processInput() {
        if (!Controls.lastKey) {
            return;
        }
        switch (Controls.lastKey) {
            case Keys.UP:
                if (Game.player.direction != Directions.DOWN) {
                    Game.player.direction = Directions.UP;
                }
                break;
            case Keys.DOWN:
                if (Game.player.direction != Directions.UP) {
                    Game.player.direction = Directions.DOWN;
                }
                break;
            case Keys.LEFT:
                if (Game.player.direction != Directions.RIGHT) {
                    Game.player.direction = Directions.LEFT;
                }
                break;
            case Keys.RIGHT:
                if (Game.player.direction != Directions.LEFT) {
                    Game.player.direction = Directions.RIGHT;
                }
                break;
            case Keys.J:
                Game.player.jump();
        }
        Controls.lastKey = null;
    }
}
Controls.lastKey = null;
Controls.onKeyUp = (ev) => { Controls.lastKey = ev.keyCode; };
//# sourceMappingURL=controls.js.map