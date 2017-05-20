var StateStart = {
    preload: function () {
        
        
        game.load.image('logo', 'img/animations/InvadersLogo.png');
        game.load.image('imgBgBlue', 'img/2.png');
        game.load.image('waterMark', 'img/ui/watermark.png');
        
        game.load.audio('mainSong', 'snd/bgm/SummerisGone.ogg');
        
    },
    
    create: function () {
    
        var w = game.world.width;
        var h = game.world.height;
        this.bg = game.add.tileSprite(0,0,w,h, 'imgBgBlue'); 
        this.logo = game.add.sprite(70,-30, 'logo'); 
        this.watermark = game.add.sprite(570, 350, 'waterMark'); 
        this.watermark.alpha = 0.6;
        
        this.mainSong = game.add.audio('mainSong');
        this.mainSong.loopFull(0.05);
        
        game.input.onDown.add(this.play, this); 
    },
    
    
 
     update: function() {
        
        //moving through space
        this.bg.tilePosition.y += 5;
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
           this.play()
        }
        
    },
    
    play: function() {
        game.state.start("StateMain");
    }
};