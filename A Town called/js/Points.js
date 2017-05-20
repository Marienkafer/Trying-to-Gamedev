/**
  * Caracas Game Jam 2016
  * Team: SoftCakes
  * File: Points.js
  * Se encarga del puntaje del Juego 
**/

City.Points = function(game){};

City.Points.prototype = 
{    
   preload:function()
   {
     this.lifes= new Array;
   },
	
  create:function()
  {   
    this.txtProps = 
    {
      font: "400 20px 'Arial'",
      fill: "#ffffff",
      align: "left"
    };
    this.add.sprite(0,0,'pointScream');
    this.song = this.add.audio('transcpuntos');
    this.song.play();

    this.txtScore = this.add.text(365,235, "", this.txtProps);
    this.txtScore.text =""+points;
    this.txtBonus = this.add.text(310,285, "", this.txtProps);
    this.txtBonus.text =""+points+"    X";
    points+=nLife*100;

    for (i=0; i<nLife; i++)
       this.lifes[i] = this.add.sprite(400+(50*i), 270, 'life');   
  },

  update:function()
  {
    if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
      this.song.stop(); 
      switch(act)
      {
          case 2:
              this.state.start("Acto2");
          break;
          case 3:
              this.state.start("Acto3");
          break;
          case 4:
              this.state.start("Acto4");
          break;
          case 5:
              this.state.start("Acto5");
          break;
          case 6:
              this.state.start("Win");
        break;
      }
    }
  }  
};