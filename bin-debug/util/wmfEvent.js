/**
 * 事件监听
 */
var wmfEvent = (function (_super) {
    __extends(wmfEvent, _super);
    function wmfEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=wmfEvent,p=c.prototype;
    wmfEvent.TEST_STAR = "test_star_event";
    wmfEvent.SHAR_STAR = "shar_star_eveng";
    wmfEvent.MUSIC_STAR = "music_star_event";
    wmfEvent.SUB_MIT = "sub_mit_event";
    wmfEvent.SUB_MIT_ERR = "sub_mit_err_event";
    wmfEvent.GET_TAPE = "get_tape_event";
    wmfEvent.GET_ERR = "get_err_event";
    wmfEvent.GET_NONE = "get_none_event";
    wmfEvent.TEXT_GET_TAPE = "text_get_type";
    wmfEvent.TEXT_GET_ERR = "text_get_err";
    wmfEvent.REST_TAPE = "rest_tape_event";
    wmfEvent.REST_ERR = "rest_err_event";
    return wmfEvent;
}(egret.Event));
egret.registerClass(wmfEvent,'wmfEvent');
//# sourceMappingURL=wmfEvent.js.map