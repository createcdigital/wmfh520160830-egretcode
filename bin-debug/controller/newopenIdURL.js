/**
 * newopenIdURL
 */
var newopenIdURL = (function (_super) {
    __extends(newopenIdURL, _super);
    function newopenIdURL() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.getopenID, this);
    }
    var d = __define,c=newopenIdURL,p=c.prototype;
    /**
     * getopenID
     * 获取分享者的open ID
     */
    p.getopenID = function () {
        var isphone = document.getElementById("isphone").innerHTML;
        var openId = document.getElementById("openID").innerHTML;
        if (isphone == "true") {
            openId = wmf.openID;
        }
        else {
            wmf.openID = openId;
        }
        wmf.sharOpenID = openId;
        var params = "?phone=" + wmf._Phone + "&openid=" + openId;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/upopenid" + params, egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    p.onGetComplete = function (event) {
        var request = event.currentTarget;
        var data = JSON.parse(request.response);
        if (data != "") {
            this.postType();
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
     * 更新成功
     */
    p.postType = function () {
        var event = new wmfEvent(wmfEvent.SUB_MIT);
        this.dispatchEvent(event);
    };
    return newopenIdURL;
}(egret.DisplayObjectContainer));
egret.registerClass(newopenIdURL,'newopenIdURL');
//# sourceMappingURL=newopenIdURL.js.map