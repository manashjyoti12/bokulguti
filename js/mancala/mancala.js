/**
 * Manages the mancala board
 */
var Mancala = (function () {
	'use strict';

	/**
	 * Initialise class
	 * @param {Game} game
	 */
	var Mancala = function (game) {
		this.game = game;

		this.current_pits = [5, 5, 5, 5, 5];
		this.other_pits = [5, 5, 5, 5, 5];
		this.current_store = 0;
		this.other_store = 0;
	};

	/**
	 * Exchange the players' positions on the board
	 */
	Mancala.prototype.flip_board = function () {
		var current_pits = this.current_pits;
		this.current_pits = this.other_pits;
		this.other_pits = current_pits;

		var current_store = this.current_store;
		this.current_store = this.other_store;
		this.other_store = current_store;
	};

	/**
	 * Retrieve the amount of stones in a pit
	 * @param  {Number} pit The pit number
	 * @return {Number}     The amount of stones
	 */
	Mancala.prototype.get_stones = function (pit) {

		if (pit === 5) {
			return this.current_store;
		} else if (pit === 11) {
			return this.other_store;
		} else if (pit < 5) {
			return this.current_pits[pit];
		} else if (pit > 5) {
			return this.other_pits[pit - 6];
		}

		return NaN;
	};

	/**
	 * Set the amount of stones in a pit
	 * @param {Number} pit    The pit number
	 * @param {Number} stones The amount of stones
	 */
	Mancala.prototype.set_stones = function (pit, stones) {

		if (pit === 5) {
			this.current_store = stones;
		} else if (pit === 11) {
			this.other_store = stones;
		} else if (pit < 5) {
			this.current_pits[pit] = stones;
		} else if (pit > 5) {
			this.other_pits[pit - 6] = stones;
		}
	};

	/**
	 * Adjust the amount of stones in a pit
	 * @param {Number} pit    The pit number
	 * @param {Number} stones The amount of stones
	 */
	Mancala.prototype.add_stones = function (pit, stones) {

		if (pit === 5) {
			this.current_store += stones;
		} else if (pit === 11) {
			this.other_store[pit] += stones;
		} else if (pit < 5) {
			this.current_pits[pit] += stones;
		} else if (pit > 5) {
			this.other_pits[pit - 6] += stones;
		}
	};

	return Mancala;
})();
