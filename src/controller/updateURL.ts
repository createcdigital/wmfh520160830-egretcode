/**
 * updateURL
 * 修改
 */
class updateURL extends egret.DisplayObjectContainer{
    constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.sendUpdate,this);
    }

    private sendUpdate(){
        var isphone = document.getElementById("isphone").innerHTML;
        var openId = document.getElementById("openID").innerHTML;
        var sharID = wmf._Time;
        var sharList = String(wmf._cardlist);
        if(isphone == "true"){
            sharID = wmf._Phone;
            openId = wmf._Phone;
        }
        var params = "?share_id="+sharID+"&card_list="+sharList+"&openid="+openId;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/update"+params,egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }

    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        var data = JSON.parse(request.response);
        if(data.result == "success"){
            wmf.share = false;
            this.updateType();
        }else{
            wmf.share = false;
            this.updatetErr();
        }
    }
    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log("post error : " + event);
        this.updatetErr();
    }
    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }

    /**
     * @returns void
     * 提交成功
     */
    private updateType():void{
        var event:wmfEvent = new wmfEvent(wmfEvent.SUB_MIT);
        this.dispatchEvent(event);
    }

    private updatetErr():void{
        var event:wmfEvent = new wmfEvent(wmfEvent.SUB_MIT_ERR);
        this.dispatchEvent(event);
    }
}