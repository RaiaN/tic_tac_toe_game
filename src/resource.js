var res = {
    WhiteBackground_jpg : "res/white_bg.jpg",

    NewGameSound_mp3 : "res/new_game.mp3",
    DefeatSound_wav : "res/defeat.wav",
    VictorySound_wav : "res/victory.wav",
    DrawSound_wav : "res/draw.wav",
    ClickSound_wav : "res/click_sound.wav",

    RestartNotPressed_png : "res/restart_not_pressed.png",
    RestartPressed_png : "res/restart_pressed.png",
    X_png : "res/x.png",
    O_png : "res/o.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
