/**
 * resetURL
 * 重置
 */
class resetURL extends egret.DisplayObjectContainer{
    constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.sendUpdate,this);
    }

    private sendUpdate(){
        var params = ""+wmf.sharOpenID;
        // var params = "?share_id=201608311149qwsvjmmngfdx&card_list=1,0,0,0,0&openid=o1zitjlK5QY7rH113wDe2f96ThUtOw";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/reset/"+params,egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }

    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        var data = JSON.parse(request.response);
        
        if(data.result == "success"){
            wmf.sharOpenID = wmf.openID;
            this.updateType();
        }else if(data.result == "not found openid"){
            this.updateType();
        }else{
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
     * 重置成功
     */
    private updateType():void{
        var event:wmfEvent = new wmfEvent(wmfEvent.REST_TAPE);
        this.dispatchEvent(event);
    }

    private updatetErr():void{
        var event:wmfEvent = new wmfEvent(wmfEvent.REST_ERR);
        this.dispatchEvent(event);
    }
}