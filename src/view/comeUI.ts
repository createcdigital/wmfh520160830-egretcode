/**
 * comeUI
 * 欢迎界面
 */
declare function shareChange(msg:string);
declare function tracking(a:string,b:string,c:string);
class comeUI extends egret.DisplayObjectContainer{
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this);
    }
    private stargame(){
        if(wmf.loadgroup == wmf.loadtrue){
            this.removeEventListener(egret.Event.ENTER_FRAME, this.stargame, this);
        }
    }

    private getUrl:getURL;
    /**
     * @returns void
     * 判断用户
     */
    private onAddtoStage():void{
        var sharId = egret.getOption("sharId");
        var isphone = document.getElementById("isphone").innerHTML;
        if(isphone !== "true"){
            wmf.openID = document.getElementById("openID").innerHTML;
            
            if (sharId !== null && sharId !== "") {
                wmf.sharOpenID = sharId;
            }else{
                wmf.sharOpenID = wmf.openID;
            }
            this.getUrl = new getURL();
            this.getUrl.addEventListener(wmfEvent.GET_TAPE,this.getType,this);
            this.getUrl.addEventListener(wmfEvent.GET_ERR,this.getErr,this);
            this.getUrl.addEventListener(wmfEvent.GET_NONE,this.getNone,this);
            this.addChild(this.getUrl);
        }else{
            wmf.openID = sharId;
            if (sharId !== null && sharId !== "") {
                wmf.sharOpenID = sharId;
                var shares = "?sharId="+sharId+"&channel="+wmf.out_trade;
                shareChange(shares);
                this.getUrl = new getURL();
                this.getUrl.addEventListener(wmfEvent.GET_TAPE,this.getType,this);
                this.getUrl.addEventListener(wmfEvent.GET_ERR,this.getErr,this);
                this.getUrl.addEventListener(wmfEvent.GET_NONE,this.getErr,this);
                this.addChild(this.getUrl);
            }else{
                this.getErr();
            }
        }
    }
    private getType(){
        var shares = "?sharId="+wmf.sharOpenID+"&channel="+wmf.out_trade;
        shareChange(shares);
        this.getUrl.removeEventListener(wmfEvent.GET_TAPE,this.getType,this);
        this.removeChild(this.getUrl);
        if(wmf.openID !== wmf.sharOpenID){
            wmf.share = true;
        }
        wmf.loadgroup = "game5";
        var loadSource = new wmf.loadSource();
        this.addChild(loadSource);
        this.addEventListener( egret.Event.ENTER_FRAME, this.stargame4, this );
    }
    private stargame4(){
        if(wmf.loadgroup == wmf.loadtrue){
            this.removeEventListener(egret.Event.ENTER_FRAME, this.stargame4, this);
            this.starShar();
        }
    }
    private getErr(){
        wmf.loadgroup = "game1";
        var loadSource = new wmf.loadSource();
        this.addChild(loadSource);
        this.addEventListener( egret.Event.ENTER_FRAME, this.stargameg, this );
    }
    private stargameg(){
        if(wmf.loadgroup == wmf.loadtrue){
            this.removeEventListener( egret.Event.ENTER_FRAME, this.stargameg, this );
            var shares = "?channel="+wmf.out_trade;
            shareChange(shares);
            this.creatView();
        }
    }
    /**
     * @returns void
     * 查询为空
     */
    private getNone(){
        if(wmf.openID == wmf.sharOpenID){
            this.getErr();
        }else{
            wmf.sharOpenID = wmf.openID;
            this.getUrl = new getURL();
            this.getUrl.addEventListener(wmfEvent.GET_TAPE,this.getType,this);
            this.getUrl.addEventListener(wmfEvent.GET_ERR,this.getErr,this);
            this.getUrl.addEventListener(wmfEvent.GET_NONE,this.getNone,this);
            this.addChild(this.getUrl);
        }
    }
    
    private _comeBg:egret.Bitmap;   //欢迎界面背景
    private _comeBtn:egret.Bitmap;  //欢迎界面进入按钮
    private _comeText:egret.Bitmap; //秋运赢豪礼回家
    private _floopBtn:egret.Bitmap; //规则打开按钮
    /**
     * @returns void
     * 创建视图
     */
    private creatView():void{
        this._comeBg = wmf.createBitmapByName("first-1");   //欢迎界面背景
        this._comeBtn = wmf.createBitmapByName("go");  //欢迎界面按钮
        this._comeText = wmf.createBitmapByName("first-3"); //秋运赢豪礼回家
        this._floopBtn = wmf.createBitmapByName("first-2"); //活动机制打开按钮
        this._comeBtn.x = 227 + this._comeBtn.width / 2;
        this._comeBtn.y = 1041 + this._comeBtn.height / 2;
        this._comeBtn.anchorOffsetX = this._comeBtn.width / 2;
        this._comeBtn.anchorOffsetY = this._comeBtn.height / 2;
        this._floopBtn.x = 43;
        this._floopBtn.y = 48;
        this._comeText.x = -361;
        this._comeText.y = 228;

        this.addChild(this._comeBg);
        this.addChild(this._floopBtn);
        this.addChild(this._comeText);
        this.addChild(this._comeBtn);

        var tw = egret.Tween.get( this._comeText );
        tw.to( {x:43}, 1000);

        var tw = egret.Tween.get( this._comeBtn , { loop:true} );
        tw.to( {scaleX:1.1,scaleY:1.1}, 500 , egret.Ease.backInOut ).to( {scaleX:1,scaleY:1}, 500 , egret.Ease.backOut );

        this._floopBtn.touchEnabled = true;
        this._comeBtn.touchEnabled = true;
        this._floopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createFlo,this);
        this._comeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.start,this);
        
        wmf.loadgroup = "game2";
        var loadResource = new wmf.loadResource();
        this.addChild(loadResource);
        this.addEventListener( egret.Event.ENTER_FRAME, this.stargame, this );
    }
    private _floGroup:egret.DisplayObjectContainer;//活动机制容器
    private _floBg:egret.Bitmap;    //游戏规则背景
    private _floBgBtn:egret.Bitmap; //游戏规则页按钮
    private _floText:egret.Bitmap;   //游戏规则说明
    /**
     * 游戏规则页面
     * @returns void
     */
    private createFlo():void{
        this._floopBtn.touchEnabled = false;
        this._comeBtn.touchEnabled = false;
        this._floGroup = new egret.DisplayObjectContainer();//容器
        this.addChild(this._floGroup);
        this._floBg = wmf.createBitmapByName("bg1");    //活动机制背景
        this._floText = wmf.createBitmapByName("first-4");//活动机制说明
        this._floBgBtn = wmf.createBitmapByName("go");//立即行动

        this._floText.x = 128;
        this._floText.y = 242;
        this._floBgBtn.x = 222 + this._floBgBtn.width / 2;
        this._floBgBtn.y = 919 + this._floBgBtn.height / 2;
        this._floBgBtn.anchorOffsetX = this._floBgBtn.width / 2;
        this._floBgBtn.anchorOffsetY = this._floBgBtn.height / 2;

        this._floGroup.addChild(this._floBg);
        this._floGroup.addChild(this._floText);
        this._floGroup.addChild(this._floBgBtn);

        var tw = egret.Tween.get( this._floBgBtn , { loop:true} );
        tw.to( {scaleX:1.1,scaleY:1.1}, 500 , egret.Ease.backInOut ).to( {scaleX:1,scaleY:1}, 500 , egret.Ease.backOut );

        this._floBg.touchEnabled = true;
        this._floBgBtn.touchEnabled = true;
        this._floBgBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.jizhistar,this);
        this._floBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closs,this);

    }
    
    /**
     * @returns void
     * 关闭规则页面
     */
    private closs():void{
        this._floBg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closs,this);
        this.removeChild(this._floGroup);
        this._floopBtn.touchEnabled = true;
        this._comeBtn.touchEnabled = true;
    }
    /**
     * @returns void
     * 开始测试
     */
    private start():void{
        this.testStar();
        tracking('Cover Page','GO','标签1');
        wmf.tracking("click?out_trade="+wmf.out_trade+"&type=click-startgame");
    }

    private jizhistar():void{
        this.testStar();
        tracking('活动机制','GO','标签2');
        wmf.tracking("click?out_trade="+wmf.out_trade+"&type=click-jzstartgame");
    }
    
    /**
     * @returns void
     * 测试打开监听
     */
    private testStar():void{
        var event:wmfEvent = new wmfEvent(wmfEvent.TEST_STAR);
        this.dispatchEvent(event);
    }
    /**
     * @returns void
     * 分享打开监听
     */
    private starShar():void{
        var event:wmfEvent = new wmfEvent(wmfEvent.SHAR_STAR);
        this.dispatchEvent(event);
    }
}