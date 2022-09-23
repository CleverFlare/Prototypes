let url = 'text/json file.json';
fetch(url).then((response) => {
    response.json().then((json) => console.log(json))
})