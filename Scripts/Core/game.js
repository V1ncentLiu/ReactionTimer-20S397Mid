(function () {
    //Globals
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var startBtn;
    function Init() {
        console.log("Initializing Start");
        Start();
    }
    function Start() {
        console.log("Starting...");
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver();
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        Main();
    }
    function Update() {
        stage.update();
    }
    function Main() {
        console.log("Game start");
        helloLabel = new objects.Label("Hello world", "40px", "Consolas", "#000", 320, 150, true);
        startBtn = new objects.Button("./Assets/game_start.png", 320, 300);
        startBtn.regX = 100;
        startBtn.regY = 100;
        stage.addChild(helloLabel);
        stage.addChild(startBtn);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map