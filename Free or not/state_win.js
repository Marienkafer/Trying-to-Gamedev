var StateWin = {
    preload: function () {
        game.load.image('youWin', 'img/ui/yowin.png');
        game.load.image('saveUs', 'img/ui/saveus.png');
        game.load.image('imgBgBlue', 'img/2.png');
        game.load.image('stars', 'img/powerups/star_gold.png');
        game.load.audio('YouWin', 'snd/sfx/ShootingStar.mp3');
        game.load.audio('fireWorks', 'snd/sfx/FireCrackers.mp3') 
        
    },
    
    create: function () {
    
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        var w = game.world.width;
        var h = game.world.height;
        this.bg = game.add.tileSprite(0,0,w,h, 'imgBgBlue'); 
        this.youWin = game.add.sprite(120,100, 'youWin'); 
        this.saveUs = game.add.sprite(40, 300, 'saveUs'); 
        
        
        emitter = game.add.emitter(300, 50 , 100);
        emitter.makeParticles('stars');
        emitter.gravity = 200;
        emitter.maxParticleSpeed.setTo(300, 100);
        emitter.maxParticleScale = 0.5;
        emitter.flow(2000, 500, 5, -1);
        
        this.YouWin = game.add.audio('YouWin');
        this.YouWin.volume = 0.2;
        this.YouWin.play();
        
        //this.fireWorks = game.add.audio('fireWorks');
       // this.fireWorks.loopFull(0.2);
        
        
        game.input.onDown.add(this.play, this); // go back to the game
    },
    
    
    particleBurst: function(pointer){

        //  Position the emitter where the mouse/touch event was
        emitter.x = pointer.x;
        emitter.y = pointer.y;

        emitter.start(true, 2000, null, 10);
        
    
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