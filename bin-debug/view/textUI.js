var textUI = (function (_super) {
    __extends(textUI, _super);
    function textUI() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        wmf.loadgroup = "game3";
        var loadResource = new wmf.loadResource();
        this.addChild(loadResource);
        this.addEventListener(egret.Event.ENTER_FRAME, this.stargame, this);
    }
    var d = __define,c=textUI,p=c.prototype;
    p.stargame = function () {
        if (wmf.loadgroup == wmf.loadtrue) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.stargame, this);
        }
    };
    /**
     * @returns void
     * 创建视图
     */
    p.onAddtoStage = function () {
        // var muc:musicUI = new musicUI();
        // this.addChild(muc);
        this.table();
    };
    /**
     * @returns void
     * 填写表单
     */
    p.table = function () {
        //创建表单容器
        this._tableGroup = new egret.DisplayObjectContainer();
        this.addChild(this._tableGroup);
        //创建视图
        this.bg = wmf.createBitmapByName("bg");
        this._tableBg = wmf.createBitmapByName("bg1");
        this._tableBg_1 = wmf.createBitmapByName("name");
        this._tableBtn = wmf.createBitmapByName("go");
        this._tableBg_1.x = 198;
        this._tableBg_1.y = 242;
        this._tableBtn.x = 227 + this._tableBtn.width / 2;
        this._tableBtn.y = 940 + this._tableBtn.height / 2;
        this._tableBtn.anchorOffsetX = this._tableBtn.width / 2;
        this._tableBtn.anchorOffsetY = this._tableBtn.height / 2;
        this._tableGroup.addChild(this.bg);
        this._tableGroup.addChild(this._tableBg);
        this._tableGroup.addChild(this._tableBg_1);
        this._tableGroup.addChild(this._tableBtn);
        //填写框
        this._tablePhone = new egret.TextField();
        this._tableName = new egret.TextField();
        this._tablePhone.type = this._tableName.type = egret.TextFieldType.INPUT;
        this._tablePhone.width = this._tableName.width = 300;
        this._tablePhone.height = this._tableName.height = 36;
        this._tableName.x = this._tablePhone.x = 250;
        this._tableName.y = 672;
        this._tablePhone.y = 794;
        this._tablePhone.maxChars = 11;
        this._tableName.maxChars = 8;
        this._tablePhone.textColor = this._tableName.textColor = 0x000000;
        this._tableGroup.addChild(this._tableName);
        this._tableGroup.addChild(this._tablePhone);
        this._tableBtn.touchEnabled = true;
        this._tableBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tablePost, this);
        //按钮动画
        var tw = egret.Tween.get(this._tableBtn, { loop: true });
        tw.to({ scaleX: 1.1, scaleY: 1.1 }, 500, egret.Ease.backInOut).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        this._tablePoint = new egret.TextField();
        this._tablePoint.textColor = 0xff0000;
        this._tablePoint.x = 201;
        this._tablePoint.y = 847;
        this._tableGroup.addChild(this._tablePoint);
    };
    /**
     * @returns void
     * 提交表单页面
     */
    p.tablePost = function () {
        var name = this._tableName.text;
        var phone = this._tablePhone.text;
        var partten = /^1[3,4,5,8]\d{9}$/;
        if (name == "" && phone == "") {
            this._tablePoint.text = "＊请填写你姓名和手机号";
        }
        else if (!partten.test(phone)) {
            this._tablePoint.text = "＊请输入正确的11位电话号码";
        }
        else {
            this._tableBtn.touchEnabled = false;
            var id = getUuid();
            function getUuid() {
                var len = 32; //32长度
                var radix = 16; //16进制
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length;
                if (len) {
                    for (i = 0; i < len; i++)
                        uuid[i] = chars[0 | Math.random() * radix];
                }
                else {
                    var r;
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join('');
            }
            wmf._Time = new Date().getTime() + "" + id;
            wmf._Name = name;
            wmf._Phone = phone;
            this._tablePoint.text = "＊数据正在提交，请稍后";
            this.textgetURL = new textgetURL();
            this.textgetURL.addEventListener(wmfEvent.TEXT_GET_TAPE, this.textgetType, this);
            this.textgetURL.addEventListener(wmfEvent.TEXT_GET_ERR, this.textgetErr, this);
            this.addChild(this.textgetURL);
        }
        tracking('data acquisition', 'GO', '标签3');
    };
    p.textgetType = function () {
        var isphone = document.getElementById("isphone").innerHTML;
        if (isphone == "true") {
            var url = "http://www.createcdigital.com/wmfh520160830/index.php?sharId=" + wmf.openID + "&channel=" + wmf.out_trade;
            window.location.href = url;
        }
        else {
            wmf.loadgroup = "game4";
            var loadResource = new wmf.loadResource();
            this.addChild(loadResource);
            this.addEventListener(egret.Event.ENTER_FRAME, this.stargame4, this);
        }
    };
    p.textgetErr = function () {
        this.postTable();
    };
    p.postTable = function () {
        this.postUrl = new postURL();
        this.postUrl.addEventListener(wmfEvent.SUB_MIT, this.postType, this);
        this.postUrl.addEventListener(wmfEvent.SUB_MIT_ERR, this.postErr, this);
        this._tableGroup.addChild(this.postUrl);
    };
    p.postType = function () {
        wmf.tracking("click?out_trade=" + wmf.out_trade + "&type=click-submit");
        this.postUrl.removeEventListener(wmfEvent.GET_TAPE, this.postType, this);
        this.postUrl.removeEventListener(wmfEvent.SUB_MIT_ERR, this.postErr, this);
        this._tableGroup.removeChild(this.postUrl);
        this.tableClose();
    };
    p.postErr = function () {
        this._tableBtn.touchEnabled = true;
        this.postUrl.removeEventListener(wmfEvent.GET_TAPE, this.postType, this);
        this.postUrl.removeEventListener(wmfEvent.SUB_MIT_ERR, this.postErr, this);
        this._tableGroup.removeChild(this.postUrl);
        this._tablePoint.text = "＊提交失败，请刷新页面";
    };
    p.tableClose = function () {
        this.removeChild(this._tableGroup);
        var menu = new menuUI();
        this.addChild(menu);
    };
    p.stargame4 = function () {
        if (wmf.loadgroup == wmf.loadtrue) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.stargame4, this);
            this.removeChild(this._tableGroup);
            var shareId = "?sharId=" + wmf.openID + "&channel=" + wmf.out_trade;
            shareChange(shareId);
            //打开分享页
            var share = new shareUI();
            share.shareView();
            this.addChild(share);
        }
    };
    return textUI;
}(egret.DisplayObjectContainer));
egret.registerClass(textUI,'textUI');
//# sourceMappingURL=textUI.js.map