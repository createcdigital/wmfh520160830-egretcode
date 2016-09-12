/**
 * resetURL
 * 重置
 */
var resetURL = (function (_super) {
    __extends(resetURL, _super);
    function resetURL() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.sendUpdate, this);
    }
    var d = __define,c=resetURL,p=c.prototype;
    p.sendUpdate = function () {
        var params = "" + wmf.sharOpenID;
        // var params = "?share_id=201608311149qwsvjmmngfdx&card_list=1,0,0,0,0&openid=o1zitjlK5QY7rH113wDe2f96ThUtOw";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/reset/" + params, egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    p.onGetComplete = function (event) {
        var request = event.currentTarget;
        var data = JSON.parse(request.response);
        if (data.result == "success") {
            wmf.sharOpenID = wmf.openID;
            this.updateType();
        }
        else if (data.result == "not found openid") {
            this.updateType();
        }
        else {
            this.updatetErr();
        }
    };
    p.onGetIOError = function (event) {
        console.log("post error : " + event);
        this.updatetErr();
    };
    p.onGetProgress = function (event) {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    /**
     * @returns void
     * 重置成功
     */
    p.updateType = function () {
        var event = new wmfEvent(wmfEvent.REST_TAPE);
        this.dispatchEvent(event);
    };
    p.updatetErr = function () {
        var event = new wmfEvent(wmfEvent.REST_ERR);
        this.dispatchEvent(event);
    };
    return resetURL;
}(egret.DisplayObjectContainer));
egret.registerClass(resetURL,'resetURL');
//# sourceMappingURL=resetURL.js.map