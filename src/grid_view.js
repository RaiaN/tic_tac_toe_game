var GridView = cc.Node.extend({
    gridView : null,
    fieldSize : null,

    rowCellBorders : [],
    colCellBorders : [],

    ctor: function(fieldSize, contentSize) {
        this._super();
        this.fieldSize = fieldSize;

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
        var cellSizeWithMargins = cc.size(cellTrueWidth, cellTrueHeight);

        for (var row = 0; row < this.fieldSize; ++row) {
            for (var col = 0; col < this.fieldSize; ++col) {
                var cell = this.createCellView(row, col, cellSize, cellSizeWithMargins);
                this.gridView[row][col] = cell;
                this.addChild(cell);
            }

            var yPos = this.gridView[row][0].getYPos();
            this.rowCellBorders.push([yPos, yPos + cellSizeWithMargins.height]);
            var xPos = this.gridView[0][row].getXPos();
            this.colCellBorders.push([xPos, xPos + cellSizeWithMargins.width]);
        }
        this.setContentSize(contentSize);
        this.setAnchorPoint(cc.p(0, 0));
    },

    createCellView: function(row, col, cellSize, cellSizeWithMargins) {
        var xPos = Game.X_MARGIN / 4 + col * cellSize.width;
        var yPos = Game.Y_MARGIN / 4 + (this.fieldSize - row - 1) * cellSize.height;
        var cell = new CellView(cc.p(row, col), cc.p(xPos, yPos), cellSizeWithMargins);

        return cell;
    },

    updateView: function(coord, res, computerTurn) {
        this.gridView[coord.x][coord.y].updateCellView(computerTurn);
        //fire field changed event
    },

    get: function(coord) {
        return this.gridView[coord.x][coord.y];
    },

    showDefeatMessage: function() {
        alert('DEFEAT!');
    },

    showVictoryMessage: function() {
        alert('VICTORY!');
    },

    showDrawMessage: function() {
        alert('DRAW!');
    }
});