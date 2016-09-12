/**
 * postURL
 * 提交表单
 */
var postURL = (function (_super) {
    __extends(postURL, _super);
    function postURL() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.sendPostRequest, this);
    }
    var d = __define,c=postURL,p=c.prototype;
    /**
     * sendPostRequest
     * 提交表单
     */
    p.sendPostRequest = function () {
        var isphone = document.getElementById("isphone").innerHTML;
        var openId = wmf.openID;
        var sharID = wmf._Time;
        var name = wmf._Name;
        var phone = wmf._Phone;
        if (isphone == "true") {
            sharID = wmf._Phone;
            openId = wmf._Phone;
        }
        var params = "?share_id=" + sharID + "&name=" + name + "&phone=" + phone + "&openid=" + openId;
        //var params = "?share_id=201608311149qwsvjmmngfdx&openid=o1zitjlK5QY7rH113wDe2f96ThUtOw&name=coton_chen&phone=13564137185";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/add" + params, egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    p.onGetComplete = function (event) {
        var request = event.currentTarget;
        var data = JSON.parse(request.response);
        console.log(data);
        if (data.result == "success") {
            this.postType();
        }
        else {
            this.postErr();
        }
    };
    p.onGetIOError = function (event) {
        console.log("post error : " + event);
        this.postErr();
    };
    p.onGetProgress = function (event) {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    /**
     * @returns void
     * 提交成功
     */
    p.postType = function () {
        var event = new wmfEvent(wmfEvent.SUB_MIT);
        this.dispatchEvent(event);
    };
    p.postErr = function () {
        var event = new wmfEvent(wmfEvent.SUB_MIT_ERR);
        this.dispatchEvent(event);
    };
    return postURL;
}(egret.DisplayObjectContainer));
egret.registerClass(postURL,'postURL');
//# sourceMappingURL=postURL.js.map