City.StateCredits = function(game){};

City.StateCredits.prototype =
{  
  create:function () 
  {
    var w = this.world.width;
    var h = this.world.height;
    this.bg = this.add.sprite(0,0, 'black');

    this.credits = this.add.sprite(-30,600, 'credits');
    this.cw = this.add.audio('cw');

   this.cw.loopFull(0.6);
    this.add.tween(this.credits).to( { y: -2000}, 50000, Phaser.Easing.Linear.InOut, true, 0, 0, false);

    this.credits.alpha = 1;
    this.bg.alpha = 1;
    this.time.events.add(68000, function() {
    this.add.tween(this.bg).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.add.tween(this.credits).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.cw.fadeOut();this.cw.stop();this.state.start('StateStart'); 
    }, this);
     
  }
};
    