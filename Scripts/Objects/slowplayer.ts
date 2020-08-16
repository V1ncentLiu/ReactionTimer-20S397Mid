import { Speed, Position, IGameObject } from '../types/index.js'
import { Board, Canvas } from '../ui/index.js'
import { Snake, Coin } from './index.js'

export class SlowPlayer implements IGameObject {
	public static instances:{[index:number]:Coin}={}
	public static itemsIndex:number=0;
	public static itemsActive:number=0;
	public index:number;
	public color="#3366FF";
	public position:Position;
	constructor() {
		this.index=SlowPlayer.itemsIndex;
		++SlowPlayer.itemsIndex;
		++SlowPlayer.itemsActive;
	}
	public handle_collision(snake:Snake){
		snake.setSpeed(Speed.SLOW);
		this.destroy();
	}
	public draw() {
		if (!this.position) { return; }
		let x=(this.position.X*Board.blockSize)+2;
		let y=(this.position.Y*Board.blockSize)+2;
		let size=Board.blockSize-4;
		Canvas.draw_rect(x,y,size,size,this.color);
	}
	public destroy() {
		Board.removeObj(this.position);
		delete SlowPlayer.instances[this.index];
		--SlowPlayer.itemsActive;
	}
}