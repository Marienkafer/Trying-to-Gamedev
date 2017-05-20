/**
  * Caracas Game Jam 2016
  * Team: SoftCakes
  * File: WorldFour.js
  * Cuarto nivel del Juego 
**/

City.WorldFour = function(game)
{
   this._ejeY = false;
};

City.WorldFour.prototype =
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
    this._cant_bull = 3;
    this._ejeY = false;
    this._platY = 420;
    
    this.add.sprite(0,0,'WThree');
    this._cloud = this.add.sprite(900,20, 'clouds');
    
      //Plataforma
    this._finP = this.world.width - (this.world.width*0.40);
    this.platf1 = this.add.sprite(this._finP,0,'platform');
    this.physics.enable(this.platf1);
    this.platf1.enableBody = true;
    this.platf1.body.collideWorldBounds = true;
    this.platf1.body.setSize(144,53,0,100);
    this.platf1.anchor.setTo(0.5,0.5);
    this.platf1.body.immovable = true;
    
    City.Worlds.loadLouie(this)
    City.Worlds.loadEnemies(this,'badman','badwoman','mayor',true);
    this._boss.body.setSize(78,110,0,100);
    City.Player.sheet(this._boss,[0,1,2,3,4,5,6,7],[9,8],[10,11,12,13,14,15,16,17],5);
    this.time.events.add(Phaser.Timer.SECOND*3,_enem,this);
    
    City.Worlds.loadLives(this);
    City.Worlds.popPowerUp(this);
    
    // Objetos a lanzar por la multitud	
    City.Worlds.loadBullets(this,0,50,'squid');
    this._bullets[0].setAll('body.setSize',42,45,0,100);
    City.Worlds.loadBullets(this,1,50,'shoes');
    this._bullets[1].setAll('body.setSize',54,50,0,100);
    City.Worlds.loadBullets(this,2,50,'lifeguard');
    this._bullets[2].setAll('body.setSize',49,35,0,100);
    function _enem(){this._enemies = true;}
  },
  
  create:function()
  { 
    this.bgsund=this.add.audio('alcaldeMusic');

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
    function _counterMore(){if(!this._fin)City.Worlds.counterMore(this);City.Worlds.updateScore(this);}
    ////Agregado por Carlos 9:26p.m 23/2/2016
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
      if(this._player.y <= 50)
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
      act=5;
      this.state.start("Points");
    }
  }
};