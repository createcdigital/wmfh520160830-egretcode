var wmf;
(function (wmf) {
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    wmf.createBitmapByName = createBitmapByName;
    /**
     * 根据name关键字创建一个Movieclip对象。
     * */
    function createMovieclip(name) {
        var data = RES.getRes(name + "_json");
        var texture = RES.getRes(name + "_png");
        //创建动画工厂
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        //创建 MovieClip，将工厂生成的 MovieClipData 传入参数
        var mc = new egret.MovieClip(mcDataFactory.generateMovieClipData(name));
        return mc;
    }
    wmf.createMovieclip = createMovieclip;
    /**
     * tracking统计
     * */
    function tracking(msg) {
        var params = msg;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://wmfh5apislb.createcdigital.com/track/" + params, egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, function (event) {
            var request = event.currentTarget;
        }, this);
    }
    wmf.tracking = tracking;
    var shareFor = (function () {
        function shareFor() {
        }
        var d = __define,c=shareFor,p=c.prototype;
        p.callEgretMethod = function (msg) {
            var params = "share?" + msg + "&out_trade=" + egret.getOption("channel");
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open("http://wmfh5apislb.createcdigital.com/track/" + params, egret.HttpMethod.GET);
            request.send();
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
            }, this);
        };
        return shareFor;
    }());
    wmf.shareFor = shareFor;
    egret.registerClass(shareFor,'wmf.shareFor');
    var loadResource = (function (_super) {
        __extends(loadResource, _super);
        function loadResource() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=loadResource,p=c.prototype;
        p.onAddToStage = function (event) {
            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup(wmf.loadgroup);
        };
        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        p.onResourceLoadComplete = function (event) {
            if (event.groupName == wmf.loadgroup) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                wmf.loadtrue = wmf.loadgroup;
            }
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        p.onItemLoadError = function (event) {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        p.onResourceLoadError = function (event) {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        };
        return loadResource;
    }(egret.DisplayObjectContainer));
    wmf.loadResource = loadResource;
    egret.registerClass(loadResource,'wmf.loadResource');
    /**
    * 加载页面
    *  The resource group loading failed
    */
    var loadSource = (function (_super) {
        __extends(loadSource, _super);
        function loadSource() {
            _super.call(this);
            //设置加载进度界面
            //Config to load process interface
            this.loadingView = new LoadingUI();
            this.addChild(this.loadingView);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=loadSource,p=c.prototype;
        p.onAddToStage = function (event) {
            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup(wmf.loadgroup);
        };
        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        p.onResourceLoadComplete = function (event) {
            if (event.groupName == wmf.loadgroup) {
                this.removeChild(this.loadingView);
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                wmf.loadtrue = wmf.loadgroup;
            }
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        p.onItemLoadError = function (event) {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        p.onResourceLoadError = function (event) {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        };
        /**
         * preload资源组加载进度
         * Loading process of preload resource group
         */
        p.onResourceProgress = function (event) {
            if (event.groupName == wmf.loadgroup) {
                this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
            }
        };
        return loadSource;
    }(egret.DisplayObjectContainer));
    wmf.loadSource = loadSource;
    egret.registerClass(loadSource,'wmf.loadSource');
})(wmf || (wmf = {}));
//# sourceMappingURL=Util.js.map