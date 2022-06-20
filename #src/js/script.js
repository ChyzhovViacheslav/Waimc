function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}    
testWebP(function (support) {
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }
    else{
    document.querySelector('body').classList.add('no-webp');
    }
});


const personalMovieDB = {
    count: 0,
    movies:{},
    actors:{},
    genres:[],
    private: true,
    start: () => {
        personalMovieDB.count = +prompt("Сколько фильмов вы просмотрели?", "");
    while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)){
        personalMovieDB.count = +prompt("Сколько фильмов вы просмотрели?", "");
        console.log("Попробуйте ввести данные повторно");
    };
    },
    rememberMyFilms: () => {
        for(let i = 0; i < 2; i++){
            const   a = prompt("Один из просмотренных недавно фильмов?", ""),
                    b = +prompt("Насколько вы его оцените?", "");
        
            if(a != null && b !=null && a != '' && b !='' & a.length < 50){
                personalMovieDB.movies[a] = b;
                console.log(personalMovieDB.movies);
            } else{ 
                console.log('Ошибка!');
                i--;
            }
        }
    },
    countMyFilms: () => {
        if(personalMovieDB.count < 10){
            console.log('Просмотренно мало фильмов');
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30){
            console.log('Вы класический зритель');
        } else if (personalMovieDB.count >= 30){
            console.log('ВЫ киноман');
        } else{
            console.log('Ошибка ёу');
        }
    },
    writeYourGenres: () => {
        for(let i = 1; i <= 3; i++){
            let genre = prompt(`Ваш любимый жанр под номером ${i}`);
            if(genre === '' || genre == null){
                console.log('Вы ввели некорректные данные');
                i--;
            } else{
                personalMovieDB.genres[i - 1] = genre; 
            }
        }
        personalMovieDB.genres.forEach((item, i) => {
            console.log(`Ваш любимый жанр #${i+1} - это ${item}`);
        })
    },
    toggleVisibleMyDB: () => {
        if (personalMovieDB.private){
            personalMovieDB.private = false
        } else {
            personalMovieDB.private = true
        }
    },
    showMyDB: () => {
        if(personalMovieDB.private == false){
            console.log(personalMovieDB);
        } else if(personalMovieDB.private == true){
            console.log("Приватность");
        } else {
            console.log("Ошибка Приватности");
        }
    }
}

const places = {
    item: document.querySelectorAll('.places-item'),
    title: document.querySelector('.places__title h2 span')
},
    origins = {
        main: document.querySelector('.origins')
},
    documents = {
        main: document.querySelector('.documents')
},
    team = {
        list: document.querySelectorAll('.team__list li')
},
    home = {
        list: document.querySelector('.home__list'),
        li: document.querySelectorAll('.home__list li'),
        form: document.querySelector('.home__form'),
        input: document.querySelector('.home__form input'),
        button: document.querySelector('.home__form button'),

},  newHome = {
        content: [
            "Minercraft",
            "Dota 2",
            "Apex",
            "Warzone",
            "Point Blank"
    ]
}

places.item.forEach((el) => {
    el.remove()
})

places.title.textContent = 'Google'

function changeBgDora (el){
    el.style.backgroundImage = 'url(../img/dora.jpg)'
    el.style.backgroundPosition = 'bottom'
}

changeBgDora(origins.main)
changeBgDora(documents.main)

home.form.addEventListener('submit', e => {
    e.preventDefault();

    let values = home.input.value

    if(values){

        // if(values.length >= 22){
        //     values = `${values.substring(0, 23)}...`;
        // }

        values.length >= 22 ? values = `${values.substring(0, 23)}...` : console.log('Очибка');

        newHome.content.push(values);
        newHome.content.sort();

        createMovieList()

        e.target.reset();
    } else{
        console.log('Ошибка формы');
    }
})

function createMovieList(){
    home.list.innerHTML = ''

    newHome.content.forEach(el => {

        home.list.innerHTML += `
            <li>
                ${el}    
            </li>
        `
    })
}

createMovieList();