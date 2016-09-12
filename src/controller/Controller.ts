/**
 * Controller
 * 游戏逻辑处理
 */
class Controller extends egret.DisplayObjectContainer{
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this);
    }

    private comeUI:comeUI;
    private textUI:textUI;
    private shareUI:shareUI;
    private onAddtoStage():void{
        
        this.comeUI = new comeUI();
        this.shareUI = new shareUI();
        
        this.comeUI.addEventListener(wmfEvent.TEST_STAR,this.textStar,this);
        this.comeUI.addEventListener(wmfEvent.SHAR_STAR,this.sharStar,this);

        this.addChild(this.comeUI);
    }
    /**
     * @returns void
     * 开始测试
     */
    private textStar():void{
        this.comeUI.removeEventListener(wmfEvent.TEST_STAR,this.textStar,this);
        this.comeUI.removeEventListener(wmfEvent.SHAR_STAR,this.sharStar,this);
        this.removeChild(this.comeUI);
        this.textUI = new textUI();
        this.addChild(this.textUI);
        var muc:musicUI = new musicUI();
        this.addChild(muc);
    }

    /**
     * @returns void
     * 分享进入页面
     */
    private sharStar():void{
        this.comeUI.removeEventListener(wmfEvent.TEST_STAR,this.textStar,this);
        this.comeUI.removeEventListener(wmfEvent.SHAR_STAR,this.sharStar,this);
        this.removeChild(this.comeUI);
        this.shareUI.shareView();
        this.addChild(this.shareUI);
        var muc:musicUI = new musicUI();
        this.addChild(muc);
    }
}