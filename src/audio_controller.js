var AudioController = cc.Node.extend({
    onClick: function() {
        cc.audioEngine.playEffect(res.ClickSound_wav);
    },

    onGameOver: function(callback) {
        var result = callback.getUserData().res;
        switch(result) {
            case ClickResult.VICTORY_COMPUTER: {
                cc.audioEngine.playEffect(res.DefeatSound_wav, false);
                break;
            }
            case ClickResult.VICTORY_PLAYER: {
                cc.audioEngine.playEffect(res.VictorySound_wav, false);
                break;
            }
            case ClickResult.DRAW: {
                cc.audioEngine.playEffect(res.DrawSound_wav, false);
            }
        }
    },
});