var FieldLayer = cc.Node.extend({
    gridModel : null,
    fieldLayer : null,

    cellSize : null,
    cellSizeWithMargins : null,

    ctor: function(gridModel) {
        this._super();
        this.gridModel = gridModel;

        var windowSize = cc.winSize;
        var contentSize = cc.size(windowSize.width, windowSize.height - Game.STATUS_BAR_HEIGHT);

        var cellWidth = contentSize.width / Game.CELLS_PER_SIDE;
        var cellHeight = contentSize.height / Game.CELLS_PER_SIDE;
        this.cellSize = cc.size(cellWidth, cellHeight);

        var cellTrueWidth = this.cellSize.width - Game.X_MARGIN / 2;
        var cellTrueHeight = this.cellSize.height - Game.Y_MARGIN / 2;
        this.cellSizeWithMargins = cc.size(cellTrueWidth, cellTrueHeight);

        this.setContentSize(contentSize);
        this.setAnchorPoint(cc.p(0, 0));

        for (var row = 0; row < Game.CELLS_PER_SIDE; ++row) {
            for (var col = 0; col < Game.CELLS_PER_SIDE; ++col) {
                var cell = this.createCellView(row, col);
                this.gridModel.gridView.setCellView(row, col, cell);
                this.addChild(cell);
            }
        }
        return true;
    },

    createCellView: function(row, col) {
        var xPos = Game.X_MARGIN / 4 + col * this.cellSize.width;
        var yPos = Game.Y_MARGIN / 4 + (Game.CELLS_PER_SIDE - row - 1) * this.cellSize.height;

        var cell = new CellView(cc.p(row, col), cc.p(xPos, yPos), this.cellSizeWithMargins, this.gridModel);
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.gridModel.onCellClick
        }, cell);
        return cell;
    }
});