/**
  * Caracas Game Jam 2016
  * Team: SoftCakes
  * File: Points.js
  * Se encarga del puntaje del Juego 
**/
var StateStart = {
    
     create: function () {
        
        this.physics.startSystem(Phaser.Physics.ARCADE); 
        this.physics.arcade.checkCollision.down = false; 
         
        var w = this.world.width;
        var h = this.world.height;
        this.bg = this.add.tileSprite(0,0,w,h, 'bgloop'); 
       
        // da clouds 
        this.cloud = this.add.sprite(900,20, 'cloud');
        this.cloud.anchor.set(0.8, 0); 
         
       
         
        //title and press start sprites 
        this.title = this.add.sprite(270, 20, 'letrero');
        this.start = this.add.sprite(200, 490, 'start');
        this.cCredit=this.add.sprite(300,535,'cCredit');
         
        
        // music on 
        this.song = this.add.audio('bgstart');
        
        //adding character sprites 
        this.badwomanLs = this.add.sprite(-100, 390, 'badwomanLs');
        this.badwomanSquid = this.add.sprite(-100, 375, 'badwomanSquid');
        this.badmanLs = this.add.sprite(-100, 388, 'badmanLs');
        this.badwomanSquid2 = this.add.sprite(1100  , 375, 'badwomanSquid2');
        this.badwomanLs2 = this.add.sprite(-100, 390, 'badwomanLs');
        this.badmanLs2 = this.add.sprite(-100, 388, 'badmanLs');
        this.badmanShoe = this.add.sprite(1100,388, 'badmanShoe');
        this.badmanShoe2 = this.add.sprite(1100, 388, 'badmanShoe');
        
        
    
         
        //animations 
        this.badwomanLs.animations.add('walking');
        this.badwomanLs2.animations.add('walking');
        this.badmanLs.animations.add('walking');
        this.badmanLs2.animations.add('walking');
        this.badwomanSquid.animations.add('walking');
        this.badwomanSquid2.animations.add('walking');
        this.badmanShoe.animations.add('walking');
        this.badmanShoe2.animations.add('walking');
        this.title.animations.add('on');

         
        //play animations
        this.badwomanLs.animations.play('walking', 4, true);
        this.badwomanLs2.animations.play('walking', 4, true);
        this.badmanLs.animations.play('walking', 4, true);
        this.badmanLs2.animations.play('walking', 4, true);
        this.badwomanSquid.animations.play('walking', 4, true);
        this.badwomanSquid2.animations.play('walking', 4, true);
        this.badmanShoe.animations.play('walking', 4, true);
        this.badmanShoe2.animations.play('walking', 4, true);
        this.title.animations.play('on', 2, true);
 
  
         

        // let them walk free
        this.add.tween(this.badwomanLs).to( { x: 1000 }, 15000, Phaser.Easing.Linear.InOut, true, 3000, -1, false);
        this.add.tween(this.badmanLs).to( { x: 1000 }, 18000, Phaser.Easing.Linear.InOut, true, 0, -1, false);
        this.add.tween(this.badmanLs2).to( { x: 1000 }, 22500, Phaser.Easing.Linear.InOut, true, 2000, -1, false);
        this.add.tween(this.badwomanSquid).to( { x: 1000 }, 20000, Phaser.Easing.Linear.InOut, true, 4000, -1, false);
        this.add.tween(this.badwomanSquid2).to( { x: -200 }, 18000, Phaser.Easing.Linear.InOut, true, 900, -1, false);
        this.add.tween(this.badwomanLs2).to( { x: 1000 }, 22000, Phaser.Easing.Linear.InOut, true, 1200, -1, false); 
        this.add.tween(this.badmanShoe).to({ x: -200 }, 22000, Phaser.Easing.Linear.InOut, true, 0, -1, false);
        this.add.tween(this.badmanShoe2).to({ x: -200 }, 30000, Phaser.Easing.Linear.InOut, true, 4000, -1, false);
         
        
        //sound settings 
//       
        this.song.loopFull(1);
         
        // keyboard
        this.input.onDown.add(this.play, this); 
         
     
     },
        
    
    update: function () { 
          
        //fly little clouds
        this.cloud.x -= 1;
        if(this.cloud.x == 0)
            this.cloud.x=1200;
  
        if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
           this.play()
        }
        
        if(this.input.keyboard.isDown(Phaser.Keyboard.C)){
           this.credits()
        }
        
    },
    
    play: function() {
        // SpaceBar to start the this calls this function
        this.song.stop();
        this.state.start("Acto1");
        
    },
    
    credits: function() {
        // SpaceBar to start the this calls this function
         this.song.stop();
        this.state.start("StateCredits");
    }
    
}
        