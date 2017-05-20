var Win = {
	preload:function()
	{
		
			this.add.sprite(0,0,'win');
		
			
		
	},
	
	create:function()
	{
        this.song = this.add.audio('transcpuntos');
        this.song.play();
    },

	update:function(){

	
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
	        this.song.stop();  
            this.state.start("StateCredits");
	     }
    }     
};