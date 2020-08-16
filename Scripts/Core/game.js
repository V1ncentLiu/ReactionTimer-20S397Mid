import { ClockTick, Timer, Directions } from '../types/index.js';
import { Coin, Snake, SlowPlayer, FastPlayer } from '../objects/index.js';
import { Board, Canvas, Console, Controls, GUI } from '../ui/index.js';
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["EZY"] = 300] = "EZY";
    Difficulty[Difficulty["MED"] = 150] = "MED";
    Difficulty[Difficulty["DIF"] = 50] = "DIF";
})(Difficulty || (Difficulty = {}));
export class Game {
    static init() {
        Canvas.init(document.querySelector("canvas"));
        let body = document.querySelector("body");
        body.onkeyup = Controls.onKeyUp;
        Game.ready();
    }
    static ready() {
        Console.init();
        Board.init();
        Board.draw();
        GUI.init();
        GUI.draw();
        Game.player = new Snake({ X: 0, Y: 0 });
        Game.player.direction = Directions.RIGHT;
        Game.clock = new Timer(Difficulty.DIF, 0, Game.onClockTick);
    }
    static start() {
        if (Game.isStart) {
            return;
        }
        if (Game.clock.isPause) {
            return Game.pause();
        }
        Game.isStart = true;
        Game.clock.start();
    }
    static pause() {
        if (Game.clock.isPause) {
            Game.isStart = true;
            return Game.clock.resume();
        }
        Game.clock.pause();
        Game.isStart = false;
        GUI.draw();
    }
    static reset() {
        Game.clock && Game.clock.stop();
        Game.isStart = false;
        Game.ready();
    }
    static onClockTick() {
        Controls.processInput();
        Game.player.process();
        if (Game.clock.tick == ClockTick.EVEN) {
            Game.coinCounter += 1;
            if (Game.coinCounter >= 2) {
                Game.coinCounter = 0;
                if (!Math.floor(Math.random() + 0.5)) {
                    var prob = (Coin.coinsActive + 0.5) / 5;
                    if (!Math.floor(Math.random() * 0.8)) {
                        var coin = Coin.rand();
                        Board.randPlace(coin);
                    }
                    else {
                        if (!Math.floor(Math.random() + .5)) {
                            var slowPlayer = new SlowPlayer();
                            Board.randPlace(slowPlayer);
                        }
                        else {
                            var fastPlayer = new FastPlayer();
                            Board.randPlace(fastPlayer);
                        }
                    }
                }
            }
        }
        Board.draw();
        GUI.draw();
    }
}
Game.hiSc = 0;
Game.isStart = false;
Game.coinCounter = 0;
Game.init();
//# sourceMappingURL=game.js.map