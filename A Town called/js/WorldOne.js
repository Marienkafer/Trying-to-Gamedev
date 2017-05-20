/**
  * Caracas Game Jam 2016
  * Team: SoftCakes
  * File: WorldOne.js
  * Primer Nivel del Juego 
**/

City.WorldOne = function(game){};

City.WorldOne.prototype =
{  
  preload:function()
  {
    this.physics.startSystem(Phaser.Physics.ARCADE);  
    this.physics.arcade.gravity.y = 500;
    City.Worlds.IniAttrib(this);
    
    this._fin = false;
    this._nEvil = 2;
    this._nlifes = 3;
    this._scude = false;
    this._pos_bull = 0;
    this._cant_bull = 1;
    tween = false;
    
    this.add.sprite(0,0,'WOne');
    control=this.add.sprite(320,100,'controls');
    control.animations.add('ctrl', [0,1], 2, true);
    control.animations.play('ctrl');
    this._cloud = this.add.sprite(900,20, 'clouds');
    
    this._player = this.add.sprite(-80,400,'louie');
    City.Player.sheet(this._player,[0,1,2,3,4,5],[6,7],[8,9,10,11,12,13],10);
    
    City.Worlds.loadEnemies(this,'badman','badwoman',null,false);
    
    City.Worlds.loadLives(this);
    City.Worlds.popPowerUp(this);
    
    // Objetos a lanzar por la multitud	
    City.Worlds.loadBullets(this,0,50,'squid');
    this._bullets[0].setAll('body.setSize',42,45,0,100);
    
    this._player.animations.play('right');
   
    if(!tween)
      this.add.tween(this._player).to( { x: 70 }, 1000, Phaser.Easing.Linear.InOut,true,3000,-1,false).start();
    this.time.events.loop(Phaser.Timer.SECOND,_tween,this);
    points=0;
    onScore=false;
    loadedScorer=false;
    function _tween()
    {
      if(!tween && this._player.x >= 50)
      {
        this._player.animations.stop();
        this._player.frame = 7; 
        City.Player.Drop(this._player);
        d1 = this.add.sprite(510,300,'diag1');
        d2 = this.add.sprite(680,320,'diag2');
        City.Player.create(this,100,450,'louie');
        this._player.body.setSize(65, 100,0,100);
        City.Player.sheet(this._player,[0,1,2,3,4,5],[6,7],[8,9,10,11,12,13],10);
        tween = true;
        this._player.frame=7;
        this.time.events.add(Phaser.Timer.SECOND*2,function(){
        this._enemies = true;
        d1.kill();d2.kill();
        },this);
      }
    }
  },
  
  create:function()
  { 
    //Inicializar y cargar puntaje
    this.bgsund=this.add.audio('bgmusic');
    this.bgsund.loopFull(1);
   
    // Aparece un power up
    this.time.events.loop(Phaser.Timer.SECOND*this.rnd.integerInRange(10,14),_createPU,this);
    //Contador en segundos
    this.time.events.loop(Phaser.Timer.SECOND,_counterMore,this);
    //si el PU está en pantalla
    this.time.events.loop(Phaser.Timer.SECOND, _tmpPU, this);
    function _createPU(){if(!this._fin)City.Worlds.createPU(this);}
    function _counterMore()
    {
      if(!this._fin)
      { 
        City.Worlds.counterMore(this);
        if(onScore)  
        City.Worlds.updateScore(this);
        if (this._counterTime==8)
          control.kill();
      }
    }
    function _tmpPU(){if(this._onScreamPU)City.Worlds.tmpPU(this);}
  },
  
  update:function()
  { 
    if(tween)
    {
      if(!loadedScorer)
      {
         City.Worlds.loadScore(this);
         onScore=true;
         loadedScorer=true;
      }
    
      City.Worlds.moveCloud(this);
      // Notificacion PowerUp
      if(this._scude) this._powUp[0].visible=true;
      if(this._jumpMoreOn) this._powUp[1].visible=true;
      if(this._flyOn) this._powUp[2].visible=true;

      //Física del jugador
      this._player.body.velocity.x = 0;
      if(this._flyOn) // Si el Power Up de gravedad está activo en el player
      {
        this._player.body.allowGravity = false;
        if(this._player.y <= 65)
          this._player.body.allowGravity = true;
        else  
          this._player.body.velocity.y = -150;
      }
      City.Player.move(this);
      if(this._enemies)
        City.Worlds.collisions(this);
      if(this._proxlvl)
      {
        this.bgsund.stop();
        nLife=this._nlifes;
        act=2;
        this.state.start("Points");
      }
    }
  }
};