(function(){
    //Globals
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;
    let helloLabel:objects.Label;
    let startBtn:objects.Button;
    let assetManager:createjs.LoadQueue;
    let assetManifest:any[];

    assetManifest = [
        {id:"startBtn", src:"./Assets/game_start.png"}
    ];
    
    function Init(){
        console.log("Initializing Start");
        assetManager = new createjs.LoadQueue;
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManifest.concat("complete", Start, this);
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
        helloLabel = new objects.Label("Reation timer", "a0px","Courier","#000000",320,150,true);    
        startBtn = new objects.Button(assetManager, "./Assets/game_start.png", 320, 300);
        startBtn.regX = 100;
        startBtn.regY = 100;
        startBtn.on("click", btnClicked);        
        stage.addChild(helloLabel);
        stage.addChild(startBtn);        
    }

    window.onload = Init;
})();