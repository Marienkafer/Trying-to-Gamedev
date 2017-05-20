/**
  * Caracas Game Jam 2016
  * Team: SoftCakes
  * File: WorldTwo.js
  * Segundo nivel del Juego 
**/

City.WorldTwo = function(game){
  this._platf1 = null;
  this._finP = null;
};

City.WorldTwo.prototype =
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
    this.add.sprite(0,0,'WTwo');
    this._cloud = this.add.sprite(900,20, 'clouds');
    City.Worlds.loadLouie(this);
    
    // Plataforma
    this._finP = this.world.width - (this.world.width*0.40);
    this.platf1 = this.add.sprite(this._finP,0,'platform');
    this.physics.enable(this.platf1);
    this.platf1.enableBody = true;
    this.platf1.body.collideWorldBounds = true;
    this.platf1.body.setSize(144,53,0,100);
    this.platf1.anchor.setTo(0.5,0.5);
    this.platf1.body.immovable = true;
    
    City.Worlds.loadEnemies(this,'badman','badwoman',null,false);
    this.time.events.add(Phaser.Timer.SECOND*4,_enem,this);
    
    City.Worlds.loadLives(this);
    City.Worlds.popPowerUp(this);
    
    // Bullets a lanzar por la multitud	
    City.Worlds.loadBullets(this,0,50,'lifeguard');
    this._bullets[0].setAll('body.setSize',49,35,0,100);

    function _enem(){this._enemies = true;}
  },
  
  create:function()
  {
    this.bgsund=this.add.audio('bgmusic'); 
    this.bgsund.loopFull(1);
    //Agregar puntaje
    City.Worlds.loadScore(this);
    // Aparece un power up
    this.time.events.loop(Phaser.Timer.SECOND*this.rnd.integerInRange(12,16),_createPU,this);
    //Contador en segundos
    this.time.events.loop(Phaser.Timer.SECOND,_counterMore,this);
    //si el PU está en pantalla
    this.time.events.loop(Phaser.Timer.SECOND, _tmpPU, this);
    function _createPU(){if(!this._fin)City.Worlds.createPU(this);}
    function _counterMore(){if(!this._fin)City.Worlds.counterMore(this);
      City.Worlds.updateScore(this);}
    function _tmpPU(){if(this._onScreamPU)City.Worlds.tmpPU(this);}
  },
  
  update:function()
  { 
    City.Worlds.moveCloud(this);
    this.platf1.body.y = 400;
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
    
    City.Worlds.movePlatformsX(this.platf1,200,this._finP);
    City.Worlds.collisionsPlatf(this,this.platf1);
    City.Player.move(this);
    City.Worlds.collisions(this);
     if(this._proxlvl)
      {
        this.bgsund.stop();
        
        nLife=this._nlifes;
        act=3;
        this.state.start("Points");
      }
  }
};