/**
 * musicUI
 * 音乐播放按钮
 */
var musicUI = (function (_super) {
    __extends(musicUI, _super);
    function musicUI() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.startLoad, this);
    }
    var d = __define,c=musicUI,p=c.prototype;
    p.startLoad = function () {
        //创建 URLLoader 对象
        var loader = new egret.URLLoader();
        //设置加载方式为声音
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //音频资源放在resource文件夹下
        var url = RES.getRes("mp3").url;
        var request = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    };
    /**
     * @returns void
     * 创建视图
     */
    p.onLoadComplete = function (event) {
        var loader = event.target;
        //获取加载到的 Sound 对象
        var sound = loader.data;
        this.sound = sound;
        //一个简单的播放按钮
        this._muc = wmf.createBitmapByName("music");
        this._muc.anchorOffsetX = this._muc.width / 2;
        this._muc.x = 685.5;
        this._muc.anchorOffsetY = this._muc.height / 2;
        this._muc.y = 43.5;
        this.addChild(this._muc);
        //监听按钮的触摸事件
        this._muc.touchEnabled = true;
        this._muc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.starMuc, this);
        this.starMuc();
    };
    p.round = function () {
        this._muc.rotation += 3;
    };
    p.starMuc = function () {
        var sound = this.sound;
        var channel = this.soundChannel;
        var tw = egret.Tween.get(this._muc);
        if (channel) {
            //调用soundChannel对象的stop方法停止播放音频
            //console.log(channel);
            channel.stop();
            this.soundChannel = null;
            this._muc.rotation = 0;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.round, this);
            return;
        }
        //旋转
        this._muc.rotation = 15;
        this.addEventListener(egret.Event.ENTER_FRAME, this.round, this);
        //使用SoundChannel播放音频
        channel = sound.play(0, -1);
        //Egret 3.0.4 新增获取音频长度 length 属性。
        //console.log(sound.length);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        //保存soundChannel对象
        this.soundChannel = channel;
    };
    p.onSoundComplete = function (event) {
        //console.log("onSoundComplete");
    };
    return musicUI;
}(egret.DisplayObjectContainer));
egret.registerClass(musicUI,'musicUI');
//# sourceMappingURL=musicUI.js.map