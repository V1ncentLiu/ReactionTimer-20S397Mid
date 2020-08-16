import {IDrawable} from '../types/objects.js';
import {Position} from '../types/position.js';
import {Canvas} from './canvas.js';
export class Board{
    public static bgColor:string="#000000";
    public static gridColor:string="FFFFFF";
    public static blockSize=0;
    public static height=0;
    public static width=0;
    public static grid:IDrawable[][];
    public static placeObj(object:IDrawable, position:Position){
        Board.grid[position.X][position.Y]=object;
        object.position=Position.copy(position);
    }
    public static removeObj(position:Position){
        Board.grid[position.X][position.Y]=null;
    }
    public static moveObj(object:IDrawable,newPosition:Position){
        Board.removeObj(object.position);
        Board.placeObj(object,newPosition);
    }
    public static randPlace(object:IDrawable){
        var position=Board.randPosGen();
        Board.placeObj(object,position);
    }
    public static moveToRand(object:IDrawable){
        var position=Board.randPosGen();
        Board.moveObj(object,position);
    }
    public static randPosGen(){
        var position:Position;
        while(!position){
            var x=Math.floor(Math.random()*Board.width);
            var y=Math.floor(Math.random()*Board.height);
            if(!Board.grid[x][y]){return new Position(x,y);}
        }
    }
    public static init(){
        Board.height=Canvas.height/Board.blockSize;
        Board.height=Canvas.width/Board.blockSize;
        Board.grid=new Array(Board.width);
        for (var i =0, j=Board.width;i!=j;i++){
            Board.grid[i]=new Array(Board.height);
        }
        Canvas.fill(Board.bgColor);
        for(var cx=0;cx<Board.length;cx++){
            for(var cy=0;cy<Board.height;cy++){
                if(Board.grid[cx][cy]){Board.grid[cx][cy].draw();}
            }
        }
    }
    public static draw(){
        Canvas.fill(Board.bgColor);
        for (var i=0;i<Board.width;i++){
            for(var j=0;j<Board.height;j++){
                if(Board.grid[i][j]){
                    Board.grid[i][j].draw;
                }
            }
        }
    }
}