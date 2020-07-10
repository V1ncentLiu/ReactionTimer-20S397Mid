(function(){
    //Globals
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;
    let helloLabel:objects.Label;
    let startBtn:objects.Button;
    function Init(){
        console.log("Initializing Start");
        Start();
    }

    function Start(){
        console.log("Starting...");
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        Main();
    }

    function Update(){
        stage.update();
    }

    function btnClicked():void{
        helloLabel.text = "clicked";
        console.log("clicked!");
    }

    function Main(){
        console.log("Game start");
        helloLabel = new objects.Label("Reaction timer","40px",  "Consolas", "#000", 320,150,true);        
        startBtn = new objects.Button("./Assets/game_start.png", 320, 300);
        startBtn.regX = 100;
        startBtn.regY = 100;
        startBtn.on("click", btnClicked);
        stage.addChild(helloLabel);
        stage.addChild(startBtn);
    }

    window.onload = Init;
})();