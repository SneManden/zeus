class Menu extends Phaser.State {

	preload() {
		this.game.load.spritesheet("player", "assets/player.png", 32, 48);
		this.game.load.spritesheet("zeus", "assets/zeus.png", 64, 64);
		this.game.load.spritesheet("human", "assets/human.png", 32, 32);
		this.game.load.spritesheet("bull", "assets/bull.png", 48, 32);
		this.game.load.spritesheet("back1", "assets/back1.png", 320, 240);
		this.game.load.spritesheet("crosshair", "assets/crosshair.png", 64, 64);
		this.game.load.spritesheet("hp", "assets/hp.png", 256, 8);
		this.game.load.spritesheet("hpback", "assets/hpback.png", 256, 8);

		this.game.stage.backgroundColor = "#3BD448"; // green

		let wwidth = this.game.world.width;
		let wheight = this.game.world.height;

		let settings = {font: '30px Droid Sans', fill: '#ffffff', align: 'center', boundsAlignH: 'center', boundsAlignV: 'middle'};

		this.text = this.game.add.text(0, 0, 'The Wrath of Zeus (working title)', settings);
		this.text.setTextBounds(0, 0, wwidth, 75);

		let settingsPlayAgain = {font: '12px Droid Sans', fill: '#eeeeee', align: 'center', boundsAlignH: 'center', boundsAlignV: 'bottom'};
		this.newgame = this.game.add.text(0, 0, "Press <Space> to play again.", settingsPlayAgain);
		this.newgame.setTextBounds(0, 0, wwidth, wheight);

		let settingsDef = {font: '18px Droid Sans', fill: '#ffffff', align: 'left', boundsAlignH: 'left', boundsAlignV: 'middle'};
		let t1 = this.game.add.text(0,0, 'This is you.', settingsDef);
		t1.setTextBounds(100,50,wwidth,70);
		let t2 = this.game.add.text(0,0, 'This is Zeus. He will try to kill you. Kill him.', settingsDef);
		t2.setTextBounds(100,115,wwidth,70);
		let t3 = this.game.add.text(0,0, 'This indicates Zeus\' lightning strike. Avoid it.', settingsDef);
		t3.setTextBounds(100,180,wwidth,70);
		let t4 = this.game.add.text(0,0, 'This is a bull. It will try to kill you. Jump (<Up>)\non it, and throw (<Space>) it at Zeus.', settingsDef);
		t4.setTextBounds(100,230,wwidth,70);

	}

	create() {
		this.playBtn = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		let p = this.game.add.sprite(50,80,'player');
		p.anchor.set(0.5,0.5);
		let z = this.game.add.sprite(50,140,'zeus');
		z.anchor.set(0.5,0.5);
		let c = this.game.add.sprite(50,210,'crosshair');
		c.anchor.set(0.5,0.5);
		c.width *= 0.75;
		c.height *= 0.75;
		let b = this.game.add.sprite(50,260,'bull');
		b.anchor.set(0.5,0.5);
	}

	update() {
		if (this.playBtn.isDown) {
			console.log("Play!");
			this.game.state.start('GameState');
		}
	}

	render() {
	}

}

export default Menu;
