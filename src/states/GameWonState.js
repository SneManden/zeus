

class GameWon extends Phaser.State {

	preload() {
		this.game.stage.backgroundColor = "#3BD448"; // green

		let wwidth = this.game.world.width;
		let wheight = this.game.world.height;

		let settings = {font: '30px Droid Sans', fill: '#ffffff', align: 'center', boundsAlignH: 'center', boundsAlignV: 'middle'};

		this.text = this.game.add.text(0, 0, "Congratulations!\nYou have defeated\nthe mighty Zeus!", settings);
		this.text.setTextBounds(0, 100, wwidth, 100);

		let settingsPlayAgain = {font: '12px Droid Sans', fill: '#eeeeee', align: 'center', boundsAlignH: 'center', boundsAlignV: 'bottom'};
		this.newgame = this.game.add.text(0, 0, "Press <Esc> to play again.", settingsPlayAgain);
		this.newgame.setTextBounds(0, 0, wwidth, wheight);
	}

	create() {
		this.playAgainBtn = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
	}

	update() {
		if (this.playAgainBtn.isDown) {
			console.log("Play again!");
			this.game.state.start('GameState');
		}
	}

	render() {
	}

}

export default GameWon;
