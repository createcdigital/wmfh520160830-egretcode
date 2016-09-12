//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createView = function () {
        this.loading_bg = wmf.createBitmapByName("loading");
        this.loading_mov = wmf.createBitmapByName("loading1");
        this.textField = new egret.TextField();
        this.textField.x = 342;
        this.textField.y = 610;
        this.textField.textColor = 0x81be65;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.loading_bg);
        this.addChild(this.loading_mov);
        this.addChild(this.textField);
        this.loading_mov.anchorOffsetX = this.loading_mov.width / 2;
        this.loading_mov.anchorOffsetY = this.loading_mov.height / 2;
        this.loading_mov.x = 256 + this.loading_mov.width / 2;
        this.loading_mov.y = 452 + this.loading_mov.height / 2;
        var tw = egret.Tween.get(this.loading_mov, { loop: true });
        tw.to({ rotation: 5 }, 100).to({ rotation: 0 }, 100).to({ rotation: -5 }, 100).to({ rotation: 0 }, 100);
    };
    p.setProgress = function (current, total) {
        var num = current / total * 100;
        num = Math.floor(num);
        this.textField.text = num + "\uFF05";
    };
    return LoadingUI;
}(egret.DisplayObjectContainer));
egret.registerClass(LoadingUI,'LoadingUI');
//# sourceMappingURL=LoadingUI.js.map