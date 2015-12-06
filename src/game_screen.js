Game = {
    CELLS_PER_SIDE : 4,
    STATUS_BAR_HEIGHT : 60,
    X_MARGIN : 20,
    Y_MARGIN : 20
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