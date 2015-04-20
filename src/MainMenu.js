
EPM.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

EPM.MainMenu.prototype = {

	create: function () {
		

	this.world.scale.setTo (gameScale,gameScale);


		EPM.sounds = {
			
			sweep:this.add.audio('sweep'),
			get_points:this.add.audio('get_points'),
			turn:this.add.audio('turn'),
			error:this.add.audio('error'),
			tic:this.add.audio('tic'),
			end:this.add.audio('end'),
			music:this.add.audio('music'),
			music2:this.add.audio('music2'),
			
		}
		
//EPM.sounds.music.stop();
		if(EPM.global.musicOn == false){
			
			EPM.sounds.music2.play(null, 1,1, true, true);
			EPM.global.musicOn=true;
			
		}

		this.stage.backgroundColor = 0xFFFFFF;
		
		this.add_aimated_tutorial_text("WELCOME TO EUROPEAN PARLIAMENT MADNESS !",250,50,500)
	
	
		this.brice1 = this.game.add.sprite(100,100,'cards_atlas','BriceHORTEFEUX.jpg')
		this.brice2 = this.game.add.sprite(660,100,'cards_atlas','BriceHORTEFEUX.jpg')

		this.playButton = new LabelButton(this,360, 100,210,50,10, 'START GAME',{
			font: "30px Courier",
			fill: "#0000FF",
			align: "center"
		},this.startGame,this);
		
		this.highScoreButton = new LabelButton(this,360, 200,210,50,10, 'HIGHSCORES',{
			font: "30px Courier",
			fill: "#0000FF",
			align: "center"
		},EPM.goToHighscoresPage,this);		
		
		this.creditsButton = new LabelButton(this,360, 300,210,50,10, 'CREDITS',{
			font: "30px Courier",
			fill: "#0000FF",
			align: "center"
		},EPM.goToCreditsPage,this);	
		
		this.muteButton = new MuteButton(this,750, 10);
		
		var delay = 100;
		
		slideFadeIn(this, this.playButton,'right',500);
		slideFadeIn(this, this.highScoreButton,'left',500);
		slideFadeIn(this, this.creditsButton,'right',500);
		slideFadeIn(this, this.brice1,'bottom',500);
		slideFadeIn(this, this.brice2,'bottom',500);
		


	},
	
	add_aimated_tutorial_text:function(text,x,y,delay){
		
		var tutorial_text_1 = this.add.text(x,y, text, {
			font: "18px Courier",
			fill: "#000000",
			align: "left"
		});		
		
		tutorial_text_1.x = tutorial_text_1.x-20
		tutorial_text_1.alpha = 0;		
		this.game.add.tween(tutorial_text_1).to( { alpha: 1 }, delay, Phaser.Easing.Quadratic.InOut, true);
		this.game.add.tween(tutorial_text_1).to( { x: '+20' }, delay, Phaser.Easing.Quadratic.InOut, true);		
		
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Tutorial');

	}

};


	
	
	
