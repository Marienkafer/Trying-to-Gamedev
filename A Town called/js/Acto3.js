// Transición para el tercer mundo
var Acto3 = 
{
  preload:function()
  {
    this.add.sprite(0,0,'actThree');		
  },
	
  create:function()
  {
    this.song = this.add.audio('actoIntro');
    this.song.play();
  },

  update:function()
  {
    if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
      this.song.stop();  
      this.state.start("WorldThree");
    }
  }     
};