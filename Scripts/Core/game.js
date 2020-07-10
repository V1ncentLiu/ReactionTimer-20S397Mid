(function () {
    //Globals
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    function Init() {
        console.log("Initializing Start");
    }
    function Start() {
        console.log("Starting...");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        Main();
    }
    function Update() {
        stage.update();
        helloLabel.scaleX += 0.01;
        helloLabel.scaleY += 0.01;
    }
    function Main() {
        console.log("Game start");
        helloLabel = new createjs.Text("Hello world", "40px Consolas", "#000");
        helloLabel.x = 100;
        helloLabel.y = 100;
        stage.addChild(helloLabel);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map