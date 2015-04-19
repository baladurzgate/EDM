
Memory.ScoreMenu = function (game) {

	this.playButton = null;
	this.final_score = 0;

};

Memory.ScoreMenu.prototype = {

	create: function () {

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
		
		this.final_score_text = this.add.text(10,75, "FINAL SCORE : 0", {
			font: "70px Courier",
			fill: "#DD9900",
			align: "left"
		},this.game_banner);

		this.playButton = new LabelButton(this,10, 200,300,40,10, 'PLAY AGAIN!',{
			font: "30px Courier",
			fill: "#FF0000",
			align: "left"
		},this.startGame,this);
		
		
		/*--------------SUBMIT_PANEL---------------*/
		
		this.submit_panel = this.add.group();

		this.name_field = this.add.text(0,5, "YOUR_NAME-", {
			font: "50px Courier",
			fill: "#000000",
			align: "left"
		},this.game_banner);
		
		this.submit_panel.add(this.name_field)
		
		this.K = new VirtualKeyboard(this,0,80,{
			font: "30px Courier",
			fill: "#000000",
			align: "left"
		},10,this.name_field,Memory.sounds.turn)
		
		this.submit_panel.add(this.K )
		
		this.submitButton = new LabelButton(this,355, 0,250,40,10, 'SUBMIT SCORE!',{
			font: "30px Courier",
			fill: "#000000",
			align: "left"
		},this.submitScore,this);
		
		this.submit_panel.add(this.submitButton)
		
		this.submit_panel.x = 10;
		this.submit_panel.y = 320;
		

		
		console.log(Memory.global.score)
		console.log('hi')
		
		this.displayed_chains_score = Memory.global.chains*2;
		this.displayed_timer = 0;
		this.displayed_final_score = 0;

	},

	update: function () {

		this.animate_score();

	},
	
	animation_frame:0,
	
	animate_score:function(animation_speed=3){
		
		if(this.displayed_final_score < Memory.global.score){
			
			if(this.animation_frame%animation_speed==0){
			
				this.final_score_text.setText("FINAL SCORE : "+this.displayed_final_score);
				this.displayed_final_score+=5;
				Memory.sounds.get_points.play();
			
			}
			
			this.animation_frame++
			
			
		}else{
			
			Memory.global.final_score = this.displayed_final_score;
		}
		
		
		
	},
	

	startGame: function (pointer) {


		this.state.start('Game');

	},
	
	submitScore:function(){
		
		if(this.K.message != "" && this.name_field.text != "YOUR_NAME-"){
			
			console.log(this.K.message)
		
			sendToDataBase({name:this.K.message,score:Memory.global.final_score},function(r){
				window.location.href = "score.php";
			})
			
		}
		
		
	}

};
