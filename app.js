/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice1, previousDice2, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor( Math.random() * 6 ) + 1;
        var dice2 = Math.floor( Math.random() * 6 ) + 1;
        

        // 2. Display the result
        var dice0DOM = document.getElementById('dice-0');
        var dice1DOM = document.getElementById('dice-1');
        dice0DOM.style.display = 'block';
        dice0DOM.src = 'dice-' + dice1 +'.png';
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice2 +'.png';

        // 3. update the round score IF the rolled number was NOT a 1
        /*
        if(dice1 === 6 && previousDice1 === 6
          && dice2 === 6 && previousDice2 === 6) {
            scores[activePlayer] = 0;
            previousDice1 = 0;
            previousDice2 = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else */
        if( dice1 !== 1 && dice2 !== 1) {
            // add score
            previousDice1 = dice1;
            previousDice2 = dice2;
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;


        // update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-0').style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }

        // next player
        // nextPlayer();
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer =  1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    previousDice = 0;
    gamePlaying = true;
    
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    winningScore = prompt('What should be winning score?', 100);
    winningScore = winningScore && winningScore > 0 ? winningScore : 100;
}









