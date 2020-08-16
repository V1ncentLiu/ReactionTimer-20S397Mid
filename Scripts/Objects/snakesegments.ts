import {IGameObject} from '../types/objects.js';
import {Position} from '../types/position.js';
import {Canvas} from '../ui/canvas.js'
import {Board} from '../ui/board.js'
import {Snake} from './snake.js';
export class SnakeSegment implements IGameObject{
    public position:Position;
    public colorIndex=0;
    public color():string{
        var colors=[
            "#FF0000", "#FF9966", 
            "#FFFF66", "#66FF66",
            "#66FFFF", "#6699FF",
            "#9966FF", "#FF66FF" 
        ]
        this.colorIndex++;
        if(this.colorIndex>colors.length){
            this.colorIndex=0;
        }
        return colors[this.colorIndex];
    }
    constructor(position:Position) {
        this.position=position;
    }
    public draw(){
        var boardX=(this.position.X*Board.blockSize);
        var boardY=(this.position.Y*Board.blockSize);
        var size = Board.blockSize;
        Canvas.fill_rect(boardX,boardY,size,size, this.color());
    }
    public handle_collision(snake:Snake){
        snake.die();
    }
}