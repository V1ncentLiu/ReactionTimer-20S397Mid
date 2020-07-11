module scenes{
    export class GameOverScene extends objects.Scene{
        //var
        private gameOverLabel:objects.Label;
        private backButton:objects.Button;
        //constr
        constructor(assetManager:createjs.LoadQueue){
            super(assetManager);
            this.Start();
        }
        //methods
        public Start():void{
            this.gameOverLabel = new objects.Label("Game Over", "40px", "Consolas", "#000000", 320, 200, true);
            this.backButton = new objects.Button(this.assetManager, "backButton", 320, 340);
            this.Main();
        }
        public Update():void{}
        public Main():void{
            this.addChild(this.gameOverLabel);
            this.addChild(this.backButton);
            this.backButton.on("click", this.backButtonClick);
        }
        private backButtonClick():void{
            objects.game.currentScene = config.Scene.START;
        }
    }
}