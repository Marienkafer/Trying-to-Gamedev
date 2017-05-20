// state_over.js

var StateOver = {
    preload: function () {
        game.load.image('gameOver', 'img/ui/gameover.png');
        game.load.image('tryAgain', 'img/ui/try.png');
        game.load.image('imgBgBlue', 'img/2.png');
        game.load.audio('YouLose', 'snd/jingles_NES/jingles_NES00.ogg');
      
        
    },
    
    create: function () {
    
        var w = game.world.width;
        var h = game.world.height;
        this.bg = game.add.tileSprite(0,0,w,h, 'imgBgBlue'); 
        this.gameOver = game.add.sprite(85,100, 'gameOver'); 
        this.tryAgain = game.add.sprite(120, 300, 'tryAgain'); 
        
        this.YouLose = game.add.audio('YouLose');
        this.YouLose.volume = 0.1;
        this.YouLose.play();
        
        var txtProps = {
            font: "400 20px 'Oswald'",
            fill: "#ffffff",
            align: "left"
        };
        
        this.txtScore = game.add.text(95,8, this.strScore, txtProps);
        
        game.input.onDown.add(this.play, this); // Vuelve al main con el clic
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