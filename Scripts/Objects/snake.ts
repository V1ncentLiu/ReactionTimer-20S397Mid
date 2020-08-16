import { Speed, Directions, Position, Edges, ClockTick, IPlayerObject, IGameObject } from '../types/index.js'
import { SnakeSegment } from './snakesegments.js'
import { Board } from '../ui/index.js'
import { Game } from '../Core/game.js'
import { IDrawable } from '../types/objects.js';
export class Snake extends SnakeSegment implements IPlayerObject{
    public static defLength=10;
    public jumpDist=3;
    public skipNext:boolean=false;
    public hitDetect:boolean=false;
    public isAlive:boolean=false;
    public speed:Speed=Speed.NORM;
    public direction:Directions=Directions.NONE;
    public position:Position;
    public hiSc:number=0;
    public pts:number=0;
    public lives:number=20;
    public seg:SnakeSegment[]=[];
    public maxLength:number=Snake.defLength;
    constructor(position:Position) {
        super(position);
        this.position=position;
        this.seg[0]=this;
        this.isAlive=true;
        Board.placeObj(this,position);
    }
    public jump(){
        var position:Position=Position.copy(this.position);
        switch(this.direction){
            case Directions.UP:
                position.Y-=this.jumpDist;
                break;
            case Directions.DOWN:
                position.Y+=this.jumpDist;
                break;
            case Directions.LEFT:
                position.X -= this.jumpDist;
                break;
            case Directions.RIGHT:
                position.X += this.jumpDist;
                break;
        }
        this.updateBoard(position);
    }
    public die(){
        this.hitDetect=true;
        this.hiSc=this.pts>this.hiSc?this.pts:this.hiSc;
        Game.hiSc=this.hiSc>Game.hiSc?this.hiSc:Game.hiSc;
        if(this.lives==0){
            this.isAlive=false;
            return Game.reset();
        }
        this.lives-=1;
        this.destroy();
        this.direction=Directions.NONE;
    }
    public setSpeed(speed:Speed){
        this.speed=speed;
        this.skipNext=(speed===Speed.SLOW);
    }
    public process(){
        if(this.isAlive){return;}
        if(this.speed!=Speed.FAST&&Game.clock.tick==ClockTick.ODD){return;}
        if(this.speed==Speed.SLOW&&Game.clock.tick==ClockTick.EVEN){
            this.skipNext=!this.skipNext;
            if(this.skipNext){return;}
        }
        this.hitDetect=false;
        let isMoving:Boolean=false;
        let pos:Position=Position.copy(this.position);
        switch(this.direction){
            case Directions.UP:
                pos.Y-=1;break;
            case Directions.DOWN:
                pos.Y+=1;break;
			case Directions.LEFT:
				pos.X-=1;break;
			case Directions.RIGHT:
				pos.X+=1;break;
			case Directions.NONE:
				isMoving = false;
        }
        if(isMoving){
            if(pos.X<0){pos.X=Board.width-1;}
            else if(pos.Y<0){pos.Y=Board.height-1;}
			else if (pos.X==Board.width){pos.X=0;}
			else if (pos.Y==Board.height){pos.Y=0;}
			if(Board.grid[pos.X][pos.Y]){
				var object:IGameObject=<IGameObject>Board.grid[pos.X][pos.Y];
				object.handle_collision(this);
			}
        }
        if(!this.isAlive){this.destroy();}
        else if(!this.hitDetect){this.updateBoard(pos);}
    }
    private updateBoard(pos:Position){
        var lastPos=Position.copy(this.position);
        for(var i=0,j=this.seg.length;i!=j;i++){
            let segment=this.seg[i];
            let newPos=(i==0)?pos:lastPos;
            lastPos=segment.position;
            Board.moveObj(segment,newPos);
        }
        if(this.seg.length<=this.maxLength){
            let newSegment=new SnakeSegment(lastPos);
            this.seg.push(newSegment);
            Board.placeObj(newSegment,lastPos);
        }
    }
    private destroy(){
        for (var i=0,j=this.seg.length;i!==j;i++){
            Board.removeObj(this.seg[i].position)
        }
        this.seg=[this];
        this.maxLength=Snake.defLength;
    }
}