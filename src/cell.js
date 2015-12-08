var CellView = cc.Layer.extend({
    coord : null,
    position : null,
    size : null,
    colorLayer : null,

    ctor: function (coord, pos, cellSize) {
        this._super();
        this.coord = coord;
        this.position = pos;
        this.size = cellSize;

        this.colorLayer = new cc.LayerColor();
        this.colorLayer.setContentSize(cellSize);
        this.colorLayer.setAnchorPoint(cc.p(0,0));
        this.colorLayer.setPosition(pos);
        this.colorLayer.setColor(cc.color.GREEN);

        var label = new cc.LabelTTF("OK", "Arial", 25);
        label.setAnchorPoint(cc.p(0.5, 0.5));
        label.setPosition(cc.p(cellSize.width / 2, cellSize.height / 2));
        label.setColor(cc.color.BLUE);

        this.colorLayer.addChild(label);
        this.addChild(this.colorLayer);
    },

    getXPos: function() {
        return this.position.x;
    },

    getYPos : function() {
        return this.position.y;
    },

    updateCellView: function(computerTurn) {
        this.changeCellColorLayer(computerTurn);
    },

    changeCellColorLayer: function(computerTurn) {
        this.colorLayer.setColor(computerTurn ? cc.color.WHITE : cc.color.YELLOW);
    }
});