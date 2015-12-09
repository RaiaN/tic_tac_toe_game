var ScoreboardView = cc.Node.extend({
    scoreboardView : null,

    ctor: function() {
        this._super();

        this.scoreboardView = new ccui.Text(this.makeLabel(0, 0), "Arial", Game.FONT_SIZE);
        this.scoreboardView.setTextColor(cc.color(255, 0, 0, 255));
        this.updateScoreBoard(gameState.playerScore, gameState.computerScore);

        this.setPosition(cc.winSize.width / 2, cc.winSize.height - 40);
        this.addChild(this.scoreboardView);
    },

    makeLabel: function(playerScore, computerScore) {
        return [Game.PLAYER_NAME + ": " + playerScore, Game.COMPUTER_NAME + ": " + computerScore].join(", ");
    },

    updateScoreBoard: function(playerScore, computerScore) {
        var label = this.makeLabel(playerScore, computerScore);
        this.scoreboardView.setString(label);
    },

    onGameOver: function(callback) {
        var userData = callback.getUserData();
        var playerScore = userData.playerScore;
        var computerScore = userData.computerScore;
        this.updateScoreBoard(playerScore, computerScore);
    }
});