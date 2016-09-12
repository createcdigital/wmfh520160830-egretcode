/**
 * clickMusic
 */
var clickMusic = (function (_super) {
    __extends(clickMusic, _super);
    function clickMusic() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.starloadMusic, this);
    }
    var d = __define,c=clickMusic,p=c.prototype;
    p.starloadMusic = function () {
        //创建 URLLoader 对象
        var loader = new egret.URLLoader();
        //设置加载方式为声音
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //音频资源放在resource文件夹下
        var url = RES.getRes("tap").url;
        var request = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    };
    p.onLoadComplete = function (event) {
        var loader = event.target;
        //获取加载到的 Sound 对象
        var sound = loader.data;
        this.sound = sound;
    };
    p.starMuc = function () {
        var sound = this.sound;
        var channel = this.soundChannel;
        //使用SoundChannel播放音频
        channel = sound.play(0, 1);
        //Egret 3.0.4 新增获取音频长度 length 属性。
        //console.log(sound.length);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        //保存soundChannel对象
        this.soundChannel = channel;
    };
    p.onSoundComplete = function (event) {
        //console.log("onSoundComplete");
    };
    return clickMusic;
}(egret.DisplayObjectContainer));
egret.registerClass(clickMusic,'clickMusic');
//# sourceMappingURL=clickMusic.js.map