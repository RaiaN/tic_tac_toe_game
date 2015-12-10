var GridView = cc.Node.extend({
    gridView : null,
    fieldSize : null,
    playerForX : null,

    ctor: function(fieldSize, contentSize, playerForX) {
        this._super();
        this.fieldSize = fieldSize;
        this.playerForX = playerForX;

        this.gridView = new Array(fieldSize);
        for (var row = 0; row < fieldSize; ++row) {
            this.gridView[row] = new Array(fieldSize);
        }
        this.init(contentSize);
    },

    init: function(contentSize) {
        var cellWidth = contentSize.width / this.fieldSize;
        var cellHeight = contentSize.height / this.fieldSize;
        var cellSize = cc.size(cellWidth, cellHeight);

        var cellTrueWidth = cellWidth - Game.X_MARGIN / 2;
        var cellTrueHeight = cellHeight - Game.Y_MARGIN / 2;
        this.cellSizeWithMargins = cc.size(cellTrueWidth, cellTrueHeight);

        for (var row = 0; row < this.fieldSize; ++row) {
            for (var col = 0; col < this.fieldSize; ++col) {
                var cell = this.createCellView(row, col, cellSize);
                this.gridView[row][col] = cell;
                this.addChild(cell);
            }
        }
        this.setContentSize(contentSize);
        this.setAnchorPoint(cc.p(0, 0));
    },

    createCellView: function(row, col, cellSize) {
        var xPos = Game.X_MARGIN / 4 + col * cellSize.width;
        var yPos = Game.Y_MARGIN / 4 + (this.fieldSize - row - 1) * cellSize.height;
        return new CellView(cc.p(row, col), cc.p(xPos, yPos), this.cellSizeWithMargins);
    },

    get: function(coord) {
        return this.gridView[coord.x][coord.y];
    },

    getCellSizeWithMargins: function() {
        return this.cellSizeWithMargins;
    },

    onUpdate: function(callback) {
        var updateInfo = callback.getUserData();
        var coord = updateInfo.coord;
        this.gridView[coord.x][coord.y].updateCellView(updateInfo.computerTurn, this.playerForX);
        return true;
    },

    onComputerTurn: function(callback) {
        return true;
    },

    onGameOver: function() {
    },
});