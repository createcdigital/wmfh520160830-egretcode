/**
 * getURL
 * 请求获取
 */
class getURL extends egret.DisplayObjectContainer{
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
        var params = ""+wmf.sharOpenID;
        
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/wuser/get/"+params,egret.HttpMethod.GET);
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
            if(data[0].card_list == ""){
                this.resetURL = new resetURL();
                this.addChild(this.resetURL);
                this.getErr();
            }else{
                wmf._Name = data[0].name;
                wmf._cardlist = data[0].card_list.split(',');
                wmf._Time = data[0].share_id;
                this.getType();
            }
        }else{
            this.getNone();
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
     * 查询成功
     */
    private getType():void{
        var event:wmfEvent = new wmfEvent(wmfEvent.GET_TAPE);
        this.dispatchEvent(event);
    }
    private getErr(){
        var event:wmfEvent = new wmfEvent(wmfEvent.GET_ERR);
        this.dispatchEvent(event);
    }
    private getNone(){
        
       var event:wmfEvent = new wmfEvent(wmfEvent. GET_NONE);
        this.dispatchEvent(event);
    }
}