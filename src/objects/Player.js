class Player extends Phaser.Sprite {

	constructor(game, x, y, key, frame) {
		super(game, x, y, key, frame);
		game.world.add(this);
		
		// Parameters
		let params = this.params = {
			gravityY: 1000,
			vMaxY: 500,
			hSpeed: 250
		};

		this.anchor.x = 0.5;
		this.anchor.y = 0.5;

		this.health = [];
		for (var i=0; i<3; i++) {
			let p = game.add.sprite(10 + i*20,10,'player');
			p.width *= 0.5;
			p.height *= 0.5;
			this.health.push(p);
		}

		game.physics.enable(this, Phaser.Physics.ARCADE);
		// Body
		this.body.collideWorldBounds = true;
		this.body.gravity.y = params.gravityY;
		this.body.maxVelocity.y = params.vMaxY;
		this.body.setSize(20, 32, 5, 16);
		// Animations
		this.animations.add('right', [0, 1, 2, 3], 10, true);
		//this.animations.add('turn', [0], 20, true);
		this.animations.add('left', [4, 5, 6, 7], 10, true);
		this.facing = 'right';
		//
		// Cursors
		this.cursors = game.input.keyboard.createCursorKeys();
		this.throwBtn= game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.jumpTimer = 0;

	}

	update() {
		if (this.x < -128 || this.y > this.game.height+128)
			this.respawn();

		if (this.dying) {
			this.frame = 8;
			return;
		}

		this.body.velocity.x = 0;
		if (this.cursors.left.isDown) {
			this.body.velocity.x = -this.params.hSpeed;

			if (this.facing != 'left') {
				this.animations.play('left');
				this.facing = 'left';
			}
		} else if (this.cursors.right.isDown) {
			this.body.velocity.x = this.params.hSpeed;

			if (this.facing != 'right') {
				this.animations.play('right');
				this.facing = 'right';
			}
		} else {
			if (this.facing != 'idle') {
				this.animations.stop();

				if (this.facing == 'left') {
					this.frame = 4;
				} else {
					this.frame = 0;
				}

				this.facing = 'idle';
			}
		}

		this.game.physics.arcade.overlap(this, this.game.state.getCurrentState().bulls, this.bullHit, null, this);
		
		if (this.cursors.up.isDown && this.body.onFloor() && this.game.time.now > this.jumpTimer) {
			this.body.velocity.y = -500;
			this.jumpTimer = this.game.time.now + 750;
		}

	}

	bullHit(player, bull) {
		if (!bull.dying) {
			if (bull.body.touching.up)
				bull.die();
			else if (bull.body.velocity.x > 0 && bull.body.touching.right)
				this.explode(0);
			else if (bull.body.velocity.x < 0 && bull.body.touching.left)
				this.explode(-500,0);
		} else {
			if (this.throwBtn.isDown) {
				let xdir = this.zeus.x - this.x;
				bull.explode(xdir-100,xdir+100,-900,-800);
				this.frame = 9;
			}
		}
	}

	explode(xmin=-500, xmax=500, ymin=-600, ymax=-1200) {
		console.log("player exploded!");
		this.dying = true;
		this.body.collideWorldBounds = false;

		this.body.velocity.x = this.game.rnd.integerInRange(xmin, xmax);
		this.body.velocity.y = this.game.rnd.integerInRange(ymin, ymax);
		// this.body.acceleration.y = 180;
		// this.body.angle = 180;
		//
		if (this.health.length <= 0)
			return;
		var p = this.health.pop();
		p.destroy();
	}

	respawn() {
		if (this.health.length == 0) {
			console.log("player has died for good.");
			this.alive = false;
			let g = this.game;
			g.time.events.add(2000, function() { g.state.start('GameOver'); }, this);
			this.destroy();
			return;
		}
		console.log("player has respawned.");
		this.dying = false;
		this.body.angle = 0;
		this.body.collideWorldBounds = true;
		this.x = this.game.width / 2;
		this.y = this.game.height / 2;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.body.acceleration.y = 0;
		this.frame = 0;
	}

	render() {
		// this.game.debug.body(this);
		// this.game.debug.bodyInfo(this, 16, 24);
	}

}

export default Player;
