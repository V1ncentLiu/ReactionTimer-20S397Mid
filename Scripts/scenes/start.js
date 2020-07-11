var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        //constr
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        //mthod
        StartScene.prototype.Start = function () {
            //init objs in scnen
            this.welcomeLbl = new objects.Label("welcome", "60px", "Consolas", "#000000", 320, 240, true);
            this.startButton = new objects.Button(this.assetManager, "nextButton", 320, 300);
            this.Main();
        };
        StartScene.prototype.Update = function () { };
        StartScene.prototype.Main = function () {
            this.addChild(this.welcomeLbl);
            this.addChild(this.startButton);
            this.startButton.on("click", this.startButtonClick);
        };
        StartScene.prototype.startButtonClick = function () { };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map