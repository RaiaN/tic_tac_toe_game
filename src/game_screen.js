Game = {
    CELLS_PER_SIDE : 4,
    STATUS_BAR_HEIGHT : 60,
    X_MARGIN : 20,
    Y_MARGIN : 20,
    FONT_SIZE : 28,

    MenuTitle: "Tic-tac-toe game",
    MenuStartButtonCaption: "Start",
    MenuExitButtonCaption: "Exit",
    PLAYER_NAME: "Player",
    COMPUTER_NAME: "Computer",

    CELL_CLICK_EVENT: "cell_click_event",
    UPDATE_VIEW_EVENT: "update_view_event",
    CHECK_GAME_STATE_EVENT: "check_game_state_event",
    COMPUTER_TURN_EVENT: "computer_turn_event",
    GAME_OVER_EVENT: "game_over_event",
    NEW_GAME_EVENT: "new_game_event",
};

var GameScreenLayer = cc.Layer.extend({
    fieldController : null,

    ctor: function() {
        this._super();
        this.fieldController = new FieldController();
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.fieldController.onClick
        }, this.fieldController);

        this.addChild(this.fieldController);
        return true;
    }
});

var GameScreenScene = cc.Scene.extend({
   onEnter: function() {
       this._super();

       this.addChild(new BackgroundLayer());
       this.addChild(new GameScreenLayer());
   }
});