import { Game } from '../Core/game.js';

export abstract class GUI {
    static header: HTMLElement;            
    static lives: HTMLElement; 
    static score: HTMLElement;
    static build: HTMLElement;
    static init() {
        GUI.header=<HTMLElement>document.querySelector("header");
        GUI.score=<HTMLElement>document.querySelector("#score");
        GUI.lives=<HTMLElement>document.querySelector("#lives");
        GUI.build=<HTMLElement>document.querySelector("#build");
    }
    static draw() {
        GUI.lives.innerText=Game.isStart
            ?"Lives: "+Game.player.lives
            :"Press Start";
        GUI.score.innerText=Game.isStart
            ?"Score: "+Game.player.pts
            :"Hi Score: "+Game.hiSc;          
    }
}