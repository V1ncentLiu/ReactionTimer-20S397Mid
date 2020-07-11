module scenes{
    export class StartScene extends objects.Scene{
        //var
        private welcomeLbl:objects.Label;
        private startButton:objects.Button;

        //constr
        constructor(assetManager:createjs.LoadQueue){
            super(assetManager);
            this.Start();        
        }
        //mthod
        public Start():void{
            //init objs in scnen
            this.welcomeLbl = new objects.Label("welcome", "60px", "Consolas", "#000000", 320, 240, true);
            this.startButton = new objects.Button(this.assetManager, "nextButton", 320, 300);
            this.Main();
        }

        public Update():void{}
        
        public Main():void{
            this.addChild(this.welcomeLbl);
            this.addChild(this.startButton);
            this.startButton.on("click", this.startButtonClick);
        }
        private startButtonClick():void{
            objects.game.currentScene = config.Scene.GAME;
        }
    }
}