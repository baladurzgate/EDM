		console.log(EPM.sounds)
EPM.ScoreMenu = function (game) {

	this.playButton = null;
	this.final_score = 0;

};

EPM.ScoreMenu.prototype = {

	create: function () {
		
		this.muteButton = new MuteButton(this,750, 10);
		
		this.quitButton = new SmallButton(this,670, 10,50, 'QUIT',{
			font: "14px Courier",
			fill: "#0000FF",
			align: "left"
		},this.quit,this);

		var cheer_message = ""
		
		if(EPM.global.score>0 && EPM.global.score<30){
			
			cheer_message = "bien ouej !"
			
		}else if(EPM.global.score>30 && EPM.global.score<100){
			
			cheer_message = "das ist gut !"
		}else if(EPM.global.score>100 && EPM.global.score<300){
			
			cheer_message = "how impressive !"
		}else if(EPM.global.score>300 && EPM.global.score<600){
			
			cheer_message = "GG !"
		}else if(EPM.global.score>600 && EPM.global.score<1000){
			
			cheer_message = "oh lala !"
		}else if(EPM.global.score>1000 && EPM.global.score<2000){
			
			cheer_message = "muy bueno !"
		}else if(EPM.global.score>2000 && EPM.global.score<3000){
			
			cheer_message = "you know them all right ?"
		}
		
		this.cheer_text = this.add.text(10,10, cheer_message, {
			font: "40px Courier",
			fill: "#0000FF",
			align: "left"
		});
		
		
		
		this.final_score_text = this.add.text(10,75, "FINAL SCORE : 0", {
			font: "40px Courier",
			fill: "#DD9900",
			align: "left"
		});
		
		
		this.name_field = this.add.text(10,130, "YOUR_NAME-", {
			font: "40px Courier",
			fill: "#000000",
			align: "left"
		});
	
		

		this.playButton = new LabelButton(this,650, 300,230,60,5, 'TRY AGAIN!',{
			font: "30px Courier",
			fill: "#FF0000",
			align: "left"
		},this.startGame,this);
		
		this.submitButton = new LabelButton(this,680, this.final_score_text.y,200,40,5, 'SUBMIT SCORE!',{
			font: "20px Courier",
			fill: "#0000FF",
			align: "left"
		},this.submitScore,this);
		
		
		this.submitLegend = this.add.text(this.submitButton.x-10,this.submitButton.y+55, "(enter a name to submit)", {
			font: "15px Courier",
			fill: "#0000FF",
			align: "left"
		});
		
		this.submitLegend.visible = false;
		
		//this.submitButton.addChild(this.submitLegend)
	
		
		
		slideFadeIn(this, this.final_score_text,'top',500);
		slideFadeIn(this, this.playButton,'right',500);
		slideFadeIn(this, this.submitButton,'right',500);
		slideFadeIn(this, this.name_field,'left',500);
		
		
		/*--------------SUBMIT_PANEL---------------*/
		
		this.submit_panel = this.add.group();


		this.K = new VirtualKeyboard(this,0,80,{
			font: "30px Courier",
			fill: "#000000",
			align: "left"
		},10,this.name_field,EPM.sounds.tic)
		
		this.submit_panel.add(this.K )
		

		

		this.submit_panel.x = 10;
		this.submit_panel.y = 320;
		
		console.log(EPM.global.score)
		console.log('hi')
		
		this.displayed_chains_score = EPM.global.chains*2;
		this.displayed_timer = 0;
		this.displayed_final_score = 0;
		
		slideFadeIn(this, this.submit_panel,'bottom',500);

		this.stats = this.drawStats(10,300,400,100);
		slideFadeIn(this, this.stats,'left',500);
    

	},

	update: function () {

		this.animate_score();

	},
	
	animation_frame:0,
	
	animate_score:function(animation_speed=3){
		
		if(this.displayed_final_score < EPM.global.score){
			
			if(this.animation_frame%animation_speed==0){
			
				this.final_score_text.setText("FINAL SCORE : "+this.displayed_final_score);
				this.displayed_final_score+=5;
				EPM.sounds.get_points.play();
			
			}
			
			this.animation_frame++
			
			
		}else{
			
			EPM.global.final_score = this.displayed_final_score;
		}
		
		
		
	},
	
	cleanStage: function(){
		
		this.muteButton.destroy();
		this.quitButton.destroy();
		this.final_score_text.destroy();
		this.playButton.destroy();
		this.submit_panel.destroy();
		this.K.destroy();
		
	},
	

	startGame: function (pointer) {

		this.cleanStage();
		this.state.start('Game');

	},
	
	quit: function (pointer) {

		this.cleanStage();
		this.state.start('MainMenu');

	},
	
	submitScore:function(){
		
		if(this.K.message != "" && this.name_field.text != "YOUR_NAME-"){
			
			console.log(this.K.message)
		
			sendToDataBase({name:this.K.message,score:EPM.global.final_score,stats:EPM.global.stats.hitpoints.toString()},function(r){
				EPM.goToHighscoresPage();
			})
			
		}else{
			
			this.submitLegend.visible = true;
		}
		
		
	},
	
	drawStats:function(x,y,w,h){
		
		var stats = this.add.group();
		
		var name_field = this.add.text(x,y+5, "hitpoints stats", {
			font: "14px Courier",
			fill: "#FF0000",
			align: "left"
		},stats);
		
		
		var hitpoints_stats = this.add.graphics(0,0);
		
		stats.add(hitpoints_stats);
		
		var hs = EPM.global.stats.hitpoints;
		
		hitpoints_stats.lineStyle(2, 0xFF0000, 1);
		
		var step =Math.floor(w/hs.length);
		
		for(var i = 0 ; i < hs.length ; i ++){
		
			if(i==0){
				
				 hitpoints_stats.moveTo(x+(i*step),y-(hs[i]*3));
				 
			}else{

				hitpoints_stats.lineTo(x+(i*step),y-(hs[i]*3));
			
			}
			
		}

		return stats;
		
	}

};
