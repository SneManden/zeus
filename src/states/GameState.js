import Player from 'objects/Player';
import Zeus from 'objects/Zeus';

class GameState extends Phaser.State {

	preload() {

	}

	create() {
		let g = this.game;

		g.stage.backgroundColor = "#8ed5ed"; // baby blue

		// Setup physics
		g.physics.startSystem(Phaser.Physics.ARCADE);
		g.physics.arcade.gravity.y = 300;
		g.physics.arcade.checkCollision.left = false;
		g.physics.arcade.checkCollision.right= false;


		// Player
		let player = this.player = new Player(g, g.world.width/2, 160, "player");
		// Zeus
		let zeus = this.zeus = new Zeus(g, 32, 32, "zeus");
		zeus.player = player;
		player.zeus = zeus;
		// Bulls
		let bulls = this.bulls = g.add.group();
		bulls.enableBody = true;
		for (var i=0; i<20; i++) {
			var bull = bulls.create(g.world.randomX, g.world.height-100, 'bull');
			bull.bid = i;
			bull.body.setSize(32, 24, 8, 6);
			bull.body.collideWorldBounds = true;
			bull.body.gravity.y = 1000;
			bull.body.maxVelocity.y = 1600;
			bull.dying = false;
			bull.kill();
			bull.animations.add('right', [0,1], 10, true);
			bull.animations.add('left', [3,4], 10, true);
			bull.explode = function(xmin=-500,xmax=500,ymin=-1200,ymax=-600) {
				this.body.collideWorldBounds = false;
				this.body.velocity.x = this.game.rnd.integerInRange(xmin,xmax);
				this.body.velocity.y = this.game.rnd.integerInRange(ymin,ymax);
				this.dying = true;
			}
			bull.die = function() {
				this.dying = true;
				this.body.velocity.x = 0;
				this.animations.stop('right');
				this.animations.stop('left');
				this.frame = 2;
			}
		}
		g.time.events.add(500, this.addBull, this);
	}

	addBull() {
		let xpos = this.game.rnd.pick([-50,this.game.world.width+50])
		let bull = this.bulls.getFirstDead(false, xpos, this.game.world.height-100);
		if (bull != null) {

			bull.body.collideWorldBounds = true;
			bull.dying = false;
			bull.body.velocity.y = 0;
			bull.body.velocity.x = this.game.rnd.integerInRange(100, 300);
			if (xpos < 0) {
				bull.animations.play('right');
				bull.animations.getAnimation('right').speed = bull.body.velocity.x / 25;
			} else {
				bull.animations.play('left');
				bull.animations.getAnimation('left').speed = bull.body.velocity.x / 25;
				bull.body.velocity.x *= -1;
			}
		}
		this.game.time.events.add(this.game.rnd.integerInRange(1000,3000), this.addBull, this);
	}

	update() {
		let g = this.game;
		this.bulls.forEachAlive(function(bull) {
			if (bull.body.x > g.world.width+100) {
				bull.kill();
			}
			if (bull.dying && bull.body.y > 3*g.world.height/2) {
				bull.kill();
			}
		});
	}

	render() {
		// if (this.player)
		//	this.player.render();
	}

}

export default GameState;
