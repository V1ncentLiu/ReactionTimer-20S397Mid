module scenes{
    export class PlayScene extends objects.Scene{
        private playLabel:objects.Label;
        private nextButton:objects.Button;
        private backButton:objects.Button;

        constructor(assetManager:createjs.LoadQueue){
            super(assetManager);
            this.Start();
        }
        public Start():void{
            this.playLabel = new objects.Label("Game Playing", "40px", "Consolas", "#000000", 320, 240, true);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 340);
            this.backButton = new objects.Button(this.assetManager, "backButton", 100, 340);
        }
        public Update():void{}
        public Main():void{
            this.addChild(this.playLabel);
            this.addChild(this.nextButton);
            this.addChild(this.backButton);

            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);
        }

        private nextButtonClick():void{
            objects.game.currentScene = config.Scene.OVER;
        }
        private backButtonClick():void{
            objects.game.currentScene = config.Scene.START;
        }
    }    
}