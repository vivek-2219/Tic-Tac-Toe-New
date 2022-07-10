// Variables for targetting the HTML elements.
let container = document.querySelector('.container');
let gameBoard = document.querySelector('.gameBoard');
let blocks = document.querySelectorAll('.blocks');
let restart = document.querySelector('.restart');
let playerOne = document.querySelector('.playerOne');
let playerTwo = document.querySelector('.playerTwo');
let turn1 = document.querySelector('.turn1');
let turn2 = document.querySelector('.turn2');
let title1 = document.querySelector('.title1');
let title2 = document.querySelector('.title2');
let winnerDiv = document.querySelector('.winnerDiv');
let winner = document.querySelector('.winner');

// Music variables.
let tingMusic = new Audio('ting.mp3');
let backgroundMusic = new Audio('background.mp3');
let gameoverMusic = new Audio('gameover.mp3');

// Game variables.
let images = ['circle', 'cross', 'circle', 'cross', 'circle', 'cross', 'circle', 'cross', 'circle'];
let imageIndex = 0;
let playerTurn = ['green', 'rgb(174, 174, 236)'];
let gameArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Variables for editing media queries.
let media1200 = window.matchMedia('(max-width: 1200px)');
let media500 = window.matchMedia('(max-width: 500px)');

// Taking the name of players using prompt.
let a = prompt('O Player');
let b = prompt('X Player');

// Displaying the name of players in the turn box.
if (a !== '') {
    title1.innerHTML = a;
}
else {
    title1.innerHTML = 'O Player';
}

if (b !== '') {
    title2.innerHTML = b;
}
else {
    title2.innerHTML = 'X Player';
}

// Generate cross and circle when clicked on the respective block.
blocks.forEach(element => {
    element.addEventListener('click', () => {
        // Generate cross and circle by creating an img element only if the corresponding block has no innerHTML so as to ensure that there is only one HTML element inside the clicked block.
        if (element.innerHTML === '') {
            tingMusic.play();
            let crossAndCircle = document.createElement('img');
            crossAndCircle.setAttribute('src', `${images[imageIndex]}.png`);
            crossAndCircle.style.height = '7vw';
            crossAndCircle.style.width = '7vw';
            element.appendChild(crossAndCircle);
            turn1.innerHTML = '';
            turn2.innerHTML = '';

            // Changing media queries related with 1200px.
            if (media1200.matches) {
                crossAndCircle.style.minWidth = '150px';
                crossAndCircle.style.minHeight = '150px';
            }

            // Changing media queries related with 500px.
            if (media500.matches) {
                crossAndCircle.style.minWidth = '30vw';
                crossAndCircle.style.minHeight = '30vw';
            }

            // Logic to show whose turn is right now.
            if (imageIndex % 2 === 0) {
                playerTwo.style.backgroundColor = 'green';
                turn2.innerHTML = 'Your turn';
                playerOne.style.backgroundColor = 'rgb(174, 174, 236)';
            }
            else {
                playerTwo.style.backgroundColor = 'rgb(174, 174, 236)';
                turn1.innerHTML = 'Your turn';
                playerOne.style.backgroundColor = 'green';
            }
            imageIndex = imageIndex + 1;
        };

        // Logic for winning the game.
        gameArray.forEach(element => {
            if ((blocks[element[0]].innerHTML.slice(10, 15) === (blocks[element[1]].innerHTML.slice(10, 15))) && (blocks[element[1]].innerHTML.slice(10, 15) === (blocks[element[2]].innerHTML.slice(10, 15))) && (blocks[element[0]].innerHTML !== '')) {
                gameoverMusic.play();
                winnerDiv.style.display = 'block';
                if (blocks[element[0]].innerHTML.slice(10, 15) === 'circl' && winner.innerHTML === '') {
                    winner.innerHTML = `${title1.innerHTML} wins`;
                }
                else if (blocks[element[0]].innerHTML.slice(10, 15) === 'cross' && winner.innerHTML === '') {
                    winner.innerHTML = `${title2.innerHTML} wins`;
                };
            };
        });
    });
});

// Restart the game and set the variables to their initial values when restart button is clicked.
restart.addEventListener('click', () => {
    imageIndex = 0;
    blocks.forEach(element => {
        element.innerHTML = '';
    });
    turn1.innerHTML = 'Your turn';
    turn2.innerHTML = '';

    playerTwo.style.backgroundColor = 'rgb(174, 174, 236)';
    playerOne.style.backgroundColor = 'green';

    winnerDiv.style.display = 'none';
    winner.innerHTML = '';
});

