/**
 * 事件监听
 */
class wmfEvent extends egret.Event
{
    public static TEST_STAR:string = "test_star_event";

    public static SHAR_STAR:string = "shar_star_eveng";

    public static MUSIC_STAR:string = "music_star_event";

    public static SUB_MIT:string = "sub_mit_event";

    public static SUB_MIT_ERR:string = "sub_mit_err_event"

    public static GET_TAPE:string = "get_tape_event";
    public static GET_ERR:string = "get_err_event";
    public static GET_NONE:string = "get_none_event";

    public static TEXT_GET_TAPE:string = "text_get_type";
    public static TEXT_GET_ERR:string = "text_get_err";

    public static REST_TAPE:string = "rest_tape_event";

    public static REST_ERR:string = "rest_err_event";

    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
    }
}