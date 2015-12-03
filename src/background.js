var BackgroundLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        var windowSize = cc.winSize;

        var centerPos = cc.p(windowSize.width / 2, windowSize.height / 2);
        var spriteBackround = new cc.Sprite(res.WhiteBackground_jpg);
        spriteBackround.setPosition(centerPos);
        spriteBackround.setOpacity(50);

        this.addChild(spriteBackround);
    }
})