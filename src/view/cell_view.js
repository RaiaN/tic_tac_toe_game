var CellView = cc.Layer.extend({
    coord : null,
    position : null,
    cellSize : null,
    cellLayer : null,
    colorLayer : null,

    xSprite : null,
    oSprite : null,
    xSpriteScale : null,
    oSpriteScale : null,

    X_LAYER_IND : 1,
    O_LAYER_IND : 2,

    ctor: function (coord, pos, cellSize) {
        this._super();
        this.coord = coord;
        this.position = pos;
        this.cellSize = cellSize;

        this.colorLayer = new cc.LayerColor();
        this.xSprite = new cc.Sprite(res.X_png);
        this.oSprite = new cc.Sprite(res.O_png);
        this.cellLayer = new cc.LayerMultiplex([this.colorLayer, this.xSprite, this.oSprite]);
        this.init();

        this.addChild(this.cellLayer);
    },

    init: function() {
        this.colorLayer.setContentSize(this.cellSize);
        this.colorLayer.setColor(cc.color.GREEN);

        this.xSprite.setAnchorPoint(cc.p(0,0));
        this.xSprite.setPosition(cc.p(0,0));
        this.oSprite.setAnchorPoint(cc.p(0,0));
        this.oSprite.setPosition(cc.p(0,0));

        this.cellLayer.setContentSize(this.cellSize);
        this.cellLayer.setAnchorPoint(cc.p(0,0));
        this.cellLayer.setPosition(this.position);

        this.xSpriteScale = this.calcSpriteScale(this.xSprite);
        this.oSpriteScale = this.calcSpriteScale(this.oSprite);
    },

    calcSpriteScale: function(sprite) {
        var spriteSize = sprite.getContentSize();
        var xScale = this.cellSize.width / spriteSize.width;
        var yScale = this.cellSize.height / spriteSize.height;
        sprite.setScale(xScale, yScale);
        return {xScale: xScale, yScale: yScale}
    },

    getXPos: function() {
        return this.position.x;
    },

    getYPos : function() {
        return this.position.y;
    },

    updateCellView: function(computerTurn, playerForX) {
        var inds = [this.X_LAYER_IND, this.O_LAYER_IND];
        this.cellLayer.switchTo(inds[computerTurn == playerForX ? 1 : 0]);
    },

    resetColorLayer: function(color) {
        this.cellLayer.setColor(color);
    }
});