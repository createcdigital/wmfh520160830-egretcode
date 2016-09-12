/**
 * clickMusic
 */
class clickMusic extends egret.DisplayObjectContainer{
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.starloadMusic,this);
    }

    private starloadMusic(){
        //创建 URLLoader 对象
        var loader:egret.URLLoader = new egret.URLLoader();
        //设置加载方式为声音
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //音频资源放在resource文件夹下
        var url:string = RES.getRes("tap").url;
        
        var request:egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    }

    private sound:egret.Sound;
    private soundChannel:egret.SoundChannel;
    private onLoadComplete(event:egret.Event):void{
        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        //获取加载到的 Sound 对象
        var sound:egret.Sound = <egret.Sound>loader.data;
        this.sound = sound;
    }
    public starMuc():void{
        var sound = this.sound;
        var channel:egret.SoundChannel = this.soundChannel;
        //使用SoundChannel播放音频
        channel = sound.play(0,1);
        //Egret 3.0.4 新增获取音频长度 length 属性。
        //console.log(sound.length);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        //保存soundChannel对象
        this.soundChannel = channel;
    }
    private onSoundComplete(event:egret.Event):void {
        //console.log("onSoundComplete");
    }
}