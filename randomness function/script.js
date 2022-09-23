let ms = new Date().getMilliseconds();

function randomNum(endpoint) {
    return ms % endpoint;
}

console.log(randomNum(100));
console.log(Math.floor(Math.random() * 100));