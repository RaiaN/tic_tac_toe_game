var Cell = cc.Layer.extend({
    ctor: function (pos, cellSize) {
        this._super();

        var cellColorLayer = new cc.LayerColor();
        cellColorLayer.setContentSize(cellSize);
        cellColorLayer.setAnchorPoint(cc.p(0,0));
        cellColorLayer.setPosition(pos);
        cellColorLayer.setColor(cc.color.GREEN);

        var label = new cc.LabelTTF("OK", "Arial", 25);
        label.setAnchorPoint(cc.p(0.5,0.5));
        label.setPosition(cc.p(cellSize.width / 2, cellSize.height / 2));
        label.setColor(cc.color.BLUE);

        cellColorLayer.addChild(label);
        this.addChild(cellColorLayer);
    }
});