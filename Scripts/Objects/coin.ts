import{IGameObject,Position} from '../types/index.js'
import{Canvas, Board} from '../ui/index.js'
import{Snake} from './snake.js'
export class Coin implements IGameObject{
    public static values: number[] = [100, 200, 300, 400, 500];
	public static instances: { [index: number]: Coin } = {}
	public static coinsIndex: number = 0;
    public static coinsActive: number = 0;
    public idx: number;
    public val: number;
    public position: Position;
    public constructor(value: number){
        this.val=value;
        this.idx=Coin.coinsIndex;
        ++Coin.coinsIndex;
        ++Coin.coinsActive;
    }
    public static rand(){
        return new Coin(Coin.values[Math.floor(Math.random()*Coin.values.length)]);
    }
    public handle_collision(snake:Snake):void{
        snake.pts+=this.val;
        snake.maxLength+=8;
        this.destroy();
    }
    public draw(){
        if(!this.position){return;}
        var x=(this.position.X*Board.blockSize)+(Board.blockSize/2);
        var y=(this.position.Y*Board.blockSize)+(Board.blockSize/2);
        var r=(Board.blockSize/2)-1;
        //Canvas
        Canvas.context.beginPath();
        Canvas.context.arc(x, y, r, 0, 2 * Math.PI, false);
        Canvas.context.strokeStyle="#aaaa00";
        Canvas.context.fillStyle='#999900';
        Canvas.context.stroke();
        Canvas.context.fill();
    }
    public destroy(){
        Board.removeObj(this.position);
        delete Coin.instances[this.idx];
        --Coin.coinsActive;
    }
}