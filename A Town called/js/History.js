/**
  * Caracas Game Jam 2016
  * Team: SoftCakes
  * File: History.js
  * Se encarga de presentar la historia del juego
**/

City.StateHistory = function(game){};

City.StateHistory.prototype =
{
  create: function () 
  {
    var w = this.world.width;
    var h = this.world.height;
    this.bg = this.add.tileSprite(0,0,w,h, 'bg');

    this.logo = this.add.sprite(270, 90, 'logo');
    this.blackScreen = this.add.sprite(0,0, 'black');       
    this.presentation = this.add.sprite(0,0, 'presentation');
    this.blackScreen2 = this.add.sprite(0,0, 'black');
    this.fondo_historia = this.add.sprite(0,0, 'fondo_historia');
    this.omitir = this.add.sprite(180, 485, 'omitir');
    this.r1 = this.add.sprite(180,120, '1');
    this.r2 = this.add.sprite(180,240, '2');
    this.r3 = this.add.sprite(180,120, '3');
    this.r4 = this.add.sprite(180,120, '4');
    this.r5 = this.add.sprite(180,120, '5');
    this.r6 = this.add.sprite(180,140, '6');

    this.input.onDown.add(this.play, this); 

    this.pianoIntro=this.add.audio('pianoIntro');

    this.logo.alpha = 0;
    this.time.events.add(1000, function() {   
       this.add.tween(this.logo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0,  0, false);
    },this);

    this.blackScreen.alpha = 0;
    this.time.events.add(3000, function() {
        this.add.tween(this.blackScreen).to( {alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    this.presentation.alpha = 0;
    this.time.events.add(6000, function() {
      this.add.tween(this.presentation).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0,  0, false)
    },this);

    this.blackScreen2.alpha = 0;
    this.time.events.add(9000, function() {
      this.add.tween(this.blackScreen2).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.pianoIntro.fadeIn();
    },this);

    this.fondo_historia.alpha = 0;
    this.time.events.add(12500, function() {
      this.add.tween(this.fondo_historia).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    this.omitir.alpha = 0;
    this.time.events.add(13000, function() {
      this.add.tween(this.omitir).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    // Hay un pueblo peculiar lleno de gente tradicional 
    this.r1.alpha = 0;
    this.time.events.add(15000, function() {
      this.add.tween(this.r1).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    this.time.events.add(18000, function() {
      this.add.tween(this.omitir).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    // Que al alcalde deben seguir
    this.r2.alpha = 0;
    this.time.events.add(19000, function() {
    this.add.tween(this.r2).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);
    
    // *fadeout r1, r2
    this.time.events.add(22500, function() {
      this.add.tween(this.r1).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this); 

    this.time.events.add(22500, function() {
      this.add.tween(this.r2).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    // Hasta en la forma de vestir
    this.r3.alpha = 0;
    this.time.events.add(25000, function() {
      this.add.tween(this.r3).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    this.time.events.add(27000, function() {
      this.add.tween(this.r3).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    // Louie acaba de llegar y su estilo...
    this.r4.alpha = 0;
    this.time.events.add(30000, function() {
      this.add.tween(this.r4).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    this.time.events.add(35000, function() {
      this.add.tween(this.r4).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    // Lo que hace a sus vecinos
    this.r5.alpha = 0;
    this.time.events.add(37000, function() {
      this.add.tween(this.r5).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);
    
    // Sus nuevos enemigos
    this.r6.alpha = 0;
    this.time.events.add(39000, function() {
      this.add.tween(this.r6).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    this.time.events.add(43000, function() {
      this.add.tween(this.r6).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    this.time.events.add(43000, function() {
      this.add.tween(this.r5).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    this.time.events.add(45000, function() {
      this.add.tween(this.fondo_historia).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },this);

    this.time.events.add(47000, function() {
      this.pianoIntro.fadeOut(); 
    },this);

    this.time.events.add(48000, function() {
      this.state.start('StateStart');
    this.pianoIntro.stop();
    },this);
  }, 

  update:function() 
  {
    //moving through space
    if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
      this.play()
  },
    
  play:function() 
  {
    // SpaceBar to start the this calls this function
    this.pianoIntro.stop();
    this.state.start('StateStart');
  }                     
};

    
        