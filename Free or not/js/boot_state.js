//loading bar and scaling of the resolution
var stateBoot = {
    
    preload: function () {
        
        game.load.image("imgProgressVoid", "img/progress_void.png");
        game.load.image("imgProgressFull", "img/progress_full.png");
    },
    
     create: function () {
         
         //Modificar resoluciones en dipositivos moviles y desktop
         game.scale.pageAlignHorizontally = true;
         if(!game.device.desktop) {
             game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         }
            
         game.scale.refresh();
         game.state.start("load");
    },
};

