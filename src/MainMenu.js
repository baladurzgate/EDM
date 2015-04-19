
Memory.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

Memory.MainMenu.prototype = {

	create: function () {
		

		Memory.sounds = {
			
			sweep:this.add.audio('sweep'),
			get_points:this.add.audio('get_points'),
			turn:this.add.audio('turn'),
			error:this.add.audio('error')
			
		}

		this.stage.backgroundColor = 0xEEEEEE;
		
		this.game_banner = this.add.group();
		this.game_banner.y = 10;
		
		var rectange = this.add.graphics(0, 0);
		rectange.lineStyle(3, 0x0000FF, 3);
		rectange.drawRect(0, 0, this.world.width , 50 );
		this.game_banner.add(rectange)
		
		this.title_text = this.add.text(10,10, "European Deputy Madness 2 !", {
			font: "30px Courier",
			fill: "#000000",
			align: "left"
		},this.game_banner);
		
		this.game_banner.y = this.game_banner.y-20
		this.game_banner.alpha = 0;
		this.game.add.tween(this.game_banner).to( { alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true);
		this.game.add.tween(this.game_banner).to( { y: '+20' }, 500, Phaser.Easing.Quadratic.InOut, true);
		
		this.add_aimated_tutorial_text("WELCOME TO EUROPEAN DEPUTY MADNESS 2 !",10,100,500)
	
		this.add_aimated_tutorial_text("-Retournez deux cartes bleues de votre choix.\n\n-Si celles ci sont identiques vous gagnez 1 pts de vie.\n\n-Si elles  sont differentes vous perdez 1 pts de vie \n\n-Une fois que toute les cartes sont eliminées le joueur passe au niveau suivant.\n\n-Il conserve alors ses pts de vie.\n\n-Chaque double decouvert rapporte 10 pts de score.\n\n-Chaque chaine de double rapporte +5 pts de score.\n\n-Le joueur gagne lorsqu'il arrive au niveau 10",10,150,500)


		this.playButton = new LabelButton(this,360, 550,150,50,10, 'PLAY !',{
			font: "30px Courier",
			fill: "#000000",
			align: "left"
		},this.startGame,this);
		

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
		this.state.start('Game');

	}

};
