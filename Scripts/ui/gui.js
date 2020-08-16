import { Game } from '../Core/game.js';
export class GUI {
    static init() {
        GUI.header = document.querySelector("header");
        GUI.score = document.querySelector("#score");
        GUI.lives = document.querySelector("#lives");
        GUI.build = document.querySelector("#build");
    }
    static draw() {
        GUI.lives.innerText = Game.isStart
            ? "Lives: " + Game.player.lives
            : "Press Start";
        GUI.score.innerText = Game.isStart
            ? "Score: " + Game.player.pts
            : "Hi Score: " + Game.hiSc;
    }
}
//# sourceMappingURL=gui.js.map