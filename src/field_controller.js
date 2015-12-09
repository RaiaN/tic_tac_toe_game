var FieldController = cc.Node.extend({
    gamePause: false,

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
        this.addChild(this.scoreboardView);

        this.gridView = new GridView(Game.CELLS_PER_SIDE, this.contentSize);
        this.fillCellBorders(this.gridView.getCellSizeWithMargins());
        this.addChild(this.gridView);

        this.gridModel = new GridModel(Game.CELLS_PER_SIDE, this.gridView);
        this.prepareCustomEvents();

        cc.audioEngine.playEffect(res.NewGameSound_mp3, false);

        return true;
    },

    init: function() {
        var windowSize = cc.winSize;
        this.contentSize = cc.size(windowSize.width, windowSize.height - Game.STATUS_BAR_HEIGHT);

        this.setContentSize(this.contentSize);
        this.setAnchorPoint(cc.p(0, 0));
    },

    nextTurn: function() {
        if (Math.random() > 0.5) {
            var computerTurnEvent = new cc.EventCustom(Game.COMPUTER_TURN_EVENT);
            cc.eventManager.dispatchEvent(computerTurnEvent);
        }
    },

    prepareCustomEvents: function() {
        var self = this;
        var cellClickListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: Game.CELL_CLICK_EVENT,
            callback: function (callback) {
                self.gridModel.onCellClick(callback);
            }
        });

        var updateListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: Game.UPDATE_VIEW_EVENT,
            callback: function (callback) {
                self.gridView.onUpdate(callback);
                self.onUpdate(callback);
            }
        });

        var checkGameStateListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: Game.CHECK_GAME_STATE_EVENT,
            callback: function (callback) {
                self.gridModel.onCheckGameState(callback);
            }
        });

        var computerTurnListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: Game.COMPUTER_TURN_EVENT,
            callback: function (callback) {
                self.gridView.onComputerTurn(callback);
                self.gridModel.simulateClick(callback);
                cc.audioEngine.playEffect(res.ClickSound_wav);
            }
        });

        var gameOverListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: Game.GAME_OVER_EVENT,
            callback: function (callback) {
                self.scoreboardView.onGameOver(callback);
                self.gridView.onGameOver();
                self.onGameOver(callback);
            }
        });

        cc.eventManager.addListener(cellClickListener, 1);
        cc.eventManager.addListener(updateListener, 1);
        cc.eventManager.addListener(checkGameStateListener, 1);
        cc.eventManager.addListener(computerTurnListener, 1);
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
        if (fieldController.gamePause) {
            return;
        }

        var cursorPos = callback.getLocation();
        var coord = fieldController.getCellCoordByClick(cursorPos);
        if (coord.x == -1 || coord.y == -1) {
            return;
        }

        var cellClickEvent = new cc.EventCustom(Game.CELL_CLICK_EVENT);
        cellClickEvent.setUserData({coord: coord});
        cc.eventManager.dispatchEvent(cellClickEvent);

        cc.audioEngine.playEffect(res.ClickSound_wav);

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
        cc.director.pause();
        this.gamePause = true;

        var result = callback.getUserData().res;
        var message = Game.DRAW_MSG;
        switch(result) {
            case ClickResult.VICTORY_COMPUTER: {
                message = Game.DEFEAT_MSG;
                cc.audioEngine.playEffect(res.DefeatSound_wav, false);
                break;
            }
            case ClickResult.VICTORY_PLAYER: {
                message = Game.VICTORY_MSG;
                cc.audioEngine.playEffect(res.VictorySound_wav, false);
                break;
            }
            case ClickResult.DRAW: {
                cc.audioEngine.playEffect(res.DrawSound_wav, false);
            }
        }
        this.addChild(new MenuGameOver(message));
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