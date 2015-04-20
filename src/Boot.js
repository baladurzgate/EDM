
var gameScale = 0.8;

var EPM = {
	
	global : {
		
		mute: false,
		timer:0,
		chains:0,
		score: 0,
		final_score:0,
		bestScore: 100,
		stats:{
			hitpoints:[],
			
		},
		musicOn:false
		
	},
	
	sounds:{},
	
	goToHighscoresPage:function(){
		
		window.location.href = "highscores.php";
		
	},
	
	openHighscoresPage:function(){
		
		window.open('highscores.php', '_blank');
		
	},
	
	goToCreditsPage:function(){
		
		window.location.href =('credits.html');
		
	}
	
	
	
};

	


EPM.Boot = function (game) {

};

EPM.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 860, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        this.load.image('preloaderBar', 'assets/images/preloader_bar.png');

    },

    create: function () {
		
		this.stage.backgroundColor = 0xEEEEEE;

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};

var LabelButton = function(game, x, y,w,h,padding,label, style,callback,callbackContext){
	
    var button = game.add.button(x, y, null, callback, callbackContext, null,null, null);

	var rectangle = game.add.graphics(0, 0);
	rectangle.lineStyle(3, 0x0000FF, 3);
	rectangle.beginFill(0xFFFFFF);
	rectangle.drawRect(0, 0, w+padding, h+padding );
	rectangle.endFill();
	
    var label = new Phaser.Text(game, padding, padding, label, style);


	button.animation = game.add.tween(button).to( { y:'+10' }, 100, Phaser.Easing.Quadratic.Out).to( { y:'-10' }, 100, Phaser.Easing.Quadratic.Out);
	
	button.onInputDown.add(function(b){
			
		b.animation.start();
		if(EPM.sounds.tic!=undefined)EPM.sounds.tic.play();
		
	});
	
	button.addChild(rectangle)

    button.addChild(label);
	
	
	label.x = Math.floor(button.width / 2);
    label.y = Math.floor(button.height / 2);
	
	return button;
	
};

var SmallButton = function(game, x, y,w,label,style,callback,callbackContext){
	
    var button = game.add.button(x, y, null, callback, callbackContext, null,null, null);
	
	var h = 20;
	
	var padding = 5;

	var rectangle = game.add.graphics(0, 0);
	rectangle.lineStyle(2, 0x0000FF, 2);
	rectangle.beginFill(0xFFFFFF);
	rectangle.drawRect(0, 0, w+padding, h+padding );
	rectangle.endFill();
	
	button.animation = game.add.tween(button).to( { y:'+10' }, 100, Phaser.Easing.Quadratic.Out).to( { y:'-10' }, 100, Phaser.Easing.Quadratic.Out);
	
	button.onInputDown.add(function(b){
			
		b.animation.start();
		if(EPM.sounds.tic!=undefined)EPM.sounds.tic.play();
		
	});
	
    var label = new Phaser.Text(game, padding, padding, label, style);
	
	button.addChild(rectangle)

    button.addChild(label);
	
	return button;
	

	
};


function VirtualKeyboard(game,x,y,style,charLimit=10,outputText=null,sound=null){
	
	var keyboard = game.add.group();
	
	keyboard.x = x
	keyboard.y = y
	
	var row = 0 ; 
	var col = 0;
	var w = 60;
	var h = 60;
	var padding = 15;
	var margin = 30;
	var col_nb = 8;
	
	keyboard.message = "";
	
	this.outputText = outputText;
	
	var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","_","del"]
	
	for (var i = 0 ; i < alphabet.length ; i++){
		
		var button = game.add.sprite((col*w)+(col*margin), (row*h)+(row*margin), null);
		
		button.inputEnabled = true;
		
		button.letter = alphabet[i];
		
		button.active = true;

		var rectangle = game.add.graphics(0, 0);
		rectangle.lineStyle(3, 0x0000FF,3);
		rectangle.beginFill(0xFFFFFF);
		rectangle.drawRect(0, 0, w+padding, h+padding );
		rectangle.endFill();
		
		var label = new Phaser.Text(game, padding, padding, alphabet[i], style);
		
		button.addChild(rectangle)

		button.addChild(label);
		
		button.animation = game.add.tween(button).to( { y:'+10' }, 100, Phaser.Easing.Quadratic.Out).to( { y:'-10' }, 100, Phaser.Easing.Quadratic.Out);
		
		button.animation.onComplete.add(function(){this.active = true;},button)
		
		button.events.onInputDown.add(function(b){
			
			if(b.active){
			
				b.animation.start();
				
				if(sound!=null) sound.play();
				
				if(b.letter != 'del'){
					if(keyboard.message.length<charLimit){
						keyboard.message += b.letter

					}
				
				}else{
					
					if(keyboard.message.length>0){
						
						var cut_message = keyboard.message.substring(0,keyboard.message.length-1);
						
						keyboard.message = cut_message;

					}
					
				}
				
				this.update_output();
				
				b.active = false;
				
				if(EPM.sounds.tic!=undefined)EPM.sounds.tic.play();
			
			}

		},this);
			
		if(col>col_nb){

			col = 0;
			row++;
			
		}else{			
			col++;
		}		

		keyboard.add(button);
		
	}
	
	
	if(outputText == null){
		
		this.outputText = new Phaser.Text(game,0, -50, "...", style);
		keyboard.add(this.outputText);
		
	}
	
	
	this.update_output = function(){
		
		var outputMessage = keyboard.message
		
		for(var t = 0 ; t < charLimit - keyboard.message.length;t++){
			
			 outputMessage += "-";
		}
		this.outputText.setText(outputMessage)
		
	}
	
	return keyboard;
	
	
	
}


