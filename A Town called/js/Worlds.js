/**
  * Caracas Game Jam 2016
  * Team: SoftCakes
  * File: Worlds.js
  * Contiene todos los recursos y funciones para uso global de las diferentes etapas del juego 
**/

City.WorldsAll = function(game)
{
  this._cloud = null;
  this._player = null;
  this._evils = null;
  this._boss = null;
  this._enemies = null;
  this._nEvil = null;
  this._lifes = null;
  this._nlifes = null;
  this._facing = null;
  this._evil_facing = null;
  this._boss_facing = null;
  this._fireBoss = null;
  this._jumpTimer = null;
  this._jumpMoreOn = null;
  this._overlap = null;
  this._nextFire = null;
  this._nextFireB = null;
  this._onScreamPU = null;
  this._bullets = null;
  this._pos_bull = null;
  this._cant_bull = null;
  this._platforms = null;
  this._up = null;
  this._powUp = null;
  this._pwu = null;
  this._countPU = null;
  this._countScude = null;
  this._countJump = null;
  this._countFly= null;
  this._exit = null;
  this._counterTime = null;
  this._levelTime = null;
  this._typePU = null;
  this._pu = null;
  this._countPU = null;
  this._timePU = null;
  this._colPwu = null;
  this._multi = null;
  this._exitOn = null;
  this._scude = null;
  this._flyOn = null;
  this._jumpMoreOn = null;
  this._proxlvl = null;
  this._fin = null;
  this._points=null;
  this._score=null;
  this._txtScore=null;
  this._txtProps=null;
  this.bgsund=null;
  
};

