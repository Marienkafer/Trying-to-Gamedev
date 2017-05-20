/**
  * Caracas Game Jam 2016
  * Team: SoftCakes
  * File: Boot.js
  * Se encarga de precargar los recursos multimedia
**/

var City = {}; // Variable Global
var points,nLife,act=0;
City.Boot = function(game){};

City.Boot.prototype = 
{      
  preload:function()
  {
    // Recursos de la introducción
    this.load.image('logo', 'assets/images/img/logobw.png');
    this.load.image('bg', 'assets/images/img/logobg.png');
    this.load.image('black', 'assets/images/img/logobg.png');
    this.load.image('fondo_historia', 'assets/images/img/fondo.png');
    this.load.image('1', 'assets/images/img/1.png');
    this.load.image('2', 'assets/images/img/2.png');
    this.load.image('3', 'assets/images/img/3.png');
    this.load.image('4', 'assets/images/img/4.png');
    this.load.image('5', 'assets/images/img/5.png');
    this.load.image('6', 'assets/images/img/6.png');
    this.load.image('presentation', 'assets/images/img/presentacion.png');
    this.load.audio('pianoIntro', 'assets/audio/snd/pianoIntro.ogg');
    this.load.image('omitir', 'assets/images/img/omitir.png');
    this.load.spritesheet('letrero', 'assets/images/img/letrero.png', 341, 300);
    this.load.image('bgloop', 'assets/images/img/scn3.png');
    this.load.image('cloud', 'assets/images/img/nubes.png');
    this.load.spritesheet('badmanShoe', 'assets/images/img/badmanshoe.png', 59, 107); // width / height / frames
    this.load.spritesheet('badmanLs', 'assets/images/img/badmanLF.png', 59, 107);
    this.load.spritesheet('badwomanSquid', 'assets/images/img/badwomanCAL.png', 60, 120);
    this.load.spritesheet('badwomanSquid2', 'assets/images/img/badwomanCAL2.png', 60, 120);
    this.load.spritesheet('badwomanLs', 'assets/images/img/badwomanLS.png', 60, 105);
    this.load.image('title', 'assets/images/img/tittle2.png');
    this.load.image('start', 'assets/images/img/start.png');
    this.load.audio('bgstart', 'assets/audio/snd/pianoIntro.ogg');
    this.load.image('credits', 'assets/images/img/credit.png');
    this.load.audio('cw', 'assets/audio/snd/carelesswhisper.ogg');  

    // Cargando Fondos
    this.load.image('WOne','assets/images/world/scn1.png');
    this.load.image('WTwo','assets/images/world/scn2.png');
    this.load.image('WThree','assets/images/world/scn3.png');
    this.load.image('WFour','assets/images/world/scn4.png');
    this.load.image('WFive','assets/images/world/scn5.png');
    this.load.image('clouds','assets/images/world/nubes.png');
    this.load.spritesheet('controls','assets/images/world/controles.png',300,88);             
    this.load.image('diag1','assets/images/world/dialogo1.png');        
    this.load.image('diag2','assets/images/world/dialogo2.png'); 
    this.load.image('cCredit','assets/images/world/creditos.png'); 
    //Escenas
    this.load.image('actOne','assets/images/acts/act1.png');
    this.load.image('actTwo','assets/images/acts/act2.png');
    this.load.image('actThree','assets/images/acts/act3.png');
    this.load.image('actalc','assets/images/acts/actalc.png');
    this.load.image('pointScream','assets/images/acts/pantalla_puntos.png');
    this.load.image('what','assets/images/acts/what.png');
    this.load.image('win','assets/images/acts/Pantalla_Win.png');
    this.load.image('gameOver','assets/images/acts/gameover.png');
  
    // Plataformas
    this.load.image('platform','assets/images/world/plataforma.png');
    // Power Ups
    this.load.image('mshield','assets/images/icons/mShield.png');
    this.load.image('mgravity','assets/images/icons/mRocket.png');
    this.load.image('mjumper','assets/images/icons/mJump.png');
    this.load.image('jumper','assets/images/powerup/jumper.png');
    this.load.image('shield','assets/images/powerup/shield.png');
    this.load.image('gravity','assets/images/powerup/rocket.png');
    this.load.spritesheet('exit','assets/images/powerup/salida.png',75,111);
    
    // Bullets
    this.load.image('squid','assets/images/bullets/calamar.png');
    this.load.image('shoes','assets/images/bullets/zapatos.png');
    this.load.image('lifeguard','assets/images/bullets/salvavida.png');
    // Vidas
    this.load.image('life', 'assets/images/icons/life.png');
    // Personajes
    this.load.spritesheet('louie','assets/images/spritesheet/Louie.png',65,100);
    this.load.spritesheet('badman','assets/images/spritesheet/badman.png',59,102);
    this.load.spritesheet('badwoman','assets/images/spritesheet/badwoman.png',60,105);
    this.load.spritesheet('mayor','assets/images/spritesheet/mayor.png',78,110);
    this.load.spritesheet('wife','assets/images/spritesheet/wife.png',83,123);
      
    // Audio
    this.load.audio('actoIntro','assets/audio/actoIntro.ogg');  
    this.load.audio('alcaldeMusic','assets/audio/alcaldeMusic.ogg');
    this.load.audio('alcaldesaMusic','assets/audio/alcaldesaMusic.ogg');
    this.load.audio('bgmusic','assets/audio/bgmusic.ogg');
    this.load.audio('gameover','assets/audio/gameover.ogg');
    this.load.audio('perdervida','assets/audio/perdervida.ogg');
    this.load.audio('powerup','assets/audio/powerup.ogg');
    this.load.audio('transcpuntos','assets/audio/transcpuntos.ogg');  
    
    
  },

  create:function()
  {
    // Control de zoom del juego - Modo Escalado
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // El juego se centra en las direcciones horizontal y vertical. 
    //this.scale.pageAlignHorizontally = true;
    //this.scale.pageAlignVertically = true;
    // Activa el Zoom   
    //this.scale.setScreenSize(true);
    // Ejecuta el Estado
    this.state.start('StateHistory');
  }
};