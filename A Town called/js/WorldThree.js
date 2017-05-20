/**
  * Caracas Game Jam 2016
  * Team: SoftCakes
  * File: WorldThree.js
  * Tercer nivel del Juego 
**/

City.WorldThree = function(game){
  this._ejeY = false;
};

City.WorldThree.prototype =
{  
  preload:function()
  {
    this.physics.startSystem(Phaser.Physics.ARCADE);  
    this.physics.arcade.gravity.y = 500;
    City.Worlds.IniAttrib(this);
    
    this._fin = false;
    this._nEvil = 3;
    this._nlifes = 3;
    this._scude = false;
    this._ejeY = false;
    this._platY = 420;
    this._pos_bull = 0;
    this._cant_bull = 1;
    
    this.add.sprite(0,0,'WThree');
    this._cloud = this.add.sprite(900,20, 'clouds');
    
    // Plataforma
    this._finP = this.world.width - (this.world.width*0.40);
    this.platf1 = this.add.sprite(this._finP,0,'platform');
    this.physics.enable(this.platf1);
    this.platf1.enableBody = true;
    this.platf1.body.collideWorldBounds = true;
    this.platf1.body.setSize(144,53,0,100);
    this.platf1.anchor.setTo(0.5,0.5);
    this.platf1.body.immovable = true;
    
    City.Worlds.loadLouie(this)
    City.Worlds.loadEnemies(this,'badman','badwoman',null,false);
    this.time.events.add(Phaser.Timer.SECOND*3,_enem,this);
    
    City.Worlds.loadLives(this);
    City.Worlds.popPowerUp(this);
    
    // Objetos a lanzar por la multitud	
    City.Worlds.loadBullets(this,0,50,'shoes');
    this._bullets[0].setAll('body.setSize',43,40,0,100);
    
    
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
    this.time.events.loop(Phaser.Timer.SECOND*this.rnd.integerInRange(5,9),_platfY,this);
    function _createPU(){if(!this._fin)City.Worlds.createPU(this);}
    function _counterMore(){if(!this._fin)City.Worlds.counterMore(this);
     ////Agregado por Carlos 9:26p.m 23/2/2016
    City.Worlds.updateScore(this);}
    function _tmpPU(){if(this._onScreamPU)City.Worlds.tmpPU(this);}
    function _platfY()
    {
      if(this._ejeY)
        this._ejeY = false;
      else
        this._ejeY = true;
    }
  },
  
  update:function()
  { 
    if(!this._ejeY)
      this.platf1.body.y = this._platY;
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
    if(this._ejeY) 
      City.Worlds.movePlatformsY(this,this.platf1,420,350);
    else 
      City.Worlds.movePlatformsX(this.platf1,200,this._finP);
    City.Worlds.collisionsPlatf(this,this.platf1);
    City.Player.move(this);
    if(this._enemies)
      City.Worlds.collisions(this);
    if(this._proxlvl)
      {
        this.bgsund.stop();
        
        nLife=this._nlifes;
        act=4;
        this.state.start("Points");
      }
  }
};