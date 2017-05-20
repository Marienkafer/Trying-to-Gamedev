var StateLoad = {
    
    preload: function () {
        
        var imgProgVoid = game.add.sprite(0,0, "imgProgressVoid");
        var imgProgFull = game.add.sprite(0,0, "imgProgressFull");
        
        imgProgVoid.x= game.world.centerX;
        imgProgVoid.x -= imgProgVoid.width/2;
        imgProgVoid.y = game.world.centerY;
        imgProgVoid.y -= imgProgVoid.height/2;
        
        imgProgFull.x = imgProgVoid.x;
        imgProgFull.y = imgProgVoid.y;
        
        
        game.load.setPreloadSprite(imgProgFull);
         
            
    },
    
    create: function () {
        game.state.start("StateStart");
    },
};