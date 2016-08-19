angular.module('scoreBoard', ['ngAnimate']).controller('tictacCtrl', function($timeout) {
	
	var scoreBoard = this;
	
	scoreBoard.words = "Let's Play a Game!";
	
	scoreBoard.displayArr = [
		' ', ' ', ' ',
		' ', ' ', ' ',
		' ', ' ', ' '
	];
	
	scoreBoard.display = [
		' ', ' ', ' ',
		' ', ' ', ' ',
		' ', ' ', ' '
	];
	
	
scoreBoard.moves = [];
	scoreBoard.reset = reset;
	
	scoreBoard.pcFirstPlayer = pcFirstPlayer;
	scoreBoard.begin = begin;
	
	var move = true;
	var humanFirst = true;
	
	function begin(num) {
		
		if (move && moveIsTrue(scoreBoard.displayArr, num)) {
			scoreBoard.displayArr[num] = 'X';
			scoreBoard.display[num] = humanFirst? 'X':'O';
			nextMove();
		} else {
			scoreBoard.words = "No";
			return;
		}
		
		var gameOver = winner(scoreBoard.displayArr, true, 0); 
		if (gameOver === -10) {
			scoreBoard.words = humanFirst ? "X is the winner!":"O is the winner!";
			
			$timeout(reset, 2000);
			
		} else if (gameOver === 10) {
			scoreBoard.words = humanFirst ? "O is the winner!":"X is the winner!";
			
			$timeout(reset, 2000);
		} else if (gameOver === 0) {
			scoreBoard.words = "It's a tie!";
			
			$timeout(reset, 2000);
		} else {
			var d = compTurn();
			scoreBoard.displayArr[d] = 'O';
			
			scoreBoard.display[d] = humanFirst? 'O':'X';
			
			if (winner(scoreBoard.displayArr) === 10) {
				scoreBoard.words = humanFirst? 'O won':'X won';
				
				$timeout(reset, 2000);
				
			}else if (winner(scoreBoard.displayArr) === 0) {
				scoreBoard.words = "It's a tie";
				$timeout(reset, 2000);
			} else {
				nextMove();
			}
		}
		
	}
	
	function pcFirstPlayer() {
		
		if (scoreBoard.displayArr.indexOf('X') !== -1 || 
				scoreBoard.displayArr.indexOf('O') !== -1) {
			scoreBoard.words = "Game has started!";
			return ;
		}
		
		humanFirst = false;
		
		scoreBoard.words = "Begin";
		nextMove();
		
		var d = Math.floor(Math.random() * (3) + 1);
		
		if (d === 1) {
			scoreBoard.displayArr[0] = 'O';
			scoreBoard.display[0] = 'X';
			
		} else if (d === 2) {
			scoreBoard.displayArr[2] = 'O';
			scoreBoard.display[2] = 'X';
			
		} else if ( d === 3) {
			scoreBoard.displayArr[6] = 'O';
			scoreBoard.display[6] = 'X';
			
		} else if (d = 4) {
			scoreBoard.displayArr[8] = 'O';
			scoreBoard.display[8] = 'X';
		}
		nextMove();
	}
	
	
	function compTurn() {
		scoreBoard.moves= [];
		var move = undefined;
		var max = -100;
		
		for (var i = 0; i < scoreBoard.displayArr.length; i++) {
			if (moveIsTrue(scoreBoard.displayArr, i)) {
				var array = copyArray(scoreBoard.displayArr);
				array[i] = 'O';
				
				var logic = min(array, 1);
				
				if (logic > max) {
					max = logic;
					move = i;
				}
				scoreBoard.moves.push([i, max]);
			}
		}
		return move;
	}
	
	
	
	function min (arr, moves) {
		if (winner(arr, false) === 0) {
			return 0;
		} else if (winner(arr, false) === 10) {
			return 10 - moves;
		} else {
			var newTurn = 1 + moves;
			var minScore = 100;
			
			for (var i = 0; i < arr.length; i++) {
				if (moveIsTrue(arr, i)) {
					var array = copyArray(arr);
					
					array[i] = 'X';
					
					var logic = max(array, newTurn);
					
					if (logic < minScore) {
						minScore = logic;
					}
				}
			}
			return minScore;
		}
	}
	
	 
	function max(arr, moves, firstTurn) {
		if (winner(arr, true) === -10) {
			return moves - 10;
			
		} else if (winner(arr, false) === 0) {
			return 0;
		} else {
			var newTurn = 1 + moves;
			var maxScore = -100;
			
			for (var i = 0; i < arr.length; i++) {
				if (moveIsTrue(arr, i)) {
					var array = copyArray(arr);
					
					array[i] = 'O';
					
					var logic = min(array, newTurn);
					
					if (logic > maxScore) {
						maxScore = logic;
					}
					
				}
			}
			return maxScore;
		}
	}
	
	function copyArray(arr) {
		return arr.slice();
	}
	
	function noMoves(arr){
		return arr.indexOf(' ') === -1 ? true : false;
	}
	
	function moveIsTrue(arr, moves) {
	
		return arr[moves] === ' ' ? true : false;
	}
	
	function nextMove() {
		move = !move;
	}
	
	function reset() {
		move = true;
		scoreBoard.displayArr = [
			' ', ' ', ' ',
			' ', ' ', ' ',
			' ', ' ', ' '
		];
		
		scoreBoard.display = [
			' ', ' ', ' ', 
			' ', ' ', ' ',
			' ', ' ', ' '
		];
		
		scoreBoard.moves = [];
		
		humanFirst = true;
		scoreBoard.words = "Let's play again!";
	}
	
	function winner(array, x) {
		var word = undefined;
		
		if (x) {
			word = 'X';
		} else {
			word = 'O';
		}
		
		if (
		array[0] === word &&
			array[1] === word &&
			array[2] === word ||
			
			array[3] === word &&
			array[4] === word &&
			array[5] === word ||
			
			array[6] === word && 
			array[7] === word &&
			array[8] === word ||
			
			array[0] === word &&
			array[3] === word &&
			array[6] === word ||
			
			array[1] === word &&
			array[4] === word &&
			array[7] === word ||
			
			array[2] === word &&
			array[5] === word &&
			array[8] === word ||
			
			array[0] === word &&
			array[4] === word &&
			array[8] === word ||
			
			array[2] === word &&
			array[4] === word &&
			array[6] === word
		
		) {
			
			if(x) {
				return -10;
			} else {
				return 10;
			}
		} else if (array.indexOf(' ') === -1) {
			return 0;
		} else {
			return 'No';
		}
	}
	
	
});



