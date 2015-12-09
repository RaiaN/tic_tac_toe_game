var GameScreenLayer = cc.Layer.extend({
    fieldController : null,

    ctor: function() {
        this._super();
        cc.eventManager.removeAllListeners();

        this.fieldController = new FieldController();
        this.fieldController.nextTurn();
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