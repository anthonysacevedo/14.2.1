const url = 'https://japceibal.github.io/japflix_api/movies-data.json';

document.addEventListener('DOMContentLoaded', function() {
    

    document.getElementById("btnBuscar").addEventListener("click", event => {
        
        const busca = document.getElementById("inputBuscar").value;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => { 
            const pelisList = document.getElementById("lista");


// Limpiar el contendor de películas
            pelisList.innerHTML = "";

            //Filtra el JSON a partir del dato obtenido en el input.value
            const filteredMovies = data.filter(movie => 
                movie.title.toLowerCase().includes(busca) ||
                movie.tagline.toLowerCase().includes(busca) ||
                movie.overview.toLowerCase().includes(busca) ||
                movie.genres[0].name.toLowerCase().includes(busca)

            );

            //Recorre e imprime los datos del JSON filtrados en la constante filteredMovies anterior
            for (let i = 0; i < filteredMovies.length; i++) {
                pelisList.innerHTML +=`
                <li>
                <p>${filteredMovies[i].title}</p>
                <p>${filteredMovies[i].tagline}</p>
                <p>${filteredMovies[i].genres[i].name}</p>
                <p>${filteredMovies[i].overview}</p>
                <div class="comment-stars">${generateStars(filteredMovies[i].vote_average)}</div>
                </li>
                `
                }
        
        }); 
    });
})

function generateStars(score) {
    let starsHtml = '';
    // Normalizamos el valor de vote_average a un rango de 0 a 5
    const normalizedScore = Math.round(score / 2);
    
    for (let i = 0; i < 5; i++) {
        if (i < normalizedScore) {
            starsHtml += '<span class="fa fa-star checked"></span>';
        } else {
            starsHtml += '<span class="fa fa-star"></span>';
        }
    }
    return starsHtml;
};

