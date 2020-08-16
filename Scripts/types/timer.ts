export enum ClockType{ TIMED, INF}
export enum ClockTick{ EVEN, ODD}

export class Timer{
    private handle: number;
    private intv: number;
    public type: ClockType;
    public tick: ClockTick = ClockTick.EVEN;
    public isStart: boolean;
    public isPause: boolean;
    private handlr: ()=>any=()=>{console.log("no clock")}
    private onElapsed=()=>{
        if (this.isPause){return;}
        this.tick=(this.tick===ClockTick.EVEN)
            ?ClockTick.ODD
            :ClockTick.EVEN;
        this.handlr();
        if(this.type==ClockType.TIMED){this.stop();}
    }
    constructor(intv: number,duration:number,handlr:()=>any){
        this.intv=intv;
        this.handlr=handlr;
        this.type=(duration==0)
            ?ClockType.INF
            :ClockType.TIMED;
    }
    public start(){
        this.isStart=true;
        this.handle=(this.type==ClockType.INF)
            ?window.setInterval(this.onElapsed.bind(this), this.intv)
            :window.setTimeout(this.onElapsed.bind(this), this.intv);
    }
    public stop(){
        this.isStart = false
        return (this.type == ClockType.INF)
            ? window.clearInterval(this.handle)
            : window.clearTimeout(this.handle)
    }
    public pause() { this.isPause = true }

    public resume() { this.isPause = false } 
}