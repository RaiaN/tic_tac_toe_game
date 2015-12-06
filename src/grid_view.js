var GridView = cc.Node.extend({
    gridView : null,

    ctor: function(cellSize) {
        this.gridView = new Array(cellSize);
        for (var row = 0; row < cellSize; ++row) {
            this.gridView[row] = new Array(cellSize);
        }
    },

    setCellView: function(row, col, cell) {
        this.gridView[row][col] = cell;
    },

    updateView: function(coord, res, computerTurn) {
        if (res >= ClickResult.NEXT_TURN) {
            this.gridView[coord.x][coord.y].updateCellView(computerTurn);
        }

        if (res == ClickResult.VICTORY_COMPUTER) {
            this.showDefeatMessage();
        } else if (res == ClickResult.VICTORY_PLAYER) {
            this.showVictoryMessage();
        } else if (res == ClickResult.DRAW) {
            this.showDrawMessage();
        }
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