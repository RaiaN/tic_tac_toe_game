var GameState = cc.Class.extend({
    playerScore : 0,
    computerScore : 0,

    get: function() {
        return {playerScore: this.playerScore, computerScore: this.computerScore};
    },
});

var gameState = new GameState();