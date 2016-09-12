/**
 * Controller
 * 游戏逻辑处理
 */
var Controller = (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }
    var d = __define,c=Controller,p=c.prototype;
    p.onAddtoStage = function () {
        this.comeUI = new comeUI();
        this.shareUI = new shareUI();
        this.comeUI.addEventListener(wmfEvent.TEST_STAR, this.textStar, this);
        this.comeUI.addEventListener(wmfEvent.SHAR_STAR, this.sharStar, this);
        this.addChild(this.comeUI);
    };
    /**
     * @returns void
     * 开始测试
     */
    p.textStar = function () {
        this.comeUI.removeEventListener(wmfEvent.TEST_STAR, this.textStar, this);
        this.comeUI.removeEventListener(wmfEvent.SHAR_STAR, this.sharStar, this);
        this.removeChild(this.comeUI);
        this.textUI = new textUI();
        this.addChild(this.textUI);
        var muc = new musicUI();
        this.addChild(muc);
    };
    /**
     * @returns void
     * 分享进入页面
     */
    p.sharStar = function () {
        this.comeUI.removeEventListener(wmfEvent.TEST_STAR, this.textStar, this);
        this.comeUI.removeEventListener(wmfEvent.SHAR_STAR, this.sharStar, this);
        this.removeChild(this.comeUI);
        this.shareUI.shareView();
        this.addChild(this.shareUI);
        var muc = new musicUI();
        this.addChild(muc);
    };
    return Controller;
}(egret.DisplayObjectContainer));
egret.registerClass(Controller,'Controller');
//# sourceMappingURL=Controller.js.map