export var ClockType;
(function (ClockType) {
    ClockType[ClockType["TIMED"] = 0] = "TIMED";
    ClockType[ClockType["INF"] = 1] = "INF";
})(ClockType || (ClockType = {}));
export var ClockTick;
(function (ClockTick) {
    ClockTick[ClockTick["EVEN"] = 0] = "EVEN";
    ClockTick[ClockTick["ODD"] = 1] = "ODD";
})(ClockTick || (ClockTick = {}));
export class Timer {
    constructor(intv, duration, handlr) {
        this.tick = ClockTick.EVEN;
        this.handlr = () => { console.log("no clock"); };
        this.onElapsed = () => {
            if (this.isPause) {
                return;
            }
            this.tick = (this.tick === ClockTick.EVEN)
                ? ClockTick.ODD
                : ClockTick.EVEN;
            this.handlr();
            if (this.type == ClockType.TIMED) {
                this.stop();
            }
        };
        this.intv = intv;
        this.handlr = handlr;
        this.type = (duration == 0)
            ? ClockType.INF
            : ClockType.TIMED;
    }
    start() {
        this.isStart = true;
        this.handle = (this.type == ClockType.INF)
            ? window.setInterval(this.onElapsed.bind(this), this.intv)
            : window.setTimeout(this.onElapsed.bind(this), this.intv);
    }
    stop() {
        this.isStart = false;
        return (this.type == ClockType.INF)
            ? window.clearInterval(this.handle)
            : window.clearTimeout(this.handle);
    }
    pause() { this.isPause = true; }
    resume() { this.isPause = false; }
}
//# sourceMappingURL=timer.js.map