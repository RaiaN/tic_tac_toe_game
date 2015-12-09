var res = {
    WhiteBackground_jpg : "res/img/white_bg.jpg",
    Title_png : "res/img/title.png",
    StartButton_png : "res/img/start.png",
    ExitButton_png : "res/img/exit.png",
    
    VictoryCaption_png : "res/img/victory.png",
    DefeatCaption_png : "res/img/defeat.png",
    DrawCaption_png : "res/img/draw.png",
    
    RestartNotPressed_png : "res/img/restart_not_pressed.png",
    RestartPressed_png : "res/img/restart_pressed.png",
    
    X_png : "res/img/x.png",
    O_png : "res/img/o.png",

    NewGameSound_mp3 : "res/sound/new_game.mp3",
    DefeatSound_wav : "res/sound/defeat.wav",
    VictorySound_wav : "res/sound/victory.wav",
    DrawSound_wav : "res/sound/draw.wav",
    
    ClickSound_wav : "res/sound/click_sound.wav"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
