//start screen you want to play or you want to learn how to play?
var stateStart = {
    
    preload: function() {
        
        game.load.image('tittleSpan', 'img/title_span.png');
        game.load.image('startSpan', 'img/startbutton_span.png');
        game.load.image('controlSpan', 'img/controlsbutton_span.png');
    },
    
    create: function() {
        
        var w = game.world.width;
        var h = game.world. height;
        this.tittle=game.add.sprite(40,280,'tittleSpan');
        this.startBtn=game.add.button(700, 450, 'startSpan', this.actionOnClickStart); // add action to button
        this.controlBtn=game.add.button(657, 550, 'controlSpan', this.actionOnclickTutorial);
        game.stage.backgroundColor = "#F0F2DE";
        
    },
        
    actionOnClickTutorial: function() {
        game.state.start("tutorial"); //start a state if button clicked
    },
        
    actionOnClickStart: function() {
        game.state.start("begin");
    },
    
   
    
};