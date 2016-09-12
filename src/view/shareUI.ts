/**
 * shareUI
 * 分享页面
 */
declare function shareChange(msg:string);
declare function tracking(a:string,b:string,c:string);
class shareUI extends egret.DisplayObjectContainer{
    constructor() {
        super();
    }
    private _Bg:egret.Bitmap; //背景页面
    /**
     * @returns void
     * 分享进入视图
     */
    public shareView():void{
        var numv = 0;
        for(var i=0;i<5;i++){
            if(wmf._cardlist[i] == 1){
                numv += 1;
            }
        }
        if(numv == 5){
            this.overpage();
        }else{
            this.creatView();
        }
    }

    private againBtn:egret.Bitmap;
    private finishTex:egret.Bitmap;
    private overpage():void{
        var overpages:egret.Bitmap = wmf.createBitmapByName("finish");
        this.addChild(overpages);
        //判断是否为分享的页面
        if(wmf.openID == wmf.sharOpenID){
            this.finishTex = wmf.createBitmapByName("finish-my");
            this.againBtn = wmf.createBitmapByName("finish-restar");
            this.againBtn.x = 227;
            this.againBtn.y = 1041;
            document.getElementById("qr").style.display = "block";
            this.addChild(this.finishTex);
            this.addChild(this.againBtn);
            this.againBtn.touchEnabled = true;
            this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){this.nextBtn(2)},this);

        }else{
            this.finishTex = wmf.createBitmapByName("finish-other");
            this.againBtn = wmf.createBitmapByName("ljxd-btn");
            this.againBtn.x = 227;
            this.againBtn.y = 1041;
            this.addChild(this.finishTex);
            this.addChild(this.againBtn);
            this.againBtn.touchEnabled = true;
            this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                this.resetType();
                tracking('Table Full','立即行动','标签7');
                wmf.tracking("click?out_trade="+wmf.out_trade+"&type=click-ljxd");
            },this);
        }
    }

    private _shareGroup:egret.DisplayObjectContainer;    //分享页面容器
    private _shareBg:egret.Bitmap;                       //分享页背景
    private _shareTitle:egret.Bitmap;                    //第二步
    private _shareName:egret.TextField;                  //名字
    private _shareBtn1:egret.Bitmap;                     //领取豪礼
    private _shareBtn2:egret.Bitmap;                     //再来一次或开一桌
    private _shareBtn3:egret.Bitmap;                     //更多惊喜
    private timer2:egret.Timer;
    /**
     * @returns void
     * 创建视图
     */
    private creatView():void{
        //创建分享页面容器
        this._shareGroup = new egret.DisplayObjectContainer();
        this.addChild(this._shareGroup);

        //创建容器页面
        this._shareBg = wmf.createBitmapByName("three-bg");
        this._shareGroup.addChild(this._shareBg);

        //判断是否为分享的页面
        if(wmf.openID == wmf.sharOpenID){
            this.myPage();
            this._shareBg.touchEnabled = true;
            this._shareBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openShare,this);
        }else{
            this.otherPage();
        }

    }
    /**
     * @returns void
     * 我的页面
     */
    private myPage():void{
        //第二步
        this._shareTitle = wmf.createBitmapByName("three-1");
        this._shareTitle.x = 240;
        this._shareTitle.y = 199;
        //还差？人
        this._shareTitle1 = new egret.TextField();
        this._shareTitle1.y = 257;
        this._shareTitle1.width = 750;
        this._shareTitle1.textAlign = egret.HorizontalAlign.CENTER;
        this._shareTitle1.size = 35;
        this._shareTitle1.bold = true;
        this._shareName = new egret.TextField();
        this._shareName.y = 305;
        this._shareName.width = 750;
        this._shareName.textAlign = egret.HorizontalAlign.CENTER;
        this._shareName.size = 33;
        this._shareName.bold = true;
        //赢取豪礼
        this._shareBtn1 = wmf.createBitmapByName("yqhl-btn");
        this._shareBtn1.x = 227 + this._shareBtn1.width/2;
        this._shareBtn1.y = 920 + this._shareBtn1.height/2;
        this._shareBtn1.anchorOffsetX = this._shareBtn1.width/2;
        this._shareBtn1.anchorOffsetY = this._shareBtn1.height/2;
        //再来一次
        this._shareBtn2 = wmf.createBitmapByName("again-btn");
        this._shareBtn2.x = 75;
        this._shareBtn2.y = 1031;
        //我要更多惊喜
        this._shareBtn3 = wmf.createBitmapByName("gd-btn");
        this._shareBtn3.x = 401;
        this._shareBtn3.y = 1031;

        this._shareGroup.addChild(this._shareTitle);
        this._shareGroup.addChild(this._shareName);
        this._shareGroup.addChild(this._shareTitle1);
        this._shareGroup.addChild(this._shareBtn1);
        this._shareGroup.addChild(this._shareBtn2);
        this._shareGroup.addChild(this._shareBtn3);

        //按钮监听
        this._shareBtn1.touchEnabled = true;
        this._shareBtn2.touchEnabled = true;
        this._shareBtn3.touchEnabled = true;
        this._shareBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openShare,this);
        this._shareBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){this.nextBtn(2)},this);
        this._shareBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openBtn,this);

         //按钮动画
        var tw = egret.Tween.get( this._shareBtn1, { loop:true} );
        tw.to( {scaleX:1.1,scaleY:1.1}, 500 , egret.Ease.backInOut ).to( {scaleX:1,scaleY:1}, 500 , egret.Ease.backOut );
        
        
        var numv = 0;
        for(var i=0;i<5;i++){
            if(wmf._cardlist[i] == 0){
                numv += 1;
            }
        }
        this._shareTitle1.text = wmf._Name + "的团圆饭\n";
        this._shareName.text = "  还差" + numv + "人，需要更多人气";
        this.createTable();

         //变色动画
        var tw = egret.Tween.get( this._shareName, { loop:true} );
        tw.to({textColor:0xffffff}, 500).to( {textColor:0xdc3232}, 10 ).to( {textColor:0xdc3232}, 500).to({textColor:0xffffff}, 10);

        //定时刷新
        this.timer2 = new egret.Timer(500,0);
        this.timer2.addEventListener(egret.TimerEvent.TIMER,this.restarTimer,this);
        this.timer2.start();
    }

    private _shareTitle1:egret.TextField;  //5缺几
    /**
     * @returns void
     * 其他人分享到页面
     */
    private otherPage():void{
        //用户姓名
        this._shareName = new egret.TextField;
        this._shareName.y = 280;
        this._shareName.width = 750;
        this._shareName.textAlign = egret.HorizontalAlign.CENTER;
        this._shareName.size = 33;
        this._shareName.bold = true;

        //团圆饭5缺？
        this._shareTitle1 = new egret.TextField;
        this._shareTitle1.width = 750;
        this._shareTitle1.textAlign = egret.HorizontalAlign.CENTER;
        this._shareTitle1.y = 240;
        this._shareTitle1.size = 35;
        this._shareTitle1.bold = true;
        //提示标题
        this._shareTitle = wmf.createBitmapByName("three-5");
        this._shareTitle.x = 205;
        this._shareTitle.y = 891;
        //我也要开一桌
        this._shareBtn2 = wmf.createBitmapByName("againtoo-btn");
        this._shareBtn2.x = 75;
        this._shareBtn2.y = 1031;
        //我要更多惊喜
        this._shareBtn3 = wmf.createBitmapByName("gd-btn");
        this._shareBtn3.x = 401;
        this._shareBtn3.y = 1031;

        this._shareGroup.addChild(this._shareTitle);
        this._shareGroup.addChild(this._shareName);
        this._shareGroup.addChild(this._shareTitle1);
        this._shareGroup.addChild(this._shareBtn2);
        this._shareGroup.addChild(this._shareBtn3);

        //按钮监听
        this._shareBtn2.touchEnabled = true;
        this._shareBtn3.touchEnabled = true;
        this._shareBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){this.nextBtn(1)},this);
        this._shareBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openBtn,this);
        
        var numv = 0;
        for(var i=0;i<5;i++){
            if(wmf._cardlist[i] == 0){
                numv += 1;
            }
        }
        this._shareTitle1.text = wmf._Name + "的团圆饭";
        this._shareName.text = "  还差" + numv + "人,需要更多人气\n快帮TA点菜";
        this.createOtherTable();

         //变色动画
        var tw = egret.Tween.get( this._shareName, { loop:true} );
        tw.to({textColor:0xffffff}, 500).to( {textColor:0xdc3232}, 10 ).to( {textColor:0xdc3232}, 500).to({textColor:0xffffff}, 10);

        //定时刷新
        this.timer2 = new egret.Timer(500,0);
        this.timer2.addEventListener(egret.TimerEvent.TIMER,this.restarTimer,this);
        this.timer2.start();
    }

    private getURL:getURL;
    /**
     * 页面刷新
     */
    private restarTimer(){
        this.getURL = new getURL();
        this.getURL.addEventListener(wmfEvent.GET_TAPE,this.getType,this);
        this.addChild(this.getURL);
    }

    /**
     * @returns void
     * 刷新餐桌
     */
    private getType():void{
        this.getURL.removeEventListener(wmfEvent.GET_TAPE,this.getType,this);
        this.removeChild(this.getURL);
        
        var numv = 0;
        for(var i=0;i<5;i++){
            if(wmf._cardlist[i] == 0){
                numv += 1;
            }
        }
        if(numv == 0){
            this.timer2.stop();
            this.onTapCloss();
            this.removeChild(this.tablesGroup);
            this.removeChild(this._shareGroup);
            this.overpage();
        }else{
            //判断是否为分享的页面
            if(wmf.openID == wmf.sharOpenID){
                if(this.isreturn){
                    this._shareName.text = "  还差" + numv + "人,需要更多人气";
                    this.removeChild(this.tablesGroup);
                    this.createTable();
                }
            }else{
                if(this.isreturn){
                    this._shareName.text = "  还差" + numv + "人,需要更多人气\n快帮TA点菜";
                    this.removeChild(this.tablesGroup) ;
                    this.createOtherTable();
                }
            }
        }
    }

    //餐桌选项
    private table1:egret.Bitmap;table2:egret.Bitmap;table3:egret.Bitmap;table4:egret.Bitmap;table5:egret.Bitmap;
    private table = [this.table1,this.table2,this.table3,this.table4,this.table5]
    private huoguo:egret.Bitmap;        //火锅
    private tables1:egret.Bitmap;tables2:egret.Bitmap;tables3:egret.Bitmap;tables4:egret.Bitmap;tables5:egret.Bitmap;
    private tables = [this.tables1,this.tables2,this.tables3,this.tables4,this.tables5]
    /**                                  
     * @returns void
     * 餐桌容器
     */
    private tablesGroup:egret.DisplayObjectContainer;
    /**                                  
     * @returns void
     * 创建餐桌自己的餐桌
     */
    private createTable():void{
         //创建餐桌容器
        this.tablesGroup = new egret.DisplayObjectContainer();
        this.addChild(this.tablesGroup);
        for(var i = 0;i < 5;i++){
            this.table[i] = wmf.createBitmapByName(wmf._cardArr[i][0]);
            this.tables[i] = wmf.createBitmapByName(wmf._cardArr[i][1]);
            this.table[i].x = wmf._cardXY[i][0];
            this.tables[i].x = wmf._card1XY[i][0];
            this.table[i].y = wmf._cardXY[i][1];
            this.tables[i].y = wmf._card1XY[i][1];
            this.table[i].name = ""+i;
            this.tables[i].name = ""+i;
            if(wmf._cardlist[i] == 1){
                this.tablesGroup.addChild(this.table[i]);
            }
        }
    }
    /**                                  
     * @returns void
     * 创建餐桌别人的餐桌
     */
    private createOtherTable():void{
         //创建餐桌容器
        this.tablesGroup = new egret.DisplayObjectContainer();
        this.addChild(this.tablesGroup);
        for(var i = 0;i < 5;i++){
            this.table[i] = wmf.createBitmapByName(wmf._cardArr[i][0]);
            this.tables[i] = wmf.createBitmapByName(wmf._cardArr[i][1]);
            this.table[i].x = wmf._cardXY[i][0];
            this.tables[i].x = wmf._card1XY[i][0];
            this.table[i].y = wmf._cardXY[i][1];
            this.tables[i].y = wmf._card1XY[i][1];
            this.table[i].name = ""+i;
            this.tables[i].name = ""+i;
            this.table[i].touchEnabled = true;
            this.table[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapTable,this);
            this.tables[i].touchEnabled = true;
            this.tables[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickOk,this);
            if(wmf._cardlist[i] == 1){
                this.tablesGroup.addChild(this.table[i]);
            }else{
                this.tablesGroup.addChild(this.tables[i]);
            }
            
        }
    } 

    private tapTable(event:egret.Event):void{
        if(wmf.share){
            var name = Number(event.target.name);
            
            if(wmf._cardlist[name] == 1){
                this.isRepeat(1);
            }else{
                wmf._CardNum = name;
                wmf._Card = wmf._cardAlert[wmf._CardNum];
                //this.showCard(wmf._Card);
            }
        }else{
            this.isRepeat(2);
        }
    }

    private updateURL:updateURL;
    private clickOk(event:egret.Event){
        wmf._CardNum = event.target.name;
        wmf._cardlist[wmf._CardNum] = 1;
        this.updateURL = new updateURL();
        this.updateURL.addEventListener(wmfEvent.SUB_MIT,this.updateType,this);
        this.updateURL.addEventListener(wmfEvent.SUB_MIT_ERR,this.updateErr,this);
        //this._showGroup.addChild(this.updateURL);
        this.addChild(this.updateURL);
    }
    private updateType(){
        //this._showBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickOk,this);
        this.openTap();
        //this.removeChild(this._showGroup);
        this.tablesGroup.removeChild(this.tables[wmf._CardNum]);
        this.tablesGroup.addChild(this.table[wmf._CardNum]);
        wmf._cardlist[wmf._CardNum] = 1;
        var numv = 0;
        for(var i=0;i<5;i++){
            if(wmf._cardlist[i] == 0){
                numv += 1;
            }
        }
        this._shareName.text = "还差" + numv + "人,需要更多人气\n快帮TA点菜";
        if(numv == 0){
            this.removeChild(this._shareGroup);
            this.overpage();
        }
    }
    private updateErr(){
        wmf._cardlist[wmf._CardNum] = 0;
        this.updateURL.removeEventListener(wmfEvent.SUB_MIT,this.updateType,this);
        this.updateURL.removeEventListener(wmfEvent.SUB_MIT_ERR,this.updateErr,this);
        //this._showGroup.removeChild(this.updateURL);
        //this.removeChild(this._showGroup);
        this.isRepeat(2);
    }

    private _repeatGroup:egret.DisplayObjectContainer;
    private _repeatBg:egret.Bitmap;
    private _repeatBg1:egret.Bitmap;
    private _repeatClose:egret.Sprite;
    /**
     * @returns void
     * 这道菜已经被别人点过了提示
     */
    private isRepeat(num:number):void{
        this.onTapCloss();
        //创建提示容器
        this._repeatGroup = new egret.DisplayObjectContainer();
        this.addChild(this._repeatGroup);
        //提示页面
        this._repeatBg = wmf.createBitmapByName("bg2");
        if(num == 1){
            this._repeatBg1 = wmf.createBitmapByName("isRepeat");
            this._repeatBg1.x = 209;
            this._repeatBg1.y = 527;
        }else{
            this._repeatBg1 = wmf.createBitmapByName("isOnce");
            this._repeatBg1.x = 231;
            this._repeatBg1.y = 527;
        }
        this._repeatGroup.addChild(this._repeatBg);
        this._repeatGroup.addChild(this._repeatBg1);
        this._repeatBg.touchEnabled = true;
        this._repeatBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.repeatCloss,this);

        this._repeatBg1.touchEnabled = true;
        this._repeatBg1.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            this._repeatBg.touchEnabled = false;
        },this);
        this._repeatBg1.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            this._repeatBg.touchEnabled = true;
        },this);
    }
    /**
     * @returns void
     * 关闭提示页面
     */
    private repeatCloss():void{
        this._repeatBg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.repeatCloss,this);
        this.removeChild(this._repeatGroup);
        this.openTap();
    }

    private resetURL:resetURL;
    /**
     * @returns void
     * 再开一桌
     */
    private nextBtn(btnType:number):void{
        var numv = 0;
        for(var i=0;i<5;i++){
            if(wmf._cardlist[i] == 1){
                numv += 1;
            }
        }
        if(numv !== 5){
            this.timer2.stop();
        }
        
        if(wmf.openID !== wmf.sharOpenID){
            var myData = new Date(); 
            var times = myData.getTime();//当前时间的毫秒数
            var url  = 'http://www.createcdigital.com/wmfh520160830/index.php?channel='+wmf.out_trade + "&r="+ times;
            location.href = url;
        }else{
            this.resetURL = new resetURL();
            this.resetURL.addEventListener(wmfEvent.REST_TAPE,this.resetType,this);
            this.addChild(this.resetURL);
        }
        switch(btnType)
        {
            case 1:
            wmf.tracking("click?out_trade="+wmf.out_trade+"&type=click-wyyw");
            tracking('view status','我也要玩','标签5');
            break;
            case 2:
            wmf.tracking("click?out_trade="+wmf.out_trade+"&type=click-cxkz");
            tracking('Table Full','重新开桌','标签8');
            break;
        }
    }
    private resetType(){
        
        var myData = new Date(); 
        var times = myData.getTime();//当前时间的毫秒数
        var url  = 'http://www.createcdigital.com/wmfh520160830/index.php?channel='+wmf.out_trade + "&r="+ times;
        window.location.href = url;
    }

    private _concernGroup:egret.DisplayObjectContainer;     //关注容器
    private _conBg:egret.Bitmap;                            //关注背景
    private _conBg1:egret.Bitmap;                           //二维码背景
    private _conMor:egret.Bitmap;                           //更多活动惊喜
    /**
     * @returns void
     * 关注
     */
    private openBtn():void{
        document.getElementById("gzpng").style.display="block";
        document.getElementById("redtext").style.display="block";
        this.onTapCloss();
        //创建关注容器
        this._concernGroup = new egret.DisplayObjectContainer();
        this.addChild(this._concernGroup);
        //关注二维码页面
        this._conBg = wmf.createBitmapByName("bg3");
        this._conBg1 = wmf.createBitmapByName("redpag");
        this._conMor = wmf.createBitmapByName("gz-text");
        this._conBg1.x = 161;
        this._conBg1.y = 199;
        this._conMor.x = 297;
        this._conMor.y = 965;
        this._concernGroup.addChild(this._conBg);
        this._concernGroup.addChild(this._conBg1);
        this._concernGroup.addChild(this._conMor);
        this._conBg.touchEnabled = true;
        this._conBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.conCloss,this);

        this._conBg1.touchEnabled = true;
        this._conBg1.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            this._conBg.touchEnabled = false;
        },this);
        this._conBg1.addEventListener(egret.TouchEvent.TOUCH_END,function(){
            this._conBg.touchEnabled = true;
        },this);
        // this._concernGroup.addChild(this._conClose);
        wmf.tracking("click?out_trade="+wmf.out_trade+"&type=click-guanzhu");
        tracking('view status','更多惊喜','标签6');
    }
    /**
     * @returns void
     * 关闭二维码页面
     */
    private conCloss():void{
        document.getElementById("gzpng").style.display="none";
        document.getElementById("redtext").style.display="none";
        this._conBg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.conCloss,this);
        this.removeChild(this._concernGroup);
        this.openTap();
    }

    private _openSBg:egret.Bitmap;
    private _openText:egret.TextField;
    /**
     * @returns void
     * 打开赢取豪礼
     */
    private openShare():void{
        this.onTapCloss();
        this._openSBg = wmf.createBitmapByName("share-bg");
        this.addChild(this._openSBg);
        this._openSBg.touchEnabled = true;
        this._openSBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareClose,this);

        this._openText = new egret.TextField();
        this._openText.x = 320;
        this._openText.y = 471;
        this._openText.textColor = 0x000;
        this.addChild(this._openText);
        var numv = 0;
        for(var i=0;i<5;i++){
            if(wmf._cardlist[i] == 0){
                numv += 1;
            }
        }
        this._openText.text = ""+numv;
        wmf.tracking("click?out_trade="+wmf.out_trade+"&type=click-haoli");
        tracking('view status','赢取豪礼','标签9');
    }
    /**
     * @returns void
     * 关闭打开赢取豪礼
     */
    private shareClose():void{
        this.openTap();
        this.removeChild(this._openSBg);
        this.removeChild(this._openText);
    }
    private isreturn = true;

    /**
     * @returns void
     * 按钮失效
     */
    private onTapCloss():void{
        this.isreturn = false;
        this.timer2.stop();
        this._shareBtn2.touchEnabled = false;
        this._shareBtn3.touchEnabled = false;
        for(var i=0;i<5;i++){
            this.table[i].touchEnabled = false;
            this.tables[i].touchEnabled = false;
        }
    }
    /**
     * @returns void
     * 按钮开启
     */
    private openTap():void{
        this.isreturn = true;
        this.timer2.start();
        this._shareBtn2.touchEnabled = true;
        this._shareBtn3.touchEnabled = true;
        for(var i=0;i<5;i++){
            this.table[i].touchEnabled = true;
            this.tables[i].touchEnabled = true;
        }
    }
}