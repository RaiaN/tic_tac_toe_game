var GameScreenLayer = cc.Layer.extend({
    CELLS_PER_SIDE : 4,
    STATUS_BAR_HEIGHT : 60,
    X_MARGIN : 20,
    Y_MARGIN : 20,

    ctor: function() {
        this._super();

        var windowSize = cc.winSize;
        var cellWidth = windowSize.width / this.CELLS_PER_SIDE;
        var cellHeight = (windowSize.height - this.STATUS_BAR_HEIGHT) / this.CELLS_PER_SIDE;
        var cellSize = cc.size(cellWidth, cellHeight);

        var cellTrueWidth = cellSize.width - this.X_MARGIN / 2;
        var cellTrueHeight = cellSize.height - this.Y_MARGIN / 2;
        var cellSizeWithMargins = cc.size(cellTrueWidth, cellTrueHeight);

        var fieldLayer = new cc.Node();
        fieldLayer.setContentSize(cc.size(windowSize.width, windowSize.height - this.STATUS_BAR_HEIGHT));
        fieldLayer.setAnchorPoint(cc.p(0, 0));

        for (var row = 0; row < this.CELLS_PER_SIDE; ++row) {
            for (var col = 0; col < this.CELLS_PER_SIDE; ++col) {
                var xPos = this.X_MARGIN / 4 + col * cellWidth;
                var yPos = this.Y_MARGIN / 4 + (this.CELLS_PER_SIDE - row - 1) * cellHeight;

                var cell = new Cell(cc.p(xPos, yPos), cellSizeWithMargins);
                fieldLayer.addChild(cell);
            }
        }

        this.addChild(fieldLayer);
        return true;
    }
});



var GameScreenScene = cc.Scene.extend({
   onEnter: function() {
       this._super();

       //TODO: Add backround layer before again!
       this.addChild(new BackgroundLayer());
       this.addChild(new GameScreenLayer());
   }
});