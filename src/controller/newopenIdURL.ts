/**
 * newopenIdURL
 */
class newopenIdURL extends egret.DisplayObjectContainer{
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.getopenID,this);
    }

    private request;
    private data;
    /**
     * getopenID
     * 获取分享者的open ID
     */
    private getopenID() {
        var isphone = document.getElementById("isphone").innerHTML;
        var openId = document.getElementById("openID").innerHTML;
        
        if(isphone == "true"){
            openId = wmf.openID;
            
        }else{
            wmf.openID = openId;
        }
        wmf.sharOpenID = openId;
        
        var params = "?phone="+wmf._Phone+"&openid="+ openId;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/upopenid"+params,egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    
    }
    private resetURL:resetURL;
    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        var data = JSON.parse(request.response);
        if(data != ""){
            this.postType();
        }
        
    }
    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log("get error : " + event);
    }
    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }

    /**
     * @returns void
     * 更新成功
     */
    private postType():void{
        var event:wmfEvent = new wmfEvent(wmfEvent.SUB_MIT);
        this.dispatchEvent(event);
    }
}