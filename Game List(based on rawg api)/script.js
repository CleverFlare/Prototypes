const baseUrl = 'https://api.rawg.io/api/games';
let pageNumber = 1;
let url = baseUrl + '?key=' + '369b3449784b460989aa0d93357916d5' + '&page=' + pageNumber;
const section = document.querySelector('section');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

fetchGames(url);


function gameItems(res) {
    while(section.firstChild) {
        section.removeChild(section.firstChild);
    }
    const games = res.results;
    for(let i = 0; i < res.results.length; i++) {
        //the game container
        const gameItem = document.createElement('div');
        gameItem.setAttribute('class', 'gameItem');
        section.appendChild(gameItem)


        //the picture of the game
        const gameIcon = document.createElement('img');
        gameIcon.src = res.results[i].background_image;
        gameIcon.setAttribute('class', 'gameIcon');
        gameItem.appendChild(gameIcon);

        //the information of the game
        const gameInfo = document.createElement('div');
        gameInfo.setAttribute('class', 'gameInfo');
        gameItem.appendChild(gameInfo);

        //the platforms container of the game
        const platforms = document.createElement('div');
        platforms.setAttribute('class', 'platforms');
        gameInfo.appendChild(platforms)
        
        //the platforms of the game
        for(let x = 0; x < games[i].parent_platforms.length; x++) {
            const platformName = games[i].parent_platforms[x].platform.name;
            const Plat = document.createElement('i');
            platforms.appendChild(Plat);
            switch(platformName) {
                case 'PC':
                    Plat.setAttribute('class', 'fa-brands fa-windows');
                    break;
                case 'PlayStation':
                    Plat.setAttribute('class', 'fa-brands fa-xbox');
                    break;
                case 'Xbox':
                    Plat.setAttribute('class', 'fa-brands fa-playstation');
                    break;
                case 'Linux':
                    Plat.setAttribute('class', 'fa-brands fa-linux');
                    break;
                case 'Nintendo':
                    Plat.setAttribute('class', 'fa-solid fa-gamepad');
                    break;
                    case 'iOS':
                        Plat.setAttribute('class', 'fa-solid fa-mobile-screen');
                        break;
                        case 'Android':
                            Plat.setAttribute('class', 'fa-brands fa-android');
                    break;
                case 'Apple Macintosh':
                    Plat.setAttribute('class', 'fa-brands fa-apple');
                    break;
                default:
                    Plat.setAttribute('class', 'fa-brands fa-windows');
            }
        }

        //the name of the game
        const gameName = document.createElement('p');
        gameName.textContent = games[i].name;
        gameInfo.appendChild(gameName);
    }
}

function fetchGames(u) {
    fetch(u)
    .then(response => {
        response.json().then(gameItems)
    })
    .catch(err => {
        console.error(err);
    });
}

nextBtn.addEventListener('click', (e) => {
    pageNumber++;
    url = baseUrl + '?key=' + '369b3449784b460989aa0d93357916d5' + '&page=' + pageNumber;
    scrollTo(0,0);
    fetchGames(url);
})

prevBtn.addEventListener('click', (e) => {
    if(pageNumber > 0) {
        pageNumber--;
        url = baseUrl + '?key=' + '369b3449784b460989aa0d93357916d5' + '&page=' + pageNumber;
        scrollTo(0,0);
    } else {
        return;
    }
    fetchGames(url);
})