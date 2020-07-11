(function () {
    //Globals
    var canvas = document.getElementById("canvas");
    var stage;
    var assetManager;
    var assetManifest;
    //Current Scene
    var currentScene;
    var currentState;
    assetManifest = [
        { id: "startBtn", src: "./Assets/game_start.png" },
        { id: "nextBtn", src: "./Assets/right.png" },
        { id: "backBtn", src: "./Assets/left.png" },
        { id: "target", src: "./Assets/target.png" }
    ];
    function Init() {
        console.log("Initializing Start");
        assetManager = new createjs.LoadQueue;
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManifest.concat("complete", Start, this);
    }
    function Start() {
        console.log("Starting...");
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        //set default state - state machine
        objects.game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        Main();
    }
    function Update() {
        if (currentState != objects.game.currentScene) {
            console.log("scene: " + objects.game.currentScene);
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    function Main() {
        console.log("Game start");
        //finite state
        switch (objects.game.currentScene) {
            case config.Scene.START:
                stage.removeAllChildren();
                currentScene = new scenes.StartScene(assetManager);
                stage.addChild(currentScene);
                break;
            case config.Scene.GAME:
                stage.removeAllChildren();
                currentScene = new scenes.PlayScene(assetManager);
                stage.addChild(currentScene);
                break;
            case config.Scene.OVER:
                stage.removeAllChildren();
                currentScene = new scenes.GameOverScene(assetManager);
                stage.addChild(currentScene);
                break;
        }
        currentState = objects.game.currentScene;
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map