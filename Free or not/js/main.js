var game; 

window.onload = function () {
    game = new Phaser.Game(640, 429, Phaser.AUTO, "phaser_game");
    game.state.add("StateBoot", StateBoot);
    game.state.add("StateLoad", StateLoad);
    game.state.add("StateStart", StateStart);
    game.state.add("StateMain", StateMain);
    game.state.add("StateOver", StateOver);
    game.state.add("StateWin", StateWin);
    game.state.start("StateBoot");
};
