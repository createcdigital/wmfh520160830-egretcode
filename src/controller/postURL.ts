/**
 * postURL
 * 提交表单
 */
class postURL extends egret.DisplayObjectContainer{
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.sendPostRequest,this);
    }

    private request;
    private data;
    /**
     * sendPostRequest
     * 提交表单
     */
    private sendPostRequest() {
        var isphone = document.getElementById("isphone").innerHTML;
        var openId = wmf.openID;
        var sharID = wmf._Time;
        var name = wmf._Name;
        var phone = wmf._Phone;
        if(isphone == "true"){
            sharID = wmf._Phone;
            openId = wmf._Phone;
        }
        var params = "?share_id="+sharID+"&name="+name+"&phone="+phone+"&openid="+openId;
        
        //var params = "?share_id=201608311149qwsvjmmngfdx&openid=o1zitjlK5QY7rH113wDe2f96ThUtOw&name=coton_chen&phone=13564137185";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/add"+params,egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }

    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        var data = JSON.parse(request.response);
        console.log(data);
        
        if(data.result == "success"){
            this.postType();
        }else{
            this.postErr();
        }
    }
    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log("post error : " + event);
        this.postErr();
    }
    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }

    /**
     * @returns void
     * 提交成功
     */
    private postType():void{
        var event:wmfEvent = new wmfEvent(wmfEvent.SUB_MIT);
        this.dispatchEvent(event);
    }

    private postErr():void{
        var event:wmfEvent = new wmfEvent(wmfEvent.SUB_MIT_ERR);
        this.dispatchEvent(event);
    }
}