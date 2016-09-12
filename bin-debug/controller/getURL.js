/**
 * getURL
 * 请求获取
 */
var getURL = (function (_super) {
    __extends(getURL, _super);
    function getURL() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.getopenID, this);
    }
    var d = __define,c=getURL,p=c.prototype;
    /**
     * getopenID
     * 获取分享者的open ID
     */
    p.getopenID = function () {
        var params = "" + wmf.sharOpenID;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/get/" + params, egret.HttpMethod.GET);
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
                this.resetURL = new resetURL();
                this.addChild(this.resetURL);
                this.getErr();
            }
            else {
                wmf._Name = data[0].name;
                wmf._cardlist = data[0].card_list.split(',');
                wmf._Time = data[0].share_id;
                this.getType();
            }
        }
        else {
            this.getNone();
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
        var event = new wmfEvent(wmfEvent.GET_TAPE);
        this.dispatchEvent(event);
    };
    p.getErr = function () {
        var event = new wmfEvent(wmfEvent.GET_ERR);
        this.dispatchEvent(event);
    };
    p.getNone = function () {
        var event = new wmfEvent(wmfEvent.GET_NONE);
        this.dispatchEvent(event);
    };
    return getURL;
}(egret.DisplayObjectContainer));
egret.registerClass(getURL,'getURL');
//# sourceMappingURL=getURL.js.map