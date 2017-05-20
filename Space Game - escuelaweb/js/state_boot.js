// state_boot.js

var StateBoot = {
    preload: function () {
        
        game.load.image("imgProgressVoid", "img/progress_void.png");
        game.load.image("imgProgressFull", "img/progress_full.png");
    },
    
     create: function () {
         
         //Modificar resoluciones en dipositivos mobiles y desktop
         game.scale.pageAlignHorizontally = true;
         if(!game.device.desktop) {
             game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         }
            
         game.scale.refresh();
         game.state.start("StateLoad");
    },
};
