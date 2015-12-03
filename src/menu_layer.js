var MenuLayer = cc.Layer.extend({
    FONT_SIZE : 28,
    
    ctor: function () {
        this._super();
        this.addChild(this.createMenu());
    },

    createMenu : function constructMenu() {
        var windowSize = cc.winSize;

        var menuTitle = new ccui.Button();
        menuTitle.setTitleText(res.MenuTitle);
        menuTitle.setTitleColor(cc.color(255, 0, 0, 255));
        menuTitle.setTitleFontSize(this.FONT_SIZE);

        var menuPlayButton = new ccui.Button();
        menuPlayButton.setTitleText(res.MenuStartButtonCaption);
        menuPlayButton.setTitleColor(cc.color(255, 0, 0, 255));
        menuPlayButton.setTitleFontSize(this.FONT_SIZE);
        menuPlayButton.addClickEventListener(this.onPlay);

        var menuExitButton = new ccui.Button();
        menuExitButton.setTitleText(res.MenuExitButtonCaption);
        menuExitButton.setTitleColor(cc.color(255, 0, 0, 255));
        menuExitButton.setTitleFontSize(this.FONT_SIZE);
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

    },

    onExit: function(callback) {

    }
});


var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        this.addChild(new BackgroundLayer());
        this.addChild(new MenuLayer());
    }
});
