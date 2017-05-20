
var GameOver = {
	preload:function()
	{
		
			this.add.sprite(0,0,'gameOver');
		
			
		
	},
	
	create:function()
	{
        this.song = this.add.audio('gameover');
        this.song.play();
    },

	update:function(){

	
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
	        this.song.stop();  
            this.state.start("StateStart");
	     }
    }     
};