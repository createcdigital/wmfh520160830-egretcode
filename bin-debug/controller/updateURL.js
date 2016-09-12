/**
 * updateURL
 * 修改
 */
var updateURL = (function (_super) {
    __extends(updateURL, _super);
    function updateURL() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.sendUpdate, this);
    }
    var d = __define,c=updateURL,p=c.prototype;
    p.sendUpdate = function () {
        var isphone = document.getElementById("isphone").innerHTML;
        var openId = document.getElementById("openID").innerHTML;
        var sharID = wmf._Time;
        var sharList = String(wmf._cardlist);
        if (isphone == "true") {
            sharID = wmf._Phone;
            openId = wmf._Phone;
        }
        var params = "?share_id=" + sharID + "&card_list=" + sharList + "&openid=" + openId;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/update" + params, egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    p.onGetComplete = function (event) {
        var request = event.currentTarget;
        var data = JSON.parse(request.response);
        if (data.result == "success") {
            wmf.share = false;
            this.updateType();
        }
        else {
            wmf.share = false;
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
     * 提交成功
     */
    p.updateType = function () {
        var event = new wmfEvent(wmfEvent.SUB_MIT);
        this.dispatchEvent(event);
    };
    p.updatetErr = function () {
        var event = new wmfEvent(wmfEvent.SUB_MIT_ERR);
        this.dispatchEvent(event);
    };
    return updateURL;
}(egret.DisplayObjectContainer));
egret.registerClass(updateURL,'updateURL');
//# sourceMappingURL=updateURL.js.map