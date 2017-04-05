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
        //this.removeChild(this.comeUI);
        // modify coton
        // Adam决定删除掉填写表单的页面
        // this.textUI = new textUI();
        // this.addChild(this.textUI);
        this.tablePost();
        // var muc:musicUI = new musicUI();
        // this.addChild(muc);
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
        // var muc:musicUI = new musicUI();
        // this.addChild(muc);
    };
    /**
     * @returns void
     * 提交表单页面
     */
    p.tablePost = function () {
        var debug_user = getDebugUser();
        //var debug_user = {user: "james", phone: "13564139999"};
        var name = debug_user.user;
        var phone = debug_user.phone;
        var partten = /^1[3,4,5,8]\d{9}$/;
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
        this.textgetURL = new textgetURL();
        this.textgetURL.addEventListener(wmfEvent.TEXT_GET_TAPE, this.textgetType, this);
        this.textgetURL.addEventListener(wmfEvent.TEXT_GET_ERR, this.textgetErr, this);
        this.addChild(this.textgetURL);
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
        this.addChild(this.postUrl);
    };
    p.postType = function () {
        wmf.tracking("click?out_trade=" + wmf.out_trade + "&type=click-submit");
        this.postUrl.removeEventListener(wmfEvent.GET_TAPE, this.postType, this);
        this.postUrl.removeEventListener(wmfEvent.SUB_MIT_ERR, this.postErr, this);
        this.removeChild(this.postUrl);
        this.tableClose();
    };
    p.postErr = function () {
        this.postUrl.removeEventListener(wmfEvent.GET_TAPE, this.postType, this);
        this.postUrl.removeEventListener(wmfEvent.SUB_MIT_ERR, this.postErr, this);
        this.removeChild(this.postUrl);
    };
    p.tableClose = function () {
        var menu = new menuUI();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.stargame4, this);
        this.removeChild(this.comeUI);
        this.addChild(menu);
    };
    p.stargame4 = function () {
        if (wmf.loadgroup == wmf.loadtrue) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.stargame4, this);
            this.removeChild(this.comeUI);
            var shareId = "?sharId=" + wmf.openID + "&channel=" + wmf.out_trade;
            shareChange(shareId);
            //打开分享页
            var share = new shareUI();
            share.shareView();
            this.addChild(share);
        }
    };
    return Controller;
}(egret.DisplayObjectContainer));
egret.registerClass(Controller,'Controller');
//# sourceMappingURL=Controller.js.map