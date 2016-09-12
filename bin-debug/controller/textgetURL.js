/**
 * textgetURL
 * 提交表单页面查询用户是否存在
 */
var textgetURL = (function (_super) {
    __extends(textgetURL, _super);
    function textgetURL() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.getopenID, this);
    }
    var d = __define,c=textgetURL,p=c.prototype;
    /**
     * getopenID
     * 获取分享者的open ID
     */
    p.getopenID = function () {
        var params = "" + wmf._Phone;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/getbyphone/" + params, egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    p.onGetComplete = function (event) {
        var request = event.currentTarget;
        var data = JSON.parse(request.response);
        if (data != "") {
            if (data[0].card_list == "") {
                wmf.sharOpenID = data[0].share_id;
                this.resetURL = new resetURL();
                this.resetURL.addEventListener(wmfEvent.REST_TAPE, this.getErr, this);
                this.addChild(this.resetURL);
            }
            else {
                wmf._Name = data[0].name;
                wmf._cardlist = data[0].card_list.split(',');
                wmf._Time = data[0].share_id;
                wmf.openID = data[0].openid;
                this.newopenIdURL = new newopenIdURL();
                this.newopenIdURL.addEventListener(wmfEvent.SUB_MIT, this.getType, this);
                this.addChild(this.newopenIdURL);
            }
        }
        else {
            this.getErr();
        }
    };
    p.onGetIOError = function (event) {
        console.log("get error : " + event);
    };
    p.onGetProgress = function (event) {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    /**
     * @returns void
     * 查询成功
     */
    p.getType = function () {
        var event = new wmfEvent(wmfEvent.TEXT_GET_TAPE);
        this.dispatchEvent(event);
    };
    p.getErr = function () {
        var event = new wmfEvent(wmfEvent.TEXT_GET_ERR);
        this.dispatchEvent(event);
    };
    return textgetURL;
}(egret.DisplayObjectContainer));
egret.registerClass(textgetURL,'textgetURL');
//# sourceMappingURL=textgetURL.js.map