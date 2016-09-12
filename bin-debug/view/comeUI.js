var comeUI = (function (_super) {
    __extends(comeUI, _super);
    function comeUI() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }
    var d = __define,c=comeUI,p=c.prototype;
    p.stargame = function () {
        if (wmf.loadgroup == wmf.loadtrue) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.stargame, this);
        }
    };
    /**
     * @returns void
     * 判断用户
     */
    p.onAddtoStage = function () {
        var sharId = egret.getOption("sharId");
        var isphone = document.getElementById("isphone").innerHTML;
        if (isphone !== "true") {
            wmf.openID = document.getElementById("openID").innerHTML;
            if (sharId !== null && sharId !== "") {
                wmf.sharOpenID = sharId;
            }
            else {
                wmf.sharOpenID = wmf.openID;
            }
            this.getUrl = new getURL();
            this.getUrl.addEventListener(wmfEvent.GET_TAPE, this.getType, this);
            this.getUrl.addEventListener(wmfEvent.GET_ERR, this.getErr, this);
            this.getUrl.addEventListener(wmfEvent.GET_NONE, this.getNone, this);
            this.addChild(this.getUrl);
        }
        else {
            wmf.openID = sharId;
            if (sharId !== null && sharId !== "") {
                wmf.sharOpenID = sharId;
                var shares = "?sharId=" + sharId + "&channel=" + wmf.out_trade;
                shareChange(shares);
                this.getUrl = new getURL();
                this.getUrl.addEventListener(wmfEvent.GET_TAPE, this.getType, this);
                this.getUrl.addEventListener(wmfEvent.GET_ERR, this.getErr, this);
                this.getUrl.addEventListener(wmfEvent.GET_NONE, this.getErr, this);
                this.addChild(this.getUrl);
            }
            else {
                this.getErr();
            }
        }
    };
    p.getType = function () {
        var shares = "?sharId=" + wmf.sharOpenID + "&channel=" + wmf.out_trade;
        shareChange(shares);
        this.getUrl.removeEventListener(wmfEvent.GET_TAPE, this.getType, this);
        this.removeChild(this.getUrl);
        if (wmf.openID !== wmf.sharOpenID) {
            wmf.share = true;
        }
        wmf.loadgroup = "game5";
        var loadSource = new wmf.loadSource();
        this.addChild(loadSource);
        this.addEventListener(egret.Event.ENTER_FRAME, this.stargame4, this);
    };
    p.stargame4 = function () {
        if (wmf.loadgroup == wmf.loadtrue) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.stargame4, this);
            this.starShar();
        }
    };
    p.getErr = function () {
        wmf.loadgroup = "game1";
        var loadSource = new wmf.loadSource();
        this.addChild(loadSource);
        this.addEventListener(egret.Event.ENTER_FRAME, this.stargameg, this);
    };
    p.stargameg = function () {
        if (wmf.loadgroup == wmf.loadtrue) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.stargameg, this);
            var shares = "?channel=" + wmf.out_trade;
            shareChange(shares);
            this.creatView();
        }
    };
    /**
     * @returns void
     * 查询为空
     */
    p.getNone = function () {
        if (wmf.openID == wmf.sharOpenID) {
            this.getErr();
        }
        else {
            wmf.sharOpenID = wmf.openID;
            this.getUrl = new getURL();
            this.getUrl.addEventListener(wmfEvent.GET_TAPE, this.getType, this);
            this.getUrl.addEventListener(wmfEvent.GET_ERR, this.getErr, this);
            this.getUrl.addEventListener(wmfEvent.GET_NONE, this.getNone, this);
            this.addChild(this.getUrl);
        }
    };
    /**
     * @returns void
     * 创建视图
     */
    p.creatView = function () {
        this._comeBg = wmf.createBitmapByName("first-1"); //欢迎界面背景
        this._comeBtn = wmf.createBitmapByName("go"); //欢迎界面按钮
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
        var tw = egret.Tween.get(this._comeText);
        tw.to({ x: 43 }, 1000);
        var tw = egret.Tween.get(this._comeBtn, { loop: true });
        tw.to({ scaleX: 1.1, scaleY: 1.1 }, 500, egret.Ease.backInOut).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        this._floopBtn.touchEnabled = true;
        this._comeBtn.touchEnabled = true;
        this._floopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createFlo, this);
        this._comeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
        wmf.loadgroup = "game2";
        var loadResource = new wmf.loadResource();
        this.addChild(loadResource);
        this.addEventListener(egret.Event.ENTER_FRAME, this.stargame, this);
    };
    /**
     * 游戏规则页面
     * @returns void
     */
    p.createFlo = function () {
        this._floopBtn.touchEnabled = false;
        this._comeBtn.touchEnabled = false;
        this._floGroup = new egret.DisplayObjectContainer(); //容器
        this.addChild(this._floGroup);
        this._floBg = wmf.createBitmapByName("bg1"); //活动机制背景
        this._floText = wmf.createBitmapByName("first-4"); //活动机制说明
        this._floBgBtn = wmf.createBitmapByName("go"); //立即行动
        this._floText.x = 128;
        this._floText.y = 242;
        this._floBgBtn.x = 222 + this._floBgBtn.width / 2;
        this._floBgBtn.y = 919 + this._floBgBtn.height / 2;
        this._floBgBtn.anchorOffsetX = this._floBgBtn.width / 2;
        this._floBgBtn.anchorOffsetY = this._floBgBtn.height / 2;
        this._floGroup.addChild(this._floBg);
        this._floGroup.addChild(this._floText);
        this._floGroup.addChild(this._floBgBtn);
        var tw = egret.Tween.get(this._floBgBtn, { loop: true });
        tw.to({ scaleX: 1.1, scaleY: 1.1 }, 500, egret.Ease.backInOut).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        this._floBg.touchEnabled = true;
        this._floBgBtn.touchEnabled = true;
        this._floBgBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jizhistar, this);
        this._floBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closs, this);
    };
    /**
     * @returns void
     * 关闭规则页面
     */
    p.closs = function () {
        this._floBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closs, this);
        this.removeChild(this._floGroup);
        this._floopBtn.touchEnabled = true;
        this._comeBtn.touchEnabled = true;
    };
    /**
     * @returns void
     * 开始测试
     */
    p.start = function () {
        this.testStar();
        tracking('Cover Page', 'GO', '标签1');
        wmf.tracking("click?out_trade=" + wmf.out_trade + "&type=click-startgame");
    };
    p.jizhistar = function () {
        this.testStar();
        tracking('活动机制', 'GO', '标签2');
        wmf.tracking("click?out_trade=" + wmf.out_trade + "&type=click-jzstartgame");
    };
    /**
     * @returns void
     * 测试打开监听
     */
    p.testStar = function () {
        var event = new wmfEvent(wmfEvent.TEST_STAR);
        this.dispatchEvent(event);
    };
    /**
     * @returns void
     * 分享打开监听
     */
    p.starShar = function () {
        var event = new wmfEvent(wmfEvent.SHAR_STAR);
        this.dispatchEvent(event);
    };
    return comeUI;
}(egret.DisplayObjectContainer));
egret.registerClass(comeUI,'comeUI');
//# sourceMappingURL=comeUI.js.map