import {ClockTick,Timer,Directions} from '../types/index.js';
import { Coin, Snake, SlowPlayer, FastPlayer } from '../objects/index.js';
import { Board, Canvas, Console, Controls, GUI } from '../ui/index.js';
enum Difficulty{EZY=300,MED=150,DIF=50}
export class Game{
    static clock:Timer;
    static player:Snake;
    static hiSc:number=0;
    static isStart:boolean=false;
    static init(){
        Canvas.init(<HTMLCanvasElement>document.querySelector("canvas"));
        let body:HTMLBodyElement=document.querySelector("body");
        body.onkeyup=Controls.onKeyUp;
        Game.ready();
    }
    static ready(){
        Console.init();
        Board.init();
        Board.draw();
        GUI.init();
        GUI.draw();
        Game.player=new Snake({X:0,Y:0});
        Game.player.direction=Directions.RIGHT;
        Game.clock=new Timer(Difficulty.DIF,0,Game.onClockTick);
    }
    static start(){
        if(Game.isStart){return;}
        if(Game.clock.isPause){return Game.pause();}
        Game.isStart=true;
        Game.clock.start()
    }
    static pause() {
        if (Game.clock.isPause){
            Game.isStart=true
            return Game.clock.resume()
        }        
        Game.clock.pause()
        Game.isStart=false
        GUI.draw()
    }
    static reset(){
        Game.clock&&Game.clock.stop();
        Game.isStart=false;
        Game.ready();
    }
    static coinCounter=0;
    static onClockTick(){
        Controls.processInput();
        Game.player.process();
        if(Game.clock.tick==ClockTick.EVEN){
            Game.coinCounter+=1;
            if(Game.coinCounter>=2){
                Game.coinCounter=0;
                if(!Math.floor(Math.random()+0.5)){
                    var prob=(Coin.coinsActive+0.5)/5;
                    if(!Math.floor(Math.random()*0.8)){
                        var coin=Coin.rand();
                        Board.randPlace(coin);
                    }
                    else{
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
Game.init();