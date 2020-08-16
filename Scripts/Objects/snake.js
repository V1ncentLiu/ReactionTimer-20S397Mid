import { Speed, Directions, Position, ClockTick } from '../types/index.js';
import { SnakeSegment } from './snakesegments.js';
import { Board } from '../ui/index.js';
import { Game } from '../Core/game.js';
export class Snake extends SnakeSegment {
    constructor(position) {
        super(position);
        this.jumpDist = 3;
        this.skipNext = false;
        this.hitDetect = false;
        this.isAlive = false;
        this.speed = Speed.NORM;
        this.direction = Directions.NONE;
        this.hiSc = 0;
        this.pts = 0;
        this.lives = 20;
        this.seg = [];
        this.maxLength = Snake.defLength;
        this.position = position;
        this.seg[0] = this;
        this.isAlive = true;
        Board.placeObj(this, position);
    }
    jump() {
        var position = Position.copy(this.position);
        switch (this.direction) {
            case Directions.UP:
                position.Y -= this.jumpDist;
                break;
            case Directions.DOWN:
                position.Y += this.jumpDist;
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
    die() {
        this.hitDetect = true;
        this.hiSc = this.pts > this.hiSc ? this.pts : this.hiSc;
        Game.hiSc = this.hiSc > Game.hiSc ? this.hiSc : Game.hiSc;
        if (this.lives == 0) {
            this.isAlive = false;
            return Game.reset();
        }
        this.lives -= 1;
        this.destroy();
        this.direction = Directions.NONE;
    }
    setSpeed(speed) {
        this.speed = speed;
        this.skipNext = (speed === Speed.SLOW);
    }
    process() {
        if (this.isAlive) {
            return;
        }
        if (this.speed != Speed.FAST && Game.clock.tick == ClockTick.ODD) {
            return;
        }
        if (this.speed == Speed.SLOW && Game.clock.tick == ClockTick.EVEN) {
            this.skipNext = !this.skipNext;
            if (this.skipNext) {
                return;
            }
        }
        this.hitDetect = false;
        let isMoving = false;
        let pos = Position.copy(this.position);
        switch (this.direction) {
            case Directions.UP:
                pos.Y -= 1;
                break;
            case Directions.DOWN:
                pos.Y += 1;
                break;
            case Directions.LEFT:
                pos.X -= 1;
                break;
            case Directions.RIGHT:
                pos.X += 1;
                break;
            case Directions.NONE:
                isMoving = false;
        }
        if (isMoving) {
            if (pos.X < 0) {
                pos.X = Board.width - 1;
            }
            else if (pos.Y < 0) {
                pos.Y = Board.height - 1;
            }
            else if (pos.X == Board.width) {
                pos.X = 0;
            }
            else if (pos.Y == Board.height) {
                pos.Y = 0;
            }
            if (Board.grid[pos.X][pos.Y]) {
                var object = Board.grid[pos.X][pos.Y];
                object.handle_collision(this);
            }
        }
        if (!this.isAlive) {
            this.destroy();
        }
        else if (!this.hitDetect) {
            this.updateBoard(pos);
        }
    }
    updateBoard(pos) {
        var lastPos = Position.copy(this.position);
        for (var i = 0, j = this.seg.length; i != j; i++) {
            let segment = this.seg[i];
            let newPos = (i == 0) ? pos : lastPos;
            lastPos = segment.position;
            Board.moveObj(segment, newPos);
        }
        if (this.seg.length <= this.maxLength) {
            let newSegment = new SnakeSegment(lastPos);
            this.seg.push(newSegment);
            Board.placeObj(newSegment, lastPos);
        }
    }
    destroy() {
        for (var i = 0, j = this.seg.length; i !== j; i++) {
            Board.removeObj(this.seg[i].position);
        }
        this.seg = [this];
        this.maxLength = Snake.defLength;
    }
}
Snake.defLength = 10;
//# sourceMappingURL=snake.js.map