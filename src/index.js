import GameState from 'states/GameState';
import GameOver from 'states/GameOverState';
import GameWon from 'states/GameWonState';

class Game extends Phaser.Game {

	constructor() {
		super(480, 320, Phaser.AUTO, 'content', null);
		this.state.add('GameState', GameState, false); // rename to MainGame
		// this.state.add('Menu', Menu, false);
		this.state.add('GameOver', GameOver, false);
		this.state.add('GameWon', GameWon, false);
		this.state.start('GameState');

		//this.scale.pageAlignHorizontally = true;
		// this.scale.pageAlignVertically = true;
		// this.scale.setScreenSize( true );
	}

	create() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	}

}

new Game();
