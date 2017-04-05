/**
 * menuUI
 * 菜单页面
 */
declare function shareChange(msg:string);
declare function tracking(a:string,b:string,c:string);
class menuUI extends egret.DisplayObjectContainer{
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this);
        wmf.loadgroup = "game4";
        var loadResource = new wmf.loadResource();
        this.addChild(loadResource);
        this.addEventListener( egret.Event.ENTER_FRAME, this.stargame, this );
    }
    private stargame(){
        if(wmf.loadgroup == wmf.loadtrue){
            this.removeEventListener(egret.Event.ENTER_FRAME, this.stargame, this);
        }
    }
    private _menuBg:egret.Bitmap;       //背景
    private _Title:egret.Bitmap;        //标题
    private _menuGroup:egret.DisplayObjectContainer;    //菜单容器
    private _round:egret.Bitmap;        //白色小圆点背景
    private _round1:egret.Bitmap;       //圆点上的字
    private _greenR:egret.Sprite;       //绿色小圆点
    //白色小圆点
    private _writeR1:egret.Sprite;_writeR2:egret.Sprite;_writeR3:egret.Sprite;_writeR4:egret.Sprite;_writeR5:egret.Sprite;
    private _writeR = [this._writeR1,this._writeR2,this._writeR3,this._writeR4,this._writeR5];
    private _writeX = [59,197.22,334.79,473.01,611.23];
    //点击音效
    private clickMusic:clickMusic;
    /**
     * @returns void
     * 创建视图
     */
    private onAddtoStage():void{
        this._menuGroup = new egret.DisplayObjectContainer();
        this.addChild(this._menuGroup);
        //点击音效
        // this.clickMusic = new clickMusic();
        // this.addChild(this.clickMusic);
        //页面背景
        this._menuBg = wmf.createBitmapByName("bg");
        //标题
        this._Title = wmf.createBitmapByName("two-1");;
        this._Title.x = 152;
        this._Title.y = 48;

        this._menuGroup.addChild(this._menuBg);
        this._menuGroup.addChild(this._Title);

        //小圆点
        this._round = wmf.createBitmapByName("round");
        this._round.x = 35;
        this._round.y = 188;
        this._menuGroup.addChild(this._round);

        for(var i=0;i<5;i++){
            this._writeR[i] = new egret.Sprite();
            this._writeR[i].graphics.beginFill(0xFFFFFF,1);
            this._writeR[i].graphics.drawRoundRect(this._writeX[i],209,80,80,90);
            this._writeR[i].graphics.endFill();
            this._writeR[i].name = ""+i;
            this._menuGroup.addChild(this._writeR[i]);
            this._writeR[i].touchEnabled = true;
            this._writeR[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
        }

        this._greenR = new egret.Sprite();
        this._greenR.graphics.beginFill(0x65B145,1);
        this._greenR.graphics.drawRoundRect(49,199,100,100,100);
        this._greenR.graphics.endFill();
        this._menuGroup.addChild(this._greenR);

        //字
        this._round1 = wmf.createBitmapByName("round1");
        this._round1.x = 64;
        this._round1.y = 228;
        this._menuGroup.addChild(this._round1);

        this.groupView();
        
    }

    private group:egret.DisplayObjectContainer;     //滚动容器
    //创建 ScrollView
    private scrollView:egret.ScrollView;
    private bg:egret.Bitmap;bg1:egret.Bitmap;bg2:egret.Bitmap;bg3:egret.Bitmap;bg4:egret.Bitmap;
    /**
     * @returns void
     * 滚动视图
     */
    private groupView():void{
       //创建新容器
        this.group = new egret.DisplayObjectContainer();
        this._menuGroup.addChild(this.group);
        //选项卡
        this.bg = wmf.createBitmapByName("two-3-1");
        this.bg.x = 373;
        this.bg.y = 404;
        this.bg.name = "0";
        this.bg.anchorOffsetX = 271;
        this.bg.anchorOffsetY = 404;
        this.bg1 = wmf.createBitmapByName("two-3-2");
        this.bg1.x = 750 + 373; 
        this.bg1.y = 404;
        this.bg1.name = "1";
        this.bg1.anchorOffsetX = 271;
        this.bg1.anchorOffsetY = 404;
        // this.bg1.alpha = 0.8;
        this.bg2 = wmf.createBitmapByName("two-3-3");
        this.bg2.x = 750*2 + 373;
        this.bg2.y = 404;
        this.bg2.name = "2";
        this.bg2.anchorOffsetX = 271;
        this.bg2.anchorOffsetY = 404;
        // this.bg2.alpha = 0.8;
        this.bg3 = wmf.createBitmapByName("two-3-4");
        this.bg3.x = 750*3 + 373;
        this.bg3.y = 404;
        this.bg3.name = "3";
        this.bg3.anchorOffsetX = 271;
        this.bg3.anchorOffsetY = 404;
        // this.bg3.alpha = 0.8;
        this.bg4 = wmf.createBitmapByName("two-3-5");
        this.bg4.x = 750*4 + 373;
        this.bg4.y = 404;
        this.bg4.name = "4";
        this.bg4.anchorOffsetX = 271;
        this.bg4.anchorOffsetY = 404;
        // this.bg4.alpha = 0.8;
        var bg5:egret.Sprite = new egret.Sprite();
        bg5.graphics.beginFill(0x000000,0);
        bg5.graphics.drawRect(this.bg.width*5+204,0,102,102);
        bg5.graphics.endFill();
        this.group.addChild(this.bg);
        this.group.addChild(this.bg1);
        this.group.addChild(this.bg2);
        this.group.addChild(this.bg3);
        this.group.addChild(this.bg4);
        this.group.addChild(bg5);
        //监听点击事件
        this.bg.touchEnabled = true;
        this.bg1.touchEnabled = true;
        this.bg2.touchEnabled = true;
        this.bg3.touchEnabled = true;
        this.bg4.touchEnabled = true;
        this.bg.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.bg1.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.bg2.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.bg3.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.bg4.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);

        this.group.x = 0;
        this.group.y = 357;
    }
    private weizhi = [0,-750,-1500,-2250,-3000];
    //滚动视图位置改变监听
    private onChange(event:egret.Event){
        var name = Number(event.target.name);
        this._greenR.x = this._writeX[name] - 59;
        //this.clickMusic.starMuc();
        var tw = egret.Tween.get(this.group);
        tw.to( {x:this.weizhi[name]}, 500 );
    }

    /**
     * @param  {egret.Event} event
     * @returns void
     * 监听点击的对象
     */
    private touchEnd(event:egret.Event):void{
        wmf._CardNum = Number(event.target.name);
        wmf._Card = wmf._cardAlert[wmf._CardNum];
        this.showCard(wmf._Card);
    }

    private _showBg:egret.Bitmap;       //弹出层背景
    private _showTitle:egret.Bitmap;    //弹出层标题
    private _showCard:egret.Bitmap;     //弹出层卡片
    private _showBtn:egret.Bitmap;      //弹出层按钮
    private _showClose:egret.Bitmap;    //弹出层关闭
    private _showGroup:egret.DisplayObjectContainer;//弹窗容器
    /**
     * @param  {String} card
     * @returns void
     * 打开卡片弹出层
     */
    private showCard(card:string):void{
        this.bg.touchEnabled = false;
        this.bg1.touchEnabled = false;
        this.bg2.touchEnabled = false;
        this.bg3.touchEnabled = false;
        this.bg4.touchEnabled = false;
        for(var i=0;i<5;i++){
            this._writeR[i].touchEnabled = false;
        }
        //弹窗容器
        this._showGroup = new egret.DisplayObjectContainer();
        this.addChild(this._showGroup);
        //弹窗页面
        this._showBg = wmf.createBitmapByName("bg3");
        this._showTitle = wmf.createBitmapByName("two-5");
        this._showCard = wmf.createBitmapByName(card);
        this._showBtn = wmf.createBitmapByName("go");
        this._showClose = wmf.createBitmapByName("closs");

        this._showTitle.x = 245;
        this._showTitle.y = 191;
        this._showCard.x = 106;
        this._showCard.y = 283;
        this._showBtn.x = 227 + this._showBtn.width/2;
        this._showBtn.y = 950 + this._showBtn.height/2;
        this._showBtn.anchorOffsetX = this._showBtn.width/2;
        this._showBtn.anchorOffsetY = this._showBtn.height/2;
        this._showClose.x = 618;
        this._showClose.y = 156;

        this._showGroup.addChild(this._showBg);
        this._showGroup.addChild(this._showTitle);
        this._showGroup.addChild(this._showCard);
        this._showGroup.addChild(this._showBtn);
        this._showGroup.addChild(this._showClose);
        //监听关闭窗口
        this._showBg.touchEnabled = true;
        this._showBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closs,this);

        this._showCard.touchEnabled = true;
        this._showCard.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            this._showBg.touchEnabled = false;
        },this);
        this._showCard.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            this._showBg.touchEnabled = true;
        },this);

        //监听按钮点击
        this._showBtn.touchEnabled = true;
        this._showBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickOk,this);

        //按钮动画
        var tw = egret.Tween.get( this._showBtn, { loop:true} );
        tw.to( {scaleX:1.1,scaleY:1.1}, 500 , egret.Ease.backInOut ).to( {scaleX:1,scaleY:1}, 500 , egret.Ease.backOut );

        
    }
    private closs():void{
        this.removeChild(this._showGroup);
        this.bg.touchEnabled = true;
        this.bg1.touchEnabled = true;
        this.bg2.touchEnabled = true;
        this.bg3.touchEnabled = true;
        this.bg4.touchEnabled = true;
        for(var i=0;i<5;i++){
            this._writeR[i].touchEnabled = true;
        }
    }
    
    private updateURL:updateURL;
    /**
     * @returns void
     * 确认点菜
     */
    private clickOk():void{
        wmf._cardlist[wmf._CardNum] = 1;
        this.updateURL = new updateURL();
        this.updateURL.addEventListener(wmfEvent.SUB_MIT,this.updateType,this);
        this.updateURL.addEventListener(wmfEvent.SUB_MIT_ERR,this.updateErr,this);
        this._showGroup.addChild(this.updateURL);
        tracking('confirm dish','确认并领红包','标签4');
            // this.removeChild(this._showGroup);
            // this.removeChild(this._menuGroup);
            // //打开分享页
            // var share:shareUI = new shareUI();
            // share.shareView();
            // this.addChild(share);
            // tracking("选择第"+wmf._CardNum+"道菜");
            // var shareId = "?sharId="+wmf.openID+"&channel="+wmf.out_trade;
            // shareChange(shareId);
    }
    private updateType(){
        this._showBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickOk,this);
        this.removeChild(this._showGroup);
        this.removeChild(this._menuGroup);
        var isphone = document.getElementById("isphone").innerHTML;
        wmf.tracking("click?out_trade="+wmf.out_trade+"&type=click-menu"+wmf._CardNum);
        if(isphone == "true"){
            var url = "http://wmf.mz-weixin-qq.com/wmfh520160830/index.php?sharId="+wmf._Phone+"&channel="+wmf.out_trade;
            window.location.href=url;
        }else{
            //打开分享页
            var share:shareUI = new shareUI();
            share.shareView();
            this.addChild(share);
            var shareId = "?sharId="+wmf.openID+"&channel="+wmf.out_trade;
            shareChange(shareId);
        }
    }
    private updateErr(){
        this.bg.touchEnabled = true;
        this.bg1.touchEnabled = true;
        this.bg2.touchEnabled = true;
        this.bg3.touchEnabled = true;
        this.bg4.touchEnabled = true;
        for(var i=0;i<5;i++){
            this._writeR[i].touchEnabled = true;
        }
        wmf._cardlist[wmf._CardNum] = 0;
        this.updateURL.removeEventListener(wmfEvent.SUB_MIT,this.updateType,this);
        this.updateURL.removeEventListener(wmfEvent.SUB_MIT_ERR,this.updateErr,this);
        this._showGroup.removeChild(this.updateURL);
    }
    
}