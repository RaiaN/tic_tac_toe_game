ClickResult = {
    TRY_AGAIN : 0,
    NEXT_TURN : 1,
    VICTORY_COMPUTER : 2,
    VICTORY_PLAYER : 3,
    DRAW: 4
};

var GridModel = cc.Node.extend({
    fieldSize : null,
    field : null,
    gridView : null,

    playerSign : 1,
    playerCounts : null,
    computerSign : 2,
    computerCounts : null,
    totalCount : null,
    totalCells : null,

    ignoreClicks : false,

    MAIN_DIAG_INDEX : -1,
    OTHER_DIAG_INDEX : -1,

    ctor: function(fieldSize, gridView) {
        this._super();
        this.gridView = gridView;

        this.fieldSize = fieldSize;
        this.field = new Array(fieldSize);
        for (var row = 0; row < fieldSize; ++row) {
            this.field[row] = Array.apply(null, new Array(fieldSize)).map(Number.prototype.valueOf, 0);
            this.field[row].fill(0);
        }
        this.init();
    },

    init: function() {
        var countsLen = 2 * (this.fieldSize + 1);
        this.playerCounts = new Array(countsLen);
        this.playerCounts.fill(0);
        this.computerCounts = new Array(countsLen);
        this.computerCounts.fill(0);
        this.totalCount = 0;
        this.totalCells = this.fieldSize * this.fieldSize;

        this.MAIN_DIAG_INDEX = 2 * this.fieldSize;
        this.OTHER_DIAG_INDEX = 2 * this.fieldSize + 1;
    },

    checkClickInsideArea : function(cursorPos, cellPos, cellSize) {
        var insideX = cursorPos.x >= cellPos.x && cursorPos.x <= cellPos.x + cellSize.width;
        var insideY = cursorPos.y >= cellPos.y && cursorPos.y <= cellPos.y + cellSize.height;
        return insideX && insideY;
    },

    onCellClick: function(callback) {
        var cell = callback.getCurrentTarget();
        var cursorPos = callback.getLocation();
        if (!cell.gridModel.checkClickInsideArea(cursorPos, cell.position, cell.size)) {
            return;
        }

        var computerTurn = false;
        var res = cell.gridModel.processClick(cell.coord, computerTurn);
        if (res !== ClickResult.TRY_AGAIN) {
            cell.gridModel.updateView(cell.coord, res, computerTurn);
        }
        if (res != ClickResult.VICTORY_PLAYER) {
            cell.gridModel.simulateClick();
        }
        return true;
    },

    findEmptyCell: function() {
        var emptyCells = [];
        for (var x = 0; x < this.fieldSize; ++x) {
            for (var y = 0; y < this.fieldSize; ++y) {
                if (this.field[x][y] === 0) {
                    emptyCells.push(cc.p(x,y));
                }
            }
        }
        var rind = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[rind];
    },

    simulateClick: function() {
        var computerTurn = true;
        var pos = this.findEmptyCell();
        var res = this.processClick(pos, computerTurn);
        this.updateView(pos, res, computerTurn);
    },

    processClick: function(coord, computerTurn) {
        if (this.field[coord.x][coord.y] !== 0) {
            return ClickResult.TRY_AGAIN;
        }
        var counts = computerTurn ? this.computerCounts : this.playerCounts;
        this.field[coord.x][coord.y] = computerTurn ? this.computerSign : this.playerSign;
        this.updateCounts(coord, counts);

        return this.checkVictory(coord, counts, computerTurn);
    },

    updateCounts: function(coord, counts) {
        counts[coord.x] += 1;
        counts[this.fieldSize + coord.y] += 1;

        counts[this.MAIN_DIAG_INDEX] += (coord.x == coord.y);
        counts[this.OTHER_DIAG_INDEX] += (coord.x == (this.fieldSize - coord.y - 1));
        this.totalCount += 1;
    },

    checkVictory: function(coord, counts, computerTurn) {
        var win = Math.max(counts[coord.x], counts[this.fieldSize + coord.y],
                           counts[this.MAIN_DIAG_INDEX], counts[this.OTHER_DIAG_INDEX]);
        if (win >= this.fieldSize) {
            return computerTurn ? ClickResult.VICTORY_COMPUTER : ClickResult.VICTORY_PLAYER;
        }
        if (this.totalCount == this.totalCells) {
            return ClickResult.DRAW;
        }
        return ClickResult.NEXT_TURN;
    },

    updateView: function(pos, res, computerTurn) {
        this.gridView.updateView(pos, res, computerTurn);
    }
});