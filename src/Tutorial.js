
EPM.Tutorial = function (game) {

	this.music = null;
	this.playButton = null;

};

EPM.Tutorial.prototype = {

	create: function () {

		this.stage.backgroundColor = 0xEEEEEE;
		
		this.add_aimated_tutorial_text("WELCOME TO EUROPEAN PARLIAMENT MADNESS 2 !",100,100,500)
	
		this.add_aimated_tutorial_text("- Turn two blue cards by clicking on them \n\n- If they look the same you get +1 hitpoints and +10 of score\n\n- If they don't you loose 1 hitpoints\n\n- The game ends when you have no hit points\n\n- That being said , try to make the best score\n\n- Memorizing the parliament members' faces helps !",100,150,500)


		this.playButton = new LabelButton(this,360, 550,150,50,10, 'PLAY !',{
			font: "30px Courier",
			fill: "#0000FF",
			align: "left"
		},this.startGame,this);
		
		this.muteButton = new MuteButton(this,750, 10);
		
		this.backButton = new SmallButton(this,10, 10,50, 'BACK',{
			font: "14px Courier",
			fill: "#0000FF",
			align: "left"
		},this.backToMenu,this);
			
		
		slideFadeIn(this, this.playButton,'right',200);


	},
	
	add_aimated_tutorial_text:function(text,x,y,delay){
		
		var tutorial_text_1 = this.add.text(x,y, text, {
			font: "20px Courier",
			fill: "#000000",
			align: "left"
		});		
		
		slideFadeIn(this, tutorial_text_1,'left',200);		

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
	
    backToMenu: function (pointer) {
		
		this.playButton.destroy();
		this.muteButton.destroy();
		this.backButton.destroy();

        this.state.start('MainMenu');

    },	

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};


	
	
	
