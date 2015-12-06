var FieldController = cc.Node.extend({
    gridModel : null,
    gridView : null,

    contentSize : null,

    ctor: function() {
        this._super();
        this.init();

        this.gridView = new GridView(Game.CELLS_PER_SIDE, this.contentSize);
        this.gridModel = new GridModel(Game.CELLS_PER_SIDE, this.gridView);
        this.addChild(this.gridView);

        return true;
    },

    init: function() {
        var windowSize = cc.winSize;
        this.contentSize = cc.size(windowSize.width, windowSize.height - Game.STATUS_BAR_HEIGHT);

        this.setContentSize(this.contentSize);
        this.setAnchorPoint(cc.p(0, 0));
    },

    onClick: function(callback) {
        var fieldController = callback.getCurrentTarget();
        cc.eventManager.pauseTarget(fieldController, false);

        var cursorPos = callback.getLocation();
        var coord = fieldController.getCellCoordByClick(cursorPos);
        if (coord.x == -1 || coord.y == -1) {
            return;
        }
        fieldController.gridModel.onCellClick(coord);
    },

    getCellCoordByClick: function(cursorPos) {
        var xPos = cursorPos.x;
        var yPos = cursorPos.y;
        var row = this.findInd(yPos, this.gridView.rowCellBorders);
        var col = this.findInd(xPos, this.gridView.colCellBorders);

        return cc.p(row, col);
    },

    findInd : function(pos, cellBorders) {
        for (var ind = 0; ind < cellBorders.length; ++ind) {
            if (cellBorders[ind][0] <= pos && pos <= cellBorders[ind][1]) {
                return ind;
            }
        }
        return -1;
    }
});