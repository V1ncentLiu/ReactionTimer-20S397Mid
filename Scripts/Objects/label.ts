module objects{
    export class Label extends createjs.Text {
        //Var
        //Constr
        constructor(labelString:string, fontSize:string, fontFamliy:string, fontColor:string, x:number = 0, y:number = 0, isCentered:boolean = true){
            super(labelString, fontSize+" "+fontFamliy, fontColor);
            if (isCentered){
                this.regX = this.getMeasuredWidth() * .5;
                this.regY = this.getMeasuredHeight() * .5;
            }
            this.x=x;
            this.y=y;
        } 
        //Method
    }
}