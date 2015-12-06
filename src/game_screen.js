Game = {
    CELLS_PER_SIDE : 4,
    STATUS_BAR_HEIGHT : 60,
    X_MARGIN : 20,
    Y_MARGIN : 20
};

var GameScreenLayer = cc.Layer.extend({
    gridModel : null,
    fieldLayer : null,

    ctor: function() {
        this._super();
        this.gridModel = new GridModel(Game.CELLS_PER_SIDE, new GridView(Game.CELLS_PER_SIDE));
        this.fieldLayer = new FieldLayer(this.gridModel);
        this.addChild(this.fieldLayer);

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