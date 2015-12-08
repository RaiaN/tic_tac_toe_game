var MenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.addChild(this.createMenu());
    },

    createMenu : function constructMenu() {
        var windowSize = cc.winSize;

        var menuTitle = new ccui.Text(Game.MenuTitle, "Arial", Game.FONT_SIZE);
        menuTitle.setTextColor(cc.color(255, 0, 0, 255));

        var menuPlayButton = new ccui.Button();
        menuPlayButton.setTitleText(Game.MenuStartButtonCaption);
        menuPlayButton.setTitleColor(cc.color(255, 0, 0, 255));
        menuPlayButton.setTitleFontSize(Game.FONT_SIZE);
        menuPlayButton.addClickEventListener(this.onPlay);

        var menuExitButton = new ccui.Button();
        menuExitButton.setTitleText(Game.MenuExitButtonCaption);
        menuExitButton.setTitleColor(cc.color(255, 0, 0, 255));
        menuExitButton.setTitleFontSize(Game.FONT_SIZE);
        menuExitButton.addClickEventListener(this.onExit);

        var menuLayout = new ccui.Layout();
        menuLayout.setLayoutType(ccui.Layout.LINEAR_VERTICAL);
        menuLayout.x = windowSize.width / 2;
        menuLayout.y = windowSize.height / 2;

        menuLayout.addChild(menuTitle);
        menuLayout.addChild(menuPlayButton);
        menuLayout.addChild(menuExitButton);

        return menuLayout;
    },

    onPlay: function(callback) {
        cc.director.runScene(new GameScreenScene());
    },

    onExit: function(callback) {

    }
});


var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        this.addChild(new BackgroundLayer());
        this.addChild(new MenuLayer());
    }
});
