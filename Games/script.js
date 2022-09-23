const fields = document.querySelector('main section');
const displayPlayer = document.querySelector('.player');
let theMap = [ [], [], [] ];
let player = 'X';

displayPlayer.innerText = player;

for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        theMap[i].push(fields.children[j + (i * 3)])
    }
}

function declareWinner() {
    return alert(player);
}

function winnerChecker() {
    // theMap[0][0].style.backgroundColor = '#450056';
    displayPlayer.innerText = player
    for(let i = 0; i < theMap.length; i++) {
        if(theMap[i][0].innerText === player && theMap[i][1].innerText === player && theMap[i][2].innerText === player) {
            theMap[i][0].style.backgroundColor = '#450056';
            theMap[i][1].style.backgroundColor = '#450056';
            theMap[i][2].style.backgroundColor = '#450056';
        }
    }
};

fields.addEventListener('click', click => {
    if(click.target.localName === 'div' && click.target.innerText === '') {
        switch(player) {
            case 'X':
                click.target.innerText = player;
                winnerChecker();
                player = 'O';
                break;
            case 'O':
                click.target.innerText = player;
                winnerChecker();
                player = 'X';
                break;
        }
    }
})