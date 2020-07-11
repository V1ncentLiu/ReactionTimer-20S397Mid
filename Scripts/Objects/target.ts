module objects{
    export class Target extends createjs.Bitmap{
        //var
        //constr
        constructor(assetmanager:createjs.LoadQueue, num:number = 1, x:number = 0, y:number = 0){
            super(assetmanager.getResult("target_" + num));
            this.x = x;
            this.y = y;
        }
    }
}