module scenes{
    export class PlayScene extends objects.Scene{
        //var
        private target:objects.Target;

        private milsec:number = 0;
        private sec:number = 0;
        private min:number = 0;

        private targetX:number;
        private targetY:number;

        private playLabel:objects.Label;
        private nextButton:objects.Button;
        private backButton:objects.Button;

        constructor(assetManager:createjs.LoadQueue){
            super(assetManager);
            this.Start();
        }
        public Start():void{
           this.targetX = Math.ceil(Math.random() * 640);
           this.targetY = Math.ceil(Math.random() * 400);
           this.target = new objects.Target(this.assetManager, objects.game.target, this.targetX, this.targetY);
        }
        public Update():void{
            this.milsec = createjs.Ticker.getTime(true);
            this.sec += Math.ceil(this.milsec/1000);
            this.min += Math.ceil(this.sec/60);

            if(this.sec == 60){this.sec = 0;}
        }
        public Main():void{
            this.addChild(this.playLabel);
            this.addChild(this.nextButton);
            this.addChild(this.backButton);

            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);
            this.target.on("click",this.targetclick);
        }

        private nextButtonClick():void{
            objects.game.currentScene = config.Scene.OVER;
        }
        private backButtonClick():void{
            objects.game.currentScene = config.Scene.START;
        }
        private targetclick():void{
            objects.game.currentScene = config.Scene.OVER;
        }
    }    
}