City.Worlds =
{  
  // Inicializa todos los atributos 
  IniAttrib:function(game)
  {
    game._cloud = null;
    game._player = null;
    game._boss = null;
    game._evils = new Array;
    game._enemies = false;
    game._nEvil = null;
    game._lifes = new Array;
    game._nlifes = null;
    game._facing = 'idle';
    game._evil_facing = 'idle';
    game._boss_facing = 'idle';
    game._fireBoss = false;
    game._jumpTimer = 0;
    game._jumpMoreOn = false;
    game._overlap = false;
    game._nextFire = 0;
    game._nextFireB = 0;
    game._onScreamPU = false;
    game._bullets = new Array;
    game._pos_bull = 0;
    game._cant_bull = 0;
    game._platforms = null;
    game._up = true;
    game._powUp = new Array;
    game._pwu = null;
    game._countPU = 0;
    game._countScude = 0;
    game._countJump = 0;
    game._countFly = 0;
    game._countAux = 0;
    game._exit = null;
    game._counterTime = 0;
    game._levelTime = 20;
    game._typePU = -1;
    game._pu = ['shield','jumper','gravity'];
    game._countPU = 0;
    game._timePU = 0;
    game._colPwu = false;
	game._multi = 5;
    game._exitOn = false;
    game._scude = false;
    game._flyOn = false;
    game._jumpMoreOn = false;
    game._proxlvl= false; 
    game._fin = false;
    game._score="Puntaje: ";  
    game._txtScore=null;
    game.bgsund=null;
    game._txtProps = 
    {
      font: "400 20px 'Arial'",
      fill: "#6A0888",
      align: "left"
    };
    nLife=game._nlife;
  },
  
  // Mueve las nubes
  moveCloud:function(game)
  {
    game._cloud.x -= 1;
    if(game._cloud.x == 0)
      game._cloud.x=1200;
  },  

  //Carga el puntaje
  loadScore:function(game)
  { 
    game._txtScore = game.add.text(650,8, this.score, game._txtProps);
    game._txtScore.text = game._score + points;
  },

  //Actualiza el puntaje
  updateScore:function(game)
  {
    points+=game._counterTime*5;
    game._txtScore.text = game._score + points;
  },
  
  // Carga al personaje principal 'Louie'
  loadLouie:function(game)
  {
    City.Player.create(game,0,450,'louie');
    game._player.body.setSize(65, 100,0,100);
    City.Player.sheet(game._player,[0,1,2,3,4,5],[6,7],[8,9,10,11,12,13],10);
    game._player.frame=7;
  },
  
  // Carga los enemigos
  loadEnemies:function(game,obj,obj2,obj3,bosses)
  {
    if(!game._enemies)
    {
      var dist = game.world.width/2+game.world.width/4;
      for(i=0;i<game._nEvil;i++)
      {	
        if(!(i%2))
            game._evils[i] = game.add.sprite(dist,450,obj);
        else
            game._evils[i] = game.add.sprite(dist,450,obj2);
        game.physics.enable(game._evils[i],Phaser.Physics.ARCADE);
        game._evils[i].body.collideWorldBounds = true;
        game._evils[i].body.bounce.y = 0.2;
        if(!(i%2)) game._evils[i].body.setSize(60, 105, 0, 100);
        else  game._evils[i].body.setSize(59, 102, 0, 100);
        game._evils[i].anchor.setTo(0.5,0.5);
        game._evils[i].body.gravity.y = 1200;
        City.Player.sheet(game._evils[i],[1,2,3],[0,4],[5,6,7],5);
        game._evils[i].frame = 0;
        dist = dist + 130;
      }
      if(bosses)
      {
        game._boss = game.add.sprite(game.world.width,450,obj3);
        game.physics.enable(game._boss,Phaser.Physics.ARCADE);
        game._boss.body.collideWorldBounds = true;
        game._boss.body.bounce.y = 0.2;
        game._boss.anchor.setTo(0.5,0.5);
      }
    }
  },
  
  // Cargar vidas
  loadLives:function(game)
  {
    var i;
    for (i=0; i<game._nlifes; i++)
      game._lifes[i] = game.add.sprite(10+(50*i), 5, 'life');
  },
  
  // Carga los Bullets
  loadBullets:function(game,pos,cant,bullt)
  {
  // Objetos a lanzar por la multitud	
    game._bullets[pos] = game.add.group();
    game._bullets[pos].enableBody = true;
    game._bullets[pos].physicsBodyType = Phaser.Physics.ARCADE;
    game._bullets[pos].createMultiple(cant,bullt);
    game._bullets[pos].setAll('anchor.x',0.5);
    game._bullets[pos].setAll('anchor.y',0.5);
    game._bullets[pos].setAll('checkWorldBounds', true);
    game._bullets[pos].setAll('outOfBoundsKill', true);
  },

  // Mueve plataformas horizontalmente
  movePlatformsX:function(platf,ini,fin)
  {
    platf.body.velocity.x = 0;
    if(platf.x <= ini)
        this.right = true;
    else if(platf.x >= fin)
        this.right = false;
    if(this.right)
        platf.body.velocity.x = 20;
    else
        platf.body.velocity.x = -20;
  },
  
  // Mueve plataformas verticalmente
  movePlatformsY:function(game,platf,ini,fin)
  {
    platf.body.velocity.x = 0;
    platf.body.velocity.y = 0;
    if(platf.body.y >= ini)
        game._up = true;
    else if(platf.body.y <= fin)
        game._up = false;
    if(game._up)
      platf.body.velocity.y = -30;
    else
      platf.body.velocity.y = 25;
    game._platY = platf.body.y;
  },
  
  // Pow Up en uso
  popPowerUp:function(game)
  {
    var i;
    game._powUp[0]=game.add.sprite(5+(50*0), 60, 'mshield');
    game._powUp[1]=game.add.sprite(5+(50*1), 60, 'mjumper');
    game._powUp[2]=game.add.sprite(5+(50*2), 60, 'mgravity');
    for (i=0; i<3; i++)
      game._powUp[i].visible=false;
  },

  // Crea un Power Up aleatorio
  createPU:function(game) 
  {
    if(!game._onScreamPU) // Si no hay un power up en pantalla
    {
      game._onScreamPU=true;
      do{random = game.rnd.integerInRange(0,2)}while(game._typePU==random);
      game._typePU = random; // Pwu aleatorio pero diferente al anterior
      game._pwu = game.add.sprite(game.world.randomX, 0,game._pu[game._typePU]);
      game.physics.enable(game._pwu, Phaser.Physics.ARCADE);
      game._pwu.body.bounce.y = 0.9;
      game._pwu.body.collideWorldBounds = true;
      game._pwu.anchor.setTo(0.5,0.5);
      game._pwu.body.setSize(53,53,0,100);
    }	
  },
  
  // Letrero de Salida
  counterMore:function(game) 
  {
    game._counterTime++;
    if(!game._exitOn && !(game._counterTime%game._levelTime))
    {
      game._exit = game.add.sprite(game.world.width-50,0,'exit');
      game._exit.anchor.setTo(0.5,0.5);
      game.physics.enable(game._exit, Phaser.Physics.ARCADE);
      game._exit.body.collideWorldBounds = true;
      game._exit.body.setSize(60,120,0,100);
      game._exitOn=true;
      game._exit.animations.add('exit', [0,1], 5, true);
      game._exit.animations.play('exit');
    }
    else if(game._exitOn && !(game._counterTime%game._levelTime))
    {
      game._exitOn=false;
      game._exit.kill()
    }
  },
  
  tmpPU:function(game)
  {
    game._countPU++;
    if(!(game._countPU%5))
    {
      game._onScreamPU=false;
      game._countPU=0;
      try{game._pwu.kill();}catch(err){} // Exception
      game._multi = game._multi*10;
    }
  },
  
  // Elimina todos los objetos, incluyendo al personaje
  killAll:function(game)
  {
    i = 0;
    game._fin=true
    while(game._bullets[i] != null && i<game._cant_bull)
    {
      live = game._bullets[i].getFirstAlive();
      while(live)
      {
        live.kill();
        live = game._bullets[i].getFirstAlive();
      }
      game._bullets[i] = null;
      i++;
    }
    for(i=0;i<game._nEvil;i++)
      game._evils[i].kill();
    game._player.kill();
    try{game._pwu.kill();}catch(err){} // Exception
    if(game._exitOn)
      try{game._exit.kill();}catch(err){} // Exception  
    if(game._boss!=null)
      game._boss.kill();
    game._nEvil = -1;
  },
  
  // Colisión con las plataformas
  collisionsPlatf:function(game,platf)
  {
    game.physics.arcade.overlap(game._player,platf,function(){game._player.body.velocity.y = 0;});
    game.physics.arcade.collide(game._player,platf,function(){game._player.body.velocity.x = 0;game._overlap = true;});
  },
    
  // Colisión entre el player y algun enemigo, o la salida
  collideExit:function(game)
  {
    //soundm.stop();
    //soundgo.play();
    City.Worlds.killAll(game);
  },
    
  // Colisión entre el player y un Power Up
  collidePwu:function(game)
  {	
    var i = 1;
    game._player.body.velocity.x=300;
    game._pwu.kill();
    game._timePU = 0;
    game._colPwu = true;
    switch(game._typePU)
    {
      case 0:  game._scude = true; game._countScude = 0; break;
      case 1:  game._jumpMoreOn = true; game._countJump = 0;break;
      case 2:  game._flyOn = true; game._countFly = 0;break;
      default: game._colPwu = false; break; // Exception
    }
  },
  
  // Duración de los Power Ups en uso
  countCollidePwu:function(game)
  {
    if(game._colPwu && game.time.now > game._timePU)
    {
      if(game._scude)
      {
        if(game._countScude >= 5)
        {
          game._scude = false;
          game._countScude= 0;
          game._powUp[0].visible=false;
        }
        game._countScude++;
      }
      if(game._jumpMoreOn)
      {
        if(game._countJump >= 5)
        {
          game._jumpMoreOn = false;
          game._countJump= 0;
          game._powUp[1].visible=false;
        }
        game._countJump++;
      }
      if(game._flyOn)
      {
        if(game._countFly >= 5)
        {
          game._flyOn = false;
          game._countFly= 0;
          game._powUp[2].visible=false;
          game._player.body.allowGravity = true;
        }
        game._countFly++;
      }
      if(game._scude || game._jumpMoreOn || game._countFly)
        game._colPwu = true;
      else
        game._colPwu = false;
      game._timePU = game.time.now + 1000;
    }
  },
  
  // Comprueba y toma acción por cada colision entre el player y personajes, bullets, power ups
  collisions:function(game)
  { 
    for(i=0;i<game._nEvil;i++)
    {
      City.Player.follow(game,game._player,game._evils[i]);
      if(game._boss != null && !game._fireBoss)
      {
        City.Player.follow(game,game._player,game._boss);
        if(((game._boss.x - game._player.x)<=-120) || ((game._boss.x - game._player.x)<=120))
            City.Player.fireBoss(game,1000,false);
      }
      else if(game._boss != null && game._fireBoss)
        City.Player.fireWife(game);
      if(((game._evils[i].x - game._player.x)<=-130) || ((game._evils[i].x - game._player.x)<=130))
        City.Player.fire(game,game._evils[i]);
    
      if(!game._scude) // Colisiones sin escudo
      {
        // Colisión con los bullets 
        game.physics.arcade.overlap(game._player,game._bullets,null,function(){
          for(j=0;j<game._cant_bull;j++)
          {
            if(game._bullets[j] != null)
            {
              bullet = game._bullets[j].getFirstAlive();
              if(bullet != null && _collidexy(game._player,bullet,bullet.width+(bullet.width/3),bullet.height+(bullet.height/3)))
              {
                game._pos_bull = j;
                _killLife();
              }
            }
          }
          game._pos_bull = 0;
        },game);
        
        // Colisión con el boss
        if(game._boss != null)
          game.physics.arcade.overlap(game._player,game._boss,null,function(){
            if(_collidexy(game._player,game._boss,game._boss.width/2,game._boss.height/2))
            _collideOne();
          },game);
        
        // Colisión con los demas habitantes
        game.physics.arcade.overlap(game._player,game._evils[i],null,function(){
          if(_collidexy(game._player,game._evils[i],game._evils[i].width/2,game._evils[i].height/2))
            _collideOne();
        },game);
        
        if(game._typePU != -1) // Si existe un Power Up
          game.physics.arcade.collide(game._player,game._pwu,_collideTwo,null,game);
      }
      else
      {
        game.physics.arcade.collide(game._player, game._bullets);
        game.physics.arcade.collide(game._player, game._evils[i]);
      }
    }
    // Comprueba la colision con la salida
    game.physics.arcade.overlap(game._player,game._exit,null,function(){
      if(_collidexy(game._player,game._exit,game._exit.width/2,game._exit.height/2))
        _collideThree();
    },game);
    City.Worlds.countCollidePwu(game);
    function _killLife(){City.Worlds.killLife(game); }
    function _collideOne(){City.Worlds.collideExit(game);  game.bgsund.stop();  game.state.start("GameOver");}
    function _collideTwo(){City.Worlds.collidePwu(game);City.Worlds.countCollidePwu(game);this.song = this.add.audio('powerup');this.song.play();}
    function _collideThree(){City.Worlds.collideExit(game);game._proxlvl = true;}  
    function _collidexy(obj,_obj,distX,distY)
    {
      collide = false;
      auxX = obj.x - _obj.x; 
      auxY = obj.y - _obj.y; 
      if(auxX < 0) auxX= auxX*-1;
      if(auxY < 0) auxY= auxY*-1;
      if(auxX <= distX && auxY <= distY)
        collide = true;
      return collide;
    }
  },
  
  // Elimina las vidas de Louie al colisionar con un bullet
  killLife:function(game)
  {
    if(game._nlifes!=0)
    {
     game.song = game.add.audio('perdervida'); game.song.play();
      game._nlifes -= 1;
      game._lifes[game._nlifes].kill();
      var live = game._bullets[game._pos_bull].getFirstAlive();
      while(live)
      {
        live.kill();
        live = game._bullets[game._pos_bull].getFirstAlive();
      }
    }
    if(game._nlifes == 0)
    {
      City.Worlds.collideExit(game);
     game.bgsund.stop();    
     game.state.start("GameOver"); 
    }
  }
};

