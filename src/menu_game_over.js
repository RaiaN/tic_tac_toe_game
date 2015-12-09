var MenuGameOver = cc.Layer.extend({
    ctor: function (message) {
        this._super();
        this.addChild(this.createMenu(message));
    },

    createMenu : function(message) {
        var centerPos = cc.p(cc.winSize.width / 2, cc.winSize.height / 2);
        cc.MenuItemFont.setFontSize(Game.FONT_SIZE);

        var titleLabel =  new cc.LabelTTF(message, "Arial", 2 * Game.FONT_SIZE);
        titleLabel.setColor(cc.color.RED);
        var menuItemLabel = new cc.MenuItemLabel(titleLabel, function(e) {}, this);
        var menuItemRestart = new cc.MenuItemSprite
        (
            new cc.Sprite(res.RestartNotPressed_png),
            new cc.Sprite(res.RestartPressed_png),
            this.onRestart,
            this
        );
        var menu = new cc.Menu(menuItemLabel, menuItemRestart);
        menu.setPosition(centerPos);
        menu.alignItemsVerticallyWithPadding(5);
        return menu;
    },

    onRestart: function(callback) {
        cc.director.resume();
        cc.director.runScene(new GameScreenScene());
    }
});