var MenuGameOver = cc.Layer.extend({
    ctor: function (result) {
        this._super();
        this.addChild(this.createMenu(result));
    },

    createMenu : function(result) {
        var resource = null;
        switch (result) {
            case ClickResult.VICTORY_COMPUTER: {resource = res.DefeatCaption_png; break; }
            case ClickResult.VICTORY_PLAYER: {resource = res.VictoryCaption_png; break; }
            case ClickResult.DRAW: {resource = res.DrawCaption_png; }
        }
        var menuItemTitle = new cc.MenuItemSprite
        (
            new cc.Sprite(resource),
            new cc.Sprite(resource),
            null,
            this
        );
        var menuItemRestart = new cc.MenuItemSprite
        (
            new cc.Sprite(res.RestartNotPressed_png),
            new cc.Sprite(res.RestartPressed_png),
            this.onRestart,
            this
        );
        var menu = new cc.Menu(menuItemTitle, menuItemRestart);
        var centerPos = cc.p(cc.winSize.width / 2, cc.winSize.height / 2);
        menu.setPosition(centerPos);
        menu.alignItemsVerticallyWithPadding(-4.0);
        return menu;
    },

    onRestart: function(callback) {
        cc.director.resume();
        cc.director.runScene(new GameScreenScene());
    }
});