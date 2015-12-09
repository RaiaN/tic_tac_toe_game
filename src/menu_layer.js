var MenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.addChild(this.createMenu());
    },

    createMenu : function() {
        var windowSize = cc.winSize;

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
            this.onExit,
            this
        );

        var menu = new cc.Menu(menuItemLabel, menuItemStart, menuItemExit);
        menu.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        menu.alignItemsVerticallyWithPadding(5);

        return menu;
    },

    onPlay: function(callback) {
        cc.director.runScene(new GameScreenScene());
    },

    onExit: function(callback) {
        //cc.director.end();
    }
});


var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        this.addChild(new BackgroundLayer());
        this.addChild(new MenuLayer());
    }
});