function MuteButton(game,x,y){
	
	var button = game.add.sprite(x, y, null);;
	
	button.x = x
	button.y = y
	
	var w = 130;
	var h = 20;
	
	var padding = 5;
	
	var rectangle = game.add.graphics(0, 0);
	rectangle.lineStyle(2, 0x0000FF,2);
	rectangle.beginFill(0xFFFFFF);
	rectangle.drawRect(0, 0, w+padding, h+padding );
	rectangle.endFill();
	
	button.addChild(rectangle);
	
	var label = new Phaser.Text(game, padding, padding, "MUTE SOUNDS",{
			font: "15px Courier",
			fill: "#0000FF",
			align: "left"
	});		
	
	button.addChild(label)
	
	button.animation = game.add.tween(button).to( { y:'+10' }, 100, Phaser.Easing.Quadratic.Out).to( { y:'-10' }, 100, Phaser.Easing.Quadratic.Out);
	
	button.inputEnabled = true;
	
	button.events.onInputDown.add(function(b){
		
		if(game.sound.mute == false){
			
			b.animation.start();
			b.on();
			game.sound.mute = true;

			
		}else{
			
			b.animation.start();
			b.off();
			game.sound.mute = false;
		}
		
		

	},this);
	
	button.on = function(){
		
			rectangle.clear();
			rectangle.lineStyle(2, 0xFF0000,2);
			rectangle.beginFill(0xFFFFFF);
			rectangle.drawRect(0, 0, w+padding, h+padding );
			rectangle.endFill();
			label.setText("UNMUTE SOUNDS");	
		
	}
	
	button.off = function(){

			rectangle.clear();
			rectangle.lineStyle(2, 0x0000FF,2);
			rectangle.beginFill(0xFFFFFF);
			rectangle.drawRect(0, 0, w+padding, h+padding );
			rectangle.endFill();
			label.setText("MUTE SOUNDS");	
		
	}
	
	button.init = function(){
	
		if(game.sound.mute){
			
			button.on();
			
		}else{
			
			button.off();
		}
	
	}
	
	
	button.init();			

	return button;
	
}

function ChangeStateButton(game,x,y,callback,state,text){
	
	var button = game.add.sprite(x, y, null);;
	
	button.x = x
	button.y = y
	
	var w = 50;
	var h = 20;
	
	var padding = 5;
	
	var rectangle = game.add.graphics(0, 0);
	rectangle.lineStyle(2, 0x0000FF,2);
	rectangle.beginFill(0xFFFFFF);
	rectangle.drawRect(0, 0, w+padding, h+padding );
	rectangle.endFill();
	
	button.addChild(rectangle);

	var label = new Phaser.Text(game, padding, padding, text,{
			font: "15px Courier",
			fill: "#0000FF",
			align: "center"
	});		
	
	button.addChild(label)
	
	button.animation = game.add.tween(button).to( { y:'+10' }, 100, Phaser.Easing.Quadratic.Out).to( { y:'-10' }, 100, Phaser.Easing.Quadratic.Out);
	
	button.animation.onComplete.add(function(){this.changeState();},this)
	
	button.inputEnabled = true;
	
	button.events.onInputDown.add(function(b){
		
			b.animation.start();

	},this);
	
	this.changeState = function(context){
		
		callback();
		game.state.start(state);
		
	}
	
	return button;
	
}

function slideFadeIn(game,sprite,from,delay){
	
	switch(from){
		case 'left':
			sprite.x = sprite.x-20
			sprite.alpha = 0;		
			game.add.tween(sprite).to( { alpha: 1 }, 200, Phaser.Easing.Quadratic.InOut, true);
			game.add.tween(sprite).to( { x: '+20' }, 200, Phaser.Easing.Quadratic.InOut, true);				
		break;
		case 'right':
			sprite.x = sprite.x+20
			sprite.alpha = 0;		
			game.add.tween(sprite).to( { alpha: 1 }, 200, Phaser.Easing.Quadratic.InOut, true);
			game.add.tween(sprite).to( { x: '-20' }, 200, Phaser.Easing.Quadratic.InOut, true);				
		
		break;
		case 'top':
			sprite.y = sprite.y-20
			sprite.alpha = 0;		
			game.add.tween(sprite).to( { alpha: 1 }, 200, Phaser.Easing.Quadratic.InOut, true);
			game.add.tween(sprite).to( { y: '+20' }, 200, Phaser.Easing.Quadratic.InOut, true);				
		break;
		case 'bottom':
			sprite.y = sprite.y+20
			sprite.alpha = 0;		
			game.add.tween(sprite).to( { alpha: 1 }, 200, Phaser.Easing.Quadratic.InOut, true);
			game.add.tween(sprite).to( { y: '-20' }, 200, Phaser.Easing.Quadratic.InOut, true);				
		
		break;
	}
	

	
}
	

	
	

function sendToDataBase(data,complete=function(r){console.log(r.responseText);}){
	
	$.ajax({
		type: 'POST',
		url: "src/score_database.php",
		data: data,
		complete:complete
	});
	
}

