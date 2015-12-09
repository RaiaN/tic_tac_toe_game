var MainMenuLayer = cc.Layer.extend({
    menu : null,

    ctor: function () {
        this._super();
        this.createMenu()
        this.addChild(this.menu);
    },

    createMenu : function() {
        var menuItemLabel = new cc.MenuItemSprite
        (
            new cc.Sprite(res.Title_png),
            new cc.Sprite(res.Title_png),
            null,
            this
        );
        var menuItemStart = new cc.MenuItemSprite
        (
            new cc.Sprite(res.StartButton_png),
            new cc.Sprite(res.StartButton_png),
            this.onPlay,
            this
        );
        var menuItemExit = new cc.MenuItemSprite
        (
            new cc.Sprite(res.ExitButton_png),
            new cc.Sprite(res.ExitButton_png),
            this.onClose,
            this
        );

        this.menu = new cc.Menu(menuItemLabel, menuItemStart, menuItemExit);
        this.menu.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.menu.alignItemsVerticallyWithPadding(5);
    },

    onPlay: function(callback) {
        cc.director.runScene(new GameScreenScene());
    },

    onClose: function(callback) {
        cc.director.end();
    }
});


var MainMenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        this.addChild(new BackgroundLayer());
        this.addChild(new MainMenuLayer());
    }
});
