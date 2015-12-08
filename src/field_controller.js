var FieldController = cc.Node.extend({
    gridModel : null,
    gridView : null,
    scoreboardView : null,

    rowCellBorders : [],
    colCellBorders : [],

    contentSize : null,

    ctor: function() {
        this._super();
        this.init();

        this.scoreboardView = new ScoreboardView();
        this.gridView = new GridView(Game.CELLS_PER_SIDE, this.contentSize);
        this.fillCellBorders(this.gridView.getCellSizeWithMargins());
        this.gridModel = new GridModel(Game.CELLS_PER_SIDE, this.gridView);
        this.addChild(this.scoreboardView);
        this.addChild(this.gridView);

        this.prepareCustomEvents();

        return true;
    },

    init: function() {
        var windowSize = cc.winSize;
        this.contentSize = cc.size(windowSize.width, windowSize.height - Game.STATUS_BAR_HEIGHT);

        this.setContentSize(this.contentSize);
        this.setAnchorPoint(cc.p(0, 0));
    },

    prepareCustomEvents: function() {
        var self = this;
        var cellClickListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: Game.CELL_CLICK_EVENT,
            callback: function(callback) { self.gridModel.onCellClick(callback); }
        });
        cc.eventManager.addListener(cellClickListener, 1);

        var updateListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: Game.UPDATE_VIEW_EVENT,
            callback: function(callback) { self.gridView.onUpdate(callback);
                                           self.onUpdate(callback); }
        });
        cc.eventManager.addListener(updateListener, 1);

        var checkGameStateListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: Game.CHECK_GAME_STATE_EVENT,
            callback: function(callback) { self.gridModel.onCheckGameState(callback); }
        });
        cc.eventManager.addListener(checkGameStateListener, 1);

        var continueGameEvent = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: Game.COMPUTER_TURN_EVENT,
            callback: function(callback) { self.gridView.onComputerTurn(callback);
                                           self.gridModel.simulateClick(callback); }
        });
        cc.eventManager.addListener(continueGameEvent, 1);

        var gameOverListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: Game.GAME_OVER_EVENT,
            callback: function(callback) { self.scoreboardView.onGameOver(callback);
                                           self.onGameOver(callback); }
        });
        cc.eventManager.addListener(gameOverListener, 1);
    },

    fillCellBorders: function(cellSizeWithMargins) {
        for (var ind = 0; ind < Game.CELLS_PER_SIDE; ++ind) {
            var yPos = this.gridView.get(cc.p(ind,0)).getYPos();
            this.rowCellBorders.push([yPos, yPos + cellSizeWithMargins.height]);
            var xPos = this.gridView.get(cc.p(0,ind)).getXPos();
            this.colCellBorders.push([xPos, xPos + cellSizeWithMargins.width]);
        }
    },

    onClick: function(callback) {
        var fieldController = callback.getCurrentTarget();
        //cc.eventManager.pauseTarget(fieldController, false);

        var cursorPos = callback.getLocation();
        var coord = fieldController.getCellCoordByClick(cursorPos);
        if (coord.x == -1 || coord.y == -1) {
            return;
        }

        var cellClickEvent = new cc.EventCustom(Game.CELL_CLICK_EVENT);
        cellClickEvent.setUserData({coord: coord});
        cc.eventManager.dispatchEvent(cellClickEvent);
        return true;
    },

    onUpdate: function(callback) {
        var userData = callback.getUserData();

        var checkGameStateEvent = new cc.EventCustom(Game.CHECK_GAME_STATE_EVENT);
        checkGameStateEvent.setUserData({res: userData.res, computerTurn: userData.computerTurn});
        cc.eventManager.dispatchEvent(checkGameStateEvent);
        return true;
    },

    onGameOver: function(callback) {
        var res = callback.getUserData().res;

        var newGameEvent = new cc.EventCustom(Game.NEW_GAME_EVENT);
        cc.eventManager.dispatchEvent(newGameEvent);

        if (res == ClickResult.VICTORY_COMPUTER) {
            this.onDefeat();
        } else if (res == ClickResult.VICTORY_PLAYER) {
            this.onVictory();
        } else if (res == ClickResult.DRAW) {
            this.onDraw();
        }
    },

    getCellCoordByClick: function(cursorPos) {
        var xPos = cursorPos.x;
        var yPos = cursorPos.y;
        var row = this.findInd(yPos, this.rowCellBorders);
        var col = this.findInd(xPos, this.colCellBorders);

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