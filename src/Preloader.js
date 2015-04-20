
EPM.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
	


};

EPM.Preloader.prototype = {
	


	preload: function () {
		
		this.stage.backgroundColor = 0xEEEEEE;
		
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
		
		this.load.setPreloadSprite(this.preloadBar);

		this.load.atlas('playButton', 'assets/images/playbutton.png', 'assets/images/playbutton.json');
		this.load.atlas('cards_atlas', 'assets/images/cards_atlas_2.png', 'assets/images/cards_atlas_2.json');
		this.load.json('cards_info','assets/data/cards_info_2.json')
		
		this.load.audio('sweep', 'assets/sounds/sweep.mp3');
		this.load.audio('get_points', 'assets/sounds/get_points.mp3');
		this.load.audio('turn', 'assets/sounds/turn.ogg');
		this.load.audio('error', 'assets/sounds/error.wav');
		this.load.audio('tic', 'assets/sounds/tic.ogg');
		this.load.audio('end', 'assets/sounds/end.ogg');
		this.load.audio('music', 'assets/sounds/elevator_music.ogg');
		this.load.audio('music2', 'assets/sounds/loundge_music.ogg');


	},

	create: function () {
		
		this.preloadBar.cropEnabled = false;
		this.state.start('MainMenu');

	},


};


