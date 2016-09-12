module wmf{
    /**
     * Data
     * 姓名
     */
    export var _Name:string;     //姓名
    /**
     * Data
     * 电话
     */
    export var _Phone:string;    //电话
    /**
     * Data
     * 选择的卡片
     */
    export var _Card:string;     //选择的卡片
    /**
     * Data
     * 选择的卡片的序号
     */
    export var _CardNum:number;
    /**
     * Data
     * 时间标记
     */
    export var _Time;
    /**
     * Data
     * 卡片数组
     */
    export var _cardArr:string[][] = [
        ["three-3-1","three-4-1"],
        ["three-3-2","three-4-2"],
        ["three-3-3","three-4-3"],
        ["three-3-4","three-4-4"],
        ["three-3-5","three-4-5"]
    ];
    /**
     * Data
     * 卡片弹出层数组
     */
    export var _cardAlert:string[] = ["two-4-1","two-4-2","two-4-3","two-4-4","two-4-5"]
    /**
     * Data
     * 卡片选择列表
     */
    export var _cardlist:number[] = [0,0,0,0,0];
    /**
     * Data
     * 带手图片坐标列表
     */
    export var _cardXY:number[][]= [[558,578],[0,169],[170,0],[0,636],[592,110]];
    /**
     * Data
     * 我要请客图片坐标列表
     */
    export var _card1XY:number[][]= [[635,799],[60,342],[350,41],[60,775],[646,323]];
    /**
     * Data
     * 是否为分享打开页面
     */
    export var share = false;
    /**
     * Data
     * 请求结果
     */
    export var _submit = false;
    /**
     * Data
     * 打开页面人的openID
     */
    export var openID:string;
    /**
     * Data
     * 分享者的open ID
     */
    export var sharOpenID:string;
    /**
     * Data
     * 分享渠道
     */
    export var out_trade;

    export var loadgroup:string;
    export var loadtrue:string;
}
