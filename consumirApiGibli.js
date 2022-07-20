

function getFilms() {
    return fetch('https://ghibliapi.herokuapp.com/films')
        .then(res => res.json())
}

function getLocations() {
    return fetch('https://ghibliapi.herokuapp.com/locations').then(res => res.json());
}

async function getFilmByName(name) {
    // Me devuelve una pelicula que contenga las palabras pasadas por parametro
    let films = await getFilms();
    return films.find(film => film.title.includes(name))


}



async function getFilmsByScore(score) {
    // Me devuelve todas las peliculas con rt_score mayor al puntaje pasado por parametro
    let films = await getFilms();
    return films = films.filter(film => film.rt_score > score)
}




async function getFilmsRanking() {
    // Me devuelve un array con todas las peliculas, unicamente con su titulo y su rt_score 
    //ordenadas desc por score
    let films = await getFilms();
    let filmsByScore = films.map((film) => {
        return {
            title: film.title,

            rt_score: film.rt_score,

        }
    })
        .sort((a, b) => b.rt_score - a.rt_score)
    return filmsByScore

}


async function getPeopleFromFilm(name) {
    // Me devuelve un array de objetos que son las personas que aparecen en una pelicula
    let films = await getFilmByName(name)
    let requestList = films.people.map((person) => {
        return fetch(person)
    })
    const responseList = await Promise.all(requestList)
    const peopleArray = responseList.map((person) => {
        return person.json()
    })
    return await Promise.all(peopleArray)
}

async function showData(func, params) {
    let result = await func(params);

    return console.table(result)

}


showData(getFilmsRanking)