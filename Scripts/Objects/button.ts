module objects{
    export class Button extends createjs.Bitmap{
        //var
        //constr
        constructor(assetmanager:createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0){
            super(assetmanager.getResult(imageString));
            this.x = x;
            this.y = y;
            this.on("mouseover", this.mouseOver);
            this.on("mouseout", this.mouseOut);
        }
        //method
        //evthdlrs
        private mouseOver():void{
            this.alpha = 0.7;
        }
        private mouseOut():void{
            this.alpha = 1.0;
        }
    }
}