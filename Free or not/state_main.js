/*state_main.js*/

var StateMain = {
   
    preload: function()
    {
        game.load.image('imgShip', 'img/player/playershipAFP.png');
        game.load.image('imgUFO', 'img/enemies/UFO-B.png');
        game.load.image('imgBgBlue', 'img/2.png');
        game.load.image('bullet', 'img/lasers/laserGreen05.png');
        game.load.image('ship', 'img/ui/playerLifeShip.png');
        game.load.image('score', 'img/ui/score.png');
        game.load.image('enemyBullet', 'img/lasers/laserRed09.png');
        game.load.spritesheet('boom', 'img/animations/boom_animation.png', 50, 50, 50);
        
        game.load.audio('explosion', 'snd/sfx/explosion.mp3');
        game.load.audio('blaster', 'snd/sfx/blaster.mp3');
        game.load.audio('lose', 'snd/sfx/lose3.ogg');
        
    },
    create: function () {
        
        game.physics.startSystem(Phaser.Physics.ARCADE); 
        game.physics.arcade.checkCollision.down = false; 
        
        this.numCol = 5;
        this.numRow = 5;
        this.prevX = game.input.x;
        
        this.win = false;
        
        //our space
        var w = game.world.width;
        var h = game.world.height;
        this.bg = game.add.tileSprite(0,0,w,h, 'imgBgBlue'); 
        
        //score board
        var lives;
        this.points = 0;
        
        this.strScore = " ";
        this.strLives = "lives: ";
        
        var txtProps = {
            font: "400 20px 'Oswald'",
            fill: "#ffffff",
            align: "left"
        };
       
        var score;
        this.score = game.add.sprite(10,10, 'score');
        this.txtScore = game.add.text(95,8, this.strScore, txtProps);
        this.txtScore.text = this.strScore + this.points;        
        
        this.lives = game.add.group();
        
        for (var i = 0; i < 3; i++) 
        {
            var ship = this.lives.create(game.world.width - 90 + (30 * i), 400, 'ship');
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 0;
            ship.alpha = 0.6;
        }
        
        //this is our savior
        this.ship = game.add.sprite(0,0,'imgShip');
        
        game.physics.enable(this.ship);
        this.ship.enableBody = true;
        this.ship.anchor.set(0.5, 1); 
        this.shipHalf = this.ship.width/3;
        this.ship.body.immovable = true; 
        this.shipSpeed = 300;
        
        //building the aliens
        var imgList = [ 
            'imgUFO',
        ];
      
        this.aliens = game.add.group(); 
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        this.aliens.x = 10; 
        this.aliens.y = 35; 
        
        var i, j;
        var margin;
        margin = 30;
        
        for(j = 0; j < this.numRow; j++){
            var img = imgList[0];
            for(i = 0; i< this.numCol; i++)
            { 
                var brick = this.aliens.create(0,0,img);
                brick.x = i * (brick.width + margin);
                brick.y = j * brick.height;
            }
        }
        
        //fly aliens fly!
        var fly = game.add.tween(this.aliens).to( { x: 165 }, 2000, Phaser.Easing.Linear.None, true, 0, 1200, true);
        
        //oh no they are attacking
        fly.onLoop.add(this.descend, this);
 

        //building the weapons
        var bullets;
        this.bulletTime = 0;
        
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.y -= (this.ship.height+15);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
        
        //the enemy weapons
        var enemyBullets;
        this.firingTimer= 0;
        
        this.enemyBullets = game.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(30, 'enemyBullet');
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);
        
        
        //our sounds effects  
        this.explosionSnd = game.add.audio('explosion');
        this.blasterSnd = game.add.audio('blaster');
        this.loseSnd = game.add.audio('lose');
        
        
        /*
        var explosions;
        
        this.explosions = game.add.group();
        this.explosions.createMultiple(3, 'boom');
        //this.explosions.forEach(this.setupShip, this);*/
        
        //decode our sfx
        game.sound.setDecodedCallback([this.explosionSnd, this.blasterSnd, this.loseSnd], this.update, this);
        
        this.reset();
    },
    
    

     setupShip: function(ship) {

        ship.animations.add('boom');
    
    },
    
    
    //enemies are charging
    descend: function () {

    this.aliens.y += 10;
        
    },
    
   
    update: function () { 
        
        //moving through space
        this.bg.tilePosition.y += 5;

        
        // input  mouse
            if(this.prevX != game.input.x){ 
                
                this.ship.x = game.input.x;
            
            } else {
            //input keyboard
                var kRight = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT); 
                var kLeft = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);

                if(kRight && !kLeft) {

                    this.ship.x += this.shipSpeed * game.time.physicsElapsed;
                }
                if(kLeft && !kRight) {
                    this.ship.x -= this.shipSpeed * game.time.physicsElapsed;
                }
                if (this.ship.x - this.shipHalf < 0) { 
                    this.ship.x = this.shipHalf;
                }
            }
        
        

        //keep the ship in our space
            this.prevX = game.input.x; 
            if(this.ship.x + this.shipHalf > game.world.width) 
            this.ship.x = game.world.width - this.shipHalf; 
        
        //attack!    
            if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
                this.fireBullet();
            }
        
        //enemies can attack us too 
        if (game.time.now > this.firingTimer)
        {
            this.enemyFires();
        }
        
        
        //collision between laser and alien
        game.physics.arcade.collide(this.bullets, this.aliens, this.killAlien, null, this);
        //collision between enemy bullets and ship
        game.physics.arcade.collide(this.ship, this.enemyBullets, this.enemyBulletsHitsPlayer, null, this);
        //collision between aliens and ship
        game.physics.arcade.overlap(this.ship, this.aliens, this.alienHitsShip, null, this);

        },
    
    alienHitsShip: function(ship, alien)
    {
        alien.kill();
        ship.kill();
        
        this.loseSnd.play();
    
    },
    
    
    killAlien: function(bullet, alien){
    
        alien.kill();
        bullet.kill();
        
        this.points += 500;
        this.txtScore.text = this.strScore + this.points;
        
        
        //saaaaunds
        this.explosionSnd.volume = 0.05;
        this.explosionSnd.play();
        
        if (this.aliens.countLiving() == 0)
        {
            this.enemyBullets.callAll('kill');
            game.state.start("StateWin");
        }
    },
    
    enemyBulletsHitsPlayer: function (ship,enemyBullet) 
    {
        enemyBullet.kill();
        ship.kill();
        
        //sound effects
        this.loseSnd.volume = 0.1;
        this.loseSnd.play();
        
        this.DeadShip();
        
       /* var explosion = this.explosions.getFirstExists(false);
        explosion.reset(this.ship.body.x, this.ship.body.y);
        explosion.play('boom', 30, false, true);*/
    },
    
    DeadShip: function()
    {

        this.live = this.lives.getFirstAlive();

        if (this.live)
        {
            this.live.kill();
        }

        // When the player dies
        if (this.lives.countLiving() < 1)
        {
            this.ship.kill();
            this.enemyBullets.callAll('kill');
            game.state.start("StateOver");
            
        }else
        {
            this.ship.revive();
        }
    },

    reset: function () {
        this.ship.x = game.world.centerX;
        this.ship.y = game.world.height;
        this.aliens.x = game.world.height/7;
        
    },
    
    fireBullet: function () {
        
        //  Grab the first bullet we can from the pool
            var b_bullet = this.bullets.getFirstExists(false)
            
            if (game.time.now > this.bulletTime)
            { 
                if (b_bullet)
                {
                    ///  And fire it
                    b_bullet.reset(this.ship.x, this.ship.y+8);
                    b_bullet.body.velocity.y = -400;
                    this.bulletTime = game.time.now + 500;
                    this.blasterSnd.volume = 0.02;
                    this.blasterSnd.play();
                }
            }
    },
    
    enemyFires: function () {

        //  Grab the first bullet we can from the pool
        var b_enemyBullet = this.enemyBullets.getFirstExists(false);
        
        var livingEnemies = [];

        livingEnemies.length=0;

        this.aliens.forEachAlive(function(alien){
            // put every living enemy in an array
            livingEnemies.push(alien);
        });


        if (b_enemyBullet && livingEnemies.length > 0)
        {

            var random=game.rnd.integerInRange(0,livingEnemies.length-1);

            // randomly select one of them
            var shooter=livingEnemies[random];
            // And fire the bullet from this enemy
            b_enemyBullet.reset(shooter.body.x, shooter.body.y);

            game.physics.arcade.moveToObject(b_enemyBullet, this.ship,120);
            this.firingTimer = game.time.now + 800;
        }
    },
    
    resetBullet: function (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();
    
    },
    
};