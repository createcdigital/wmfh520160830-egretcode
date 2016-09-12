module wmf {
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    export function createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 根据name关键字创建一个Movieclip对象。
     * */
    export function createMovieclip(name:string){
        var data = RES.getRes(name+"_json");
        var texture = RES.getRes(name+"_png");
        //创建动画工厂
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        //创建 MovieClip，将工厂生成的 MovieClipData 传入参数
        var mc:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData(name));
        return mc;
    }

    /**
     * tracking统计
     * */
    export function tracking(msg){
        var params = msg;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/track/"+params,egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,function(event:egret.Event){
            var request = <egret.HttpRequest>event.currentTarget;
        },this);
    }

    export class shareFor{
        public callEgretMethod(msg:string):void {
            var params = "share?"+msg+"&out_trade="+egret.getOption("channel");
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open("http://wmfh5apislb.createcdigital.com/track/"+params,egret.HttpMethod.GET);
            request.send();
            request.addEventListener(egret.Event.COMPLETE,function(event:egret.Event){
                var request = <egret.HttpRequest>event.currentTarget;
            },this);
        }
    }

    export class loadResource extends egret.DisplayObjectContainer{
        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage(event:egret.Event) {
            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup(wmf.loadgroup);
        }

        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        private onResourceLoadComplete(event:RES.ResourceEvent):void {
            if (event.groupName == wmf.loadgroup) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                wmf.loadtrue = wmf.loadgroup;
            }
        }

        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private onItemLoadError(event:RES.ResourceEvent):void {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }

        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private onResourceLoadError(event:RES.ResourceEvent):void {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        }
    }
    
    /**
    * 加载页面
    *  The resource group loading failed
    */
    export class loadSource extends egret.DisplayObjectContainer{

        /**
         * 加载进度界面
         * Process interface loading
         */
        private loadingView:LoadingUI;

        public constructor() {
            super();
            //设置加载进度界面
            //Config to load process interface
            this.loadingView = new LoadingUI();
            this.addChild(this.loadingView);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage(event:egret.Event) {
            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup(wmf.loadgroup);
        }

        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        private onResourceLoadComplete(event:RES.ResourceEvent):void {
            if (event.groupName == wmf.loadgroup) {
                this.removeChild(this.loadingView);
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                wmf.loadtrue = wmf.loadgroup;
            }
        }

        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private onItemLoadError(event:RES.ResourceEvent):void {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }

        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private onResourceLoadError(event:RES.ResourceEvent):void {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        }
        /**
         * preload资源组加载进度
         * Loading process of preload resource group
         */
        private onResourceProgress(event:RES.ResourceEvent):void {
            if (event.groupName == wmf.loadgroup) {
                this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
            }
        }
    }
}