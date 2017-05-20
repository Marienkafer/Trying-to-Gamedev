var game; 

window.onload = function () {
    game = new Phaser.Game(1024, 680, Phaser.AUTO, "phaser_game");
    game.state.add("boot", stateBoot);
    game.state.add("load", stateLoad);
    game.state.add("start", stateStart);
    game.state.start("boot");
    

};