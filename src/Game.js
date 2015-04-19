
Memory.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
	
	this.phase;
	this.level;
	this.clock;
	this.batch;
	this.grid;
	this.previous_matches;
	this.number_of_matches;
	this.start_number_of_cards;
	this.start_hitpoints;
	this.number_of_cards;
	this.fallen_cards;
	this.previous_hitpoints;
	this.memory_delay;
	this.hitpoints;
	this.cards_info;
	this.card_references
	this.game_banner;
	this.game_info_panel;
	this.hitpoints_text;
	this.score_text;
	this.selector;
	this.profile_window;
	this.profile_name;
	this.profile_text;
	this.fx;

};

Memory.Game.prototype = {

    create: function () {
		
		// ------ LOAD DATA
		
		this.cards_info = this.cache.getJSON('cards_info');
		
		this.card_references = []
		
		this.load_card_refs();
		

		// ------ GAMEPLAY
		
		this.phase = 'intro';
		
		this.level = 0;
		
		Memory.global.score = 0;
		
		this.start_number_of_cards = 6;
		
		this.number_of_cards = this.start_number_of_cards;
		
		this.start_hitpoints = 10;
		
		this.memory_delay = 0;
		
		this.previous_matches = 0;
		
		this.hitpoints = 2//(this.number_of_cards+Math.floor(this.number_of_cards/2))+1 ;
		
		this.previous_hitpoints = 0;
		
		this.number_of_matches = 0;
		
		this.clock = 0;
		
		this.fallen_cards = 0;
		
		// ------ GUI
		
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
		
		this.selector = this.add.sprite(0,0,'cards_atlas','selected.png');
		
		this.profile_window = this.add.group();
		
		this.profile_window.x = 10;
		this.profile_window.y = this.game_banner.height+30;

		this.profile_photo= this.add.sprite(0,0,'cards_atlas','hidden.jpg',this.profile_window);
		
		this.profile_name = '...';
		
		this.profile_text = this.add.text(0, this.profile_photo.height+10, this.profile_name, {
			font: "18px Courier",
			fill: "#000000",
			align: "left"
		},this.profile_window);
		
		
		this.game_info_panel = this.add.group();
		
		this.game_info_panel.x = this.profile_window.width+this.profile_window.x + 40;
		this.game_info_panel.y = this.profile_window.y;

		this.hitpoints_text = this.add.text(5, 5, "hitpoints : "+this.hitpoints, {
			font: "30px Courier",
			fill: "#FF0000",
			align: "left"
		},this.game_info_panel);
		
		this.score_text = this.add.text(5, 40, "score : "+Memory.global.score, {
			font: "30px Courier",
			fill: "#FFAA00",
			align: "left"
		},this.game_info_panel);
		
		this.level_text = this.add.text(500, 5, "level : "+this.level, {
			font: "30px Courier",
			fill: "#000000",
			align: "left"
		},this.game_info_panel);
		
		
		// ------ FX
		
		this.fx = this.add.group();
		
		// ------ START PHYSIC
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.physics.arcade.gravity.y = 1000;
		
		// ------ START LEVEL
		
		this.start_GUI_intro_animation();
		
		this.time.events.add(Phaser.Timer.SECOND * 1,  this.start_game, this);

	
    },
	
	start_GUI_intro_animation:function(){
		
		this.game_info_panel.x = this.game_info_panel.x+20
		this.game_info_panel.alpha = 0;
		this.game.add.tween(this.game_info_panel).to( { alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true);
		this.game.add.tween(this.game_info_panel).to( { x: '-20' }, 500, Phaser.Easing.Quadratic.InOut, true);
		
		this.profile_window.x = this.profile_window.x-20
		this.profile_window.alpha = 0;
		this.game.add.tween(this.profile_window).to( { alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true);
		this.game.add.tween(this.profile_window).to( { x: '+20' }, 500, Phaser.Easing.Quadratic.InOut, true);
		
	},
	
	add_panel: function(x,y,w,h){
		
		
	},
	
	load_card_refs:function(){
		
		for (var i = 0 ; i < this.cards_info.list.length ; i ++){
			
				var card_reference = {
					
					name : this.cards_info.list[i].name,
					nice_name : this.cards_info.list[i].nice_name,
					photo :this.cards_info.list[i].name+'.jpg'
					
				}
				
				this.card_references.push(card_reference);
				
		}
		
	},
	
	start_level:function(l=0){
		
		this.level = l;

		this.number_of_cards = this.start_number_of_cards + (l*2);
		
		if(l=0)Memory.global.score = 0;
		if(l=0)Memory.global.chains = 0;
		
		if(l=0)this.clock = 0;
		
		if(l=0)this.level = 0;
		
		if(l=0)this.hitpoints = (this.start_number_of_cards+Math.floor(this.number_of_cards/2))+1;
		
		if(l>0)this.hitpoints = this.previous_hitpoints;
		
		this.previous_matches = 0;
		
		this.number_of_matches = 0;
		
		this.reset_batch();

		this.fallen_cards = 0;
		
		this.profile_name = '...';
		
		this.grid.x = this.game_info_panel.x
		
		this.grid.y = this.game_info_panel.y + this.game_info_panel.height + 20
		
		this.profile_photo.frameName= 'hidden.jpg';
		
		this.batch.turn_cards()
		
		this.memory_delay = this.number_of_cards*10;
		
		this.update_hitpoints_text();
		
		this.update_score_text();
		
		this.update_level_text();
		
		this.cardA = null;
		
		this.cardB = null;
		
		this.phase = 'intro';
		
		
	},
	
	delete_batch:function(){
		
		if(this.batch != null){
		
			this.batch.flush_cards();
		
		}
		
		if(this.grid != null){
		
			this.grid.destroy();
		
		}
		
	},
	
	reset_batch:function(){
		
		this.delete_batch()
		
		this.grid = this.game.add.group();
		
		this.batch = new Batch(this)		
		
		this.batch.fill(this.number_of_cards);
		
		if(this.game_info_panel != null){
			
			this.batch.place_grid(this.game_info_panel.x,this.game_info_panel.height+20,4,0.6);
			
		}else{
			
			this.batch.place_grid(0,0,4,0.6);
			
		}
		
		
		
	},
	
	next_level: function(){
		
		if(this.level+1 == 11){
			
			this.game_over();
		
		
		}else{
			
			this.start_level(this.level+1)
			
		}
		
	},
	
	start_game:function(){
		
		this.start_level(this.level)
		
	},

    update: function () {
		
		switch (this.phase){

			case 'intro':
			
				this.selector.visible = false;
			
				if(this.batch != null){
					
					if(this.batch.hide_cards_dynamicly(10,function(game){
						
						game.phase = 'play';
						game.selector.x = game.batch.cards[0].sprite.x+game.grid.x;
						game.selector.y = game.batch.cards[0].sprite.y+game.grid.y;
						game.selector.scale.set( game.batch.cards[0].sprite.scale.x,game.batch.cards[0].sprite.scale.y);
						game.selector.visible = true;
						
					}));
				}
				
			break;
				
			case 'play':
			
				Memory.global.timer += 1;
				this.batch.foreach_cards('checkBoundaries')
				
			
			break;
			
			case 'game_over':
			
				this.batch.foreach_cards('checkBoundaries')
			
			break;
		
		}

    },

    quitGame: function (pointer) {
		
		this.delete_GUI()
		
		this.delete_batch()

        this.state.start('ScoreMenu');

    },
	
	
	game_over: function(){
		
		this.batch.flush_cards()
		
		this.phase = "game_over"
		
		this.time.events.add(Phaser.Timer.SECOND * 2,  this.quitGame, this);
		
	},
	

	
	select_card : function(card){
		
		if(this.cardA == null && this.cardB == null){
			
			this.cardA = card;
			this.cardA.turn();
			
			Memory.sounds.turn.play();
			
		}else if(this.cardB == null && card !== this.cardA){
			
			this.cardB = card;
			this.cardB.turn();
			
			if(this.cardA.name == this.cardB.name){
				
				this.cardA.unlock();
				this.cardB.unlock();
				
				
				this.set_current_profile(this.cardB);
				
				var match_score = 10;
				var chain_score = this.previous_matches*5;
				
				Memory.global.score += match_score+chain_score;
				
				this.number_of_matches +=1;		

				this.update_score_text()	
			
				this.add_bonus_fx(this.cardB.sprite.x+this.grid.x+10,this.cardB.sprite.y+this.grid.y+10,"+"+match_score/2)
				this.add_bonus_fx(this.cardA.sprite.x+this.grid.x+10,this.cardA.sprite.y+this.grid.y+10,"+"+match_score/2)

				if(chain_score>0){
					
					this.add_bonus_fx(this.cardB.sprite.x+this.grid.x+10,this.cardB.sprite.y+this.grid.y+45,"+"+chain_score,"#AAFF00")
					Memory.global.chains++;
					
				}	
				
				this.fallen_cards +=2;

				if(this.fallen_cards >= this.number_of_cards){

					this.time.events.add(Phaser.Timer.SECOND * 2,  this.next_level, this);

				}
				
				this.add_hitpoints(+1);
				
				this.previous_matches += 1;
				
				Memory.sounds.get_points.play();
			
			}else{
				
				
				if(this.hitpoints>0){
					
					this.add_hitpoints(-1);
					
				}else{
					
					this.game_over();
				}
				

				
				this.previous_matches = 0;
				
				Memory.sounds.error.play();
				
			}
			
			
			
		}else if(this.cardA != null && this.cardB != null){
			
			if(this.cardA.name == this.cardB.name){
			
				this.cardA = null;
				this.cardB = null;
				
				
				this.cardA = card;
				this.cardA.turn();

				
			}else{
				
				this.cardA.hide();
				this.cardB.hide();
				
				this.cardA = null;
				this.cardB = null;	
				
				this.cardA = card;
				this.cardA.turn();
				
			}
			
			
			Memory.sounds.turn.play();
		
			
		}
		
		this.previous_hitpoints = this.hitpoints;
		
		

	},
	
	set_current_profile:function(card){
		
		this.profile_photo.frameName = card.name+'.jpg';
		this.profile_name= card.nice_name;
		this.update_profile_text();
	
	},
	
	pick_random_card_ref : function(nb){
		
		var selected_card_refs = [];
		
		for ( var i = 0 ; i < nb ; i ++){
			
			var random_card_ref = this.card_references.randomElem();

			
			while(i>0 && selected_card_refs.contains(random_card_ref)){
				
				random_card_ref = this.card_references.randomElem();
				
			}
				
			selected_card_refs.push(random_card_ref)
			
			
		}
		
		
		return selected_card_refs;
		
	},
	
	add_hitpoints : function (n){
		
		this.hitpoints += n;	
		var sign = "";
		if(n>0)sign = "+";
		this.add_bonus_fx(this.hitpoints_text.world.x+this.hitpoints_text.width+10,this.hitpoints_text.world.y,sign+n,"#FF0000")
		this.update_hitpoints_text();
		
	},
	
	update_hitpoints_text : function(){
		
		 this.hitpoints_text.setText("hitpoints : "+this.hitpoints);
		
	},
	
	update_score_text : function(){
		
		 this.score_text.setText("score : "+Memory.global.score);
		
	},
	
	update_level_text : function(){
		
		 this.level_text.setText("level : "+this.level);
		
	},
	
	update_profile_text : function(){
		
		 this.profile_text.setText(this.profile_name);
		
	},
	
	add_bonus_fx: function(x,y,text,color="#FFAA00",size="70px"){

		this.world.bringToTop(this.fx)
		
		var bonus_fx =  this.add.text(x,y, text, {
			font: "30px Arial",
			fill: color,
			align: "left"
		},this.fx);
		
		
		bonus_fx.alpha = 1;

		var disappear = this.add.tween(bonus_fx).to( { alpha: 0 }, 1000, Phaser.Easing.Quadratic.In, true);
		var moveup = this.add.tween(bonus_fx).to( { y: '-20' }, 500, Phaser.Easing.Quadratic.Out, true);
		
		disappear.onComplete.add(function(){
			bonus_fx.destroy();
			disappear=null;
			moveup=null;
		},this)

		this.fx.bringToTop(bonus_fx)
		
	},
	
	delete_GUI:function(){
		
		this.game_info_panel.destroy();
		this.profile_window.destroy();
		this.grid.destroy();
		
	}



};

function Card(game,name,nice_name){
	
	this.game = game;
	this.name = name;
	this.nice_name = nice_name;
	this.placed = false;
	this.hidden = true;
	this.unlocked = false;
	this.falling = false;
	this.sprite = this.game.add.sprite(0,0,'cards_atlas',this.name+'.jpg')
	
	this.init = function(){

		this.sprite.visible = true;
		this.hide();
		this.sprite.inputEnabled = true;
		this.sprite.input.useHandCursor = true; //if you want a hand cursor
		this.sprite.events.onInputOver.add(function(){
			
			if(this.game.phase == 'play'){
				this.game.selector.x = this.sprite.x + this.game.grid.x;
				this.game.selector.y = this.sprite.y + this.game.grid.y;
				this.game.selector.scale.set( this.sprite.scale.x,this.sprite.scale.y);
			}
			
		}, this);

		this.sprite.events.onInputDown.add(function(){
			
			if(this.game.phase == 'play'){
				if(this.unlocked == false && this.hidden == true){
					this.game.select_card(this);
				}
			}
			
		}, this);

	}
	this.hide = function(){
		
		this.sprite.frameName = 'hidden.jpg';
		this.hidden = true;
		//this.sprite.frame = this.name+'jpg';
		
	}
	this.turn = function(side='face'){
		
		switch(side){
			
			case 'face':
			
				this.sprite.frameName = this.name+'.jpg';
				this.hidden = false;
				
			break;
			
			case 'back':
			
				this.sprite.frameName = 'hidden.jpg';
				this.hidden = true;
				
			break;
			
		}
			
		
		this.hidden = false;
		
	}
	this.unlock = function(){
			
		this.unlocked = true
		this.fall();

		
	}
	
	this.fall = function(){
		
		this.game.physics.arcade.enable(this.sprite)
		this.game.physics.arcade.enable(this.sprite)
		
		this.sprite.body.angularVelocity += (Math.random()*180)-90;
		
		this.game.grid.bringToTop(this.sprite);	

		this.falling = false;
			
		
	}

	this.kill = function(){
		
		this.sprite.kill();
		this.sprite.destroy();
		
	}
	
	this.checkBoundaries = function(){
		
		var margin = 100
		
		if(this.sprite.x>this.game.width+margin ||this.sprite.y>this.game.height+margin ||this.sprite.x<0-margin||this.sprite.y<0-margin){
			
			this.kill();
			
		}
		
		
	}

	
}

function Batch(game){
	
	
	this.game = game;
	
	this.width = 0;
	this.height = 0;
	this.cards = [];

	this.fill = function(nb,shuffle=true){
		
		var random_card_refs = this.game.pick_random_card_ref(nb/2);
		
		for (var i = 0 ; i < random_card_refs.length ; i ++){
			
			var cardA = new Card(this.game,random_card_refs[i].name,random_card_refs[i].nice_name);
			var cardB = new Card(this.game,random_card_refs[i].name,random_card_refs[i].nice_name);
			cardA.init();
			cardB.init();
			
			this.cards.push(cardA)
			this.cards.push(cardB)
			
			
		}
		
		if(shuffle)this.cards.shuffle();
		
	}
	
	this.shuffle = function(){
		
		this.cards.shuffle();
		
	}
	
	this.place_grid = function(x,y,cols=4,s=1){
		
		var row = 0 ; 
		var col = 0;
		var margin = 10;
		var width = 0;
		var height= 0;
		
		for (var i = 0 ; i < this.cards.length ; i ++){
			
			this.card
			this.cards[i].sprite.scale.set(s);
			this.cards[i].sprite.x = (col*170*s)+(col*margin);
			this.cards[i].sprite.y = (row*215*s)+(row*margin);	
			this.game.grid.add(this.cards[i].sprite);
			
			this.cards[i].sprite.alpha = 0;
			
			if(col>cols){

				col = 0;
				row++;
				
			}else{			
				col++;
			}		
			
		}

		this.game.grid.x = x 
		this.game.grid.y = y 
		
		
	}
	
	this.foreach_cards = function(f){
		
		for (var i = 0 ; i < this.cards.length ; i ++){
			
			this.cards[i][f]()
			
		}			
		
	}
	
	this.flush_cards = function(){
		
		

		for (var i = 0 ; i < this.cards.length ; i ++){
			
			this.cards[i].fall();
			
		}
		
		this.cards = [];
	}

	this.hide_cards = function(){
		
		

		for (var i = 0 ; i < this.cards.length ; i ++){
			

			this.cards[i].hide();

			
		}
		

	}
	
	this.turn_cards = function(side='face'){
		
		

		for (var i = 0 ; i < this.cards.length ; i ++){
			
			this.cards[i].turn(side);
			
		}
		

	}
	
	
	this.turn_cards = function(){

		for (var i = 0 ; i < this.cards.length ; i ++){
			
			this.cards[i].turn();
			
		}
		

	}
	
	var hide_index=0;
	var turn_index=0;

	var hide_animation_frame=0;
	
	var hide_animation_over = false;
	
	this.hide_cards_dynamicly = function(speed=1000,onComplete){
		
		var animation_speed=speed;	
			
			if(hide_animation_over == false){
				
			
				if(turn_index < this.cards.length){
					

					if(hide_animation_frame%animation_speed==0){
						
						this.cards[turn_index].sprite.y += -30;
						
						this.game.add.tween(this.cards[turn_index].sprite).to( { alpha: 1 }, 200, Phaser.Easing.Quadratic.In, true);
						this.game.add.tween(this.cards[turn_index].sprite).to( { y:'+30' }, 200, Phaser.Easing.Quadratic.In, true);
						turn_index++;
						
						Memory.sounds.sweep.play();
						
					}
					
					
					
				}else{
					
					if(hide_animation_frame > this.game.memory_delay){
						
						if(hide_index < this.cards.length){
						

							if(hide_animation_frame%animation_speed==0){
								
								this.cards[hide_index].hide();
								hide_index++;
								
								Memory.sounds.turn.play();
								
							}
						
						}else{
						
							hide_index = 0;
							
							if(onComplete!=null){
							
								onComplete(this.game);
								hide_animation_over = true;
								
							}
						
						}
					
					}
					
				}
			
			
			
			hide_animation_frame++;
		}
		
	}
	
	
}

function randomElem(){

}

Array.prototype.contains = function(elem)
{
   for (var i in this)
   {
	   if (this[i] == elem) return true;
   }
   return false;
}

Array.prototype.randomElem = function()
{
	var randomIndex = Math.floor(Math.random()*this.length);
	return this[randomIndex];

}

Array.prototype.shuffle = function() {
  var m = this.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = this[m];
    this[m] = this[i];
    this[i] = t;
  }
}