// Objeto que contiene las funciones de un personaje
City.Player = 
{  
  // Crea un player
  create:function(game,x,y,pic)
  {
    game._player = game.add.sprite(x,y,pic);
    game.physics.enable(game._player,Phaser.Physics.ARCADE);
    game._player.body.collideWorldBounds = true;
	game._player.anchor.setTo(0.5,0.5);
    game._player.body.bounce.y = 0.03;
  },
  
  // Agrega animación al player
  sheet:function(player,left,idle,right,velocidad)
  {
    player.animations.add('left', left, velocidad, true);
    player.animations.add('idle', idle, velocidad, true);
    player.animations.add('right', right, velocidad, true);
  },
  
  // Agrega animación al player
  sheetAttack:function(player,left,idle,right,velocidad)
  {
    player.animations.add('aLeft', left, velocidad, true);
    player.animations.add('aIdle', idle, velocidad, true);
    player.animations.add('aRight', right, velocidad, true);
  },
  
 // Simula el movimiento del personaje segun la entrada del teclado
  move:function(game)
  {
    var cursors = game.input.keyboard.createCursorKeys();
    game._player.body.velocity.x = 0;
    if(cursors.left.isDown)
    {
      game._player.body.velocity.x = -150;
      if(game._facing != 'left')
      {
        game._player.animations.play('left');
        game._facing = 'left';
      }
    }
    else if(cursors.right.isDown)
    {
      game._player.body.velocity.x = 150;
      if(game._facing != 'right')
      {
        game._player.animations.play('right');
        game._facing = 'right';
      }
    }
    else
    {
      if(game._facing != 'idle')
      {
        game._player.animations.stop();
        if(game._facing == 'left')
            game._player.frame = 6;
        else
            game._player.frame = 7;
        game._facing = 'idle';
      }
    }
    City.Player.jump(game);
  },

  // Permite Saltar
  jump:function(game)
  {
    var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var cursors = game.input.keyboard.createCursorKeys();
    if(jumpButton.isDown || cursors.up.isDown)
    {  
      if((game._player.body.onFloor() || game._overlap) && (game.time.now > game._jumpTimer))
      {
        if(game._overlap)
        {
          game._player.body.velocity.y = -350;
          game._overlap = false;
        }
        else if(!game._jumpMoreOn)
        {
          game._player.body.velocity.y = -450;
          game._jumpTimer = game.time.now + 750;
        }
        else
        {
          game._player.body.velocity.y = -550;
          game._umpTimer = game.time.now + 750;
        }
      }
    }
  },
  
   // Dispara objetos
  fire:function(game,player)
  {
    if ((game.time.now > game._nextFire) && game._bullets[game._pos_bull].countDead() > 0 && game._enemies)
    {
      bullet = game._bullets[game._pos_bull].getFirstExists(false);
      bullet.reset(player.x, player.y-8);
      if (game._evil_facing == 'left')
      {
        bullet.body.velocity.y -= 300;
        bullet.body.velocity.x -= 500;
      }
      else
      {
        bullet.body.velocity.y -= 200;
        bullet.body.velocity.x += 300;
      }
      game._evil_facing = 'idle';
      bullet.body.velocity.y -= 150;
      bullet.body.velocity.x += 200;
      game._nextFire = game.time.now + 1400;
    }
  },
  
  // Disparos del Boss
  fireBoss:function(game,contFire,exp)
  {
    pos = game.rnd.integerInRange(0,game._cant_bull-1);
    if(game._boss!=null&&(game.time.now > game._nextFireB)&&game._bullets[pos].countDead()>0)
    {
      bullet = game._bullets[pos].getFirstExists(false);
      bullet.reset(game._boss.x, game._boss.y-8);
      if (game._boss_facing == 'left' && !exp)
      {
        bullet.body.velocity.y -= 200;
        bullet.body.velocity.x -= 300;
      }
      else if (!exp)
      {
        bullet.body.velocity.y -= 200;
        bullet.body.velocity.x += 300;
      }
      if(exp)
      {
        f = game.rnd.integerInRange(8,12);
        for(k=0;k<f;k++)
        {
          pos = game.rnd.integerInRange(0,game._cant_bull-1);
          bullet = game._bullets[pos].getFirstExists(false);
          bullet.reset(game._boss.x, game._boss.y-8);
          xX = game.rnd.integerInRange(-300,300);
          yY = game.rnd.integerInRange(300,400);
          bullet.body.velocity.x += xX;
          bullet.body.velocity.y -= yY;
        }
      }
      game._boss_facing = 'idle';
      game._nextFireB = game.time.now + contFire;
    }
  },

  // Disparos de la super boss
  fireWife:function(game)
  {
    game._boss_facing = 'idle';
    City.Player.fireBoss(game,1000,true);
    game._fireBoss = false;
  },
  
  // Un personaje persigue a otro
  follow:function(game,player,_player)
  {
    salida = false;
    if(player.body.onFloor() || game._overlap)
    {	
      if(_player == game._boss && game._fireBoss)
        salida = true;
      else if(!game._fireBoss)
        salida = false;
      if(!salida)
      {
        game.physics.arcade.moveToObject(_player,player,50);
        _player.body.velocity.y=0;
        if(player.x < _player.x)
        {
          _player.animations.play('left');
          game._evil_facing='left';
          game._boss_facing='left';
        }
        else if(player.x > _player.x)
        {
          game._evil_facing='right';
          game._boss_facing='right';
          _player.animations.play('right');
        }
      }
    }
    else if(game._overlap)
    {
      game._evil_facing='idle';
      _player.body.velocity.x = 0;
      if(!game._fireBoss)
        game._boss_facing='idle';
    }
  },
  
  // Elimina el personaje
  Drop:function(player) {player.kill();}
};