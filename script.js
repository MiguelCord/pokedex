// API https://pokeapi.co/

const baseURL = "https://pokeapi.co/api/v2/pokemon/";   // API base URL to get all pokemon
const genURL = "https://pokeapi.co/api/v2/pokemon-species/" // API URL to get Pokemon generation, color and flavor text (Pokemon description)
const containerIntro = document.getElementById('container-intro');  // Container for the front form
const containerPokemon = document.getElementById('container-pokemon');  // Container for the pokemon pager
const pokeInfo = document.getElementById('pokeInfo');   // Container for all the Pokemon info

document.getElementById('findPokemon').addEventListener('submit', getPokemon); // Get submit event listener from the front page form
document.getElementById('findPokemonSmall').addEventListener('submit', getPokemon); // Get submit event listener from the pokemon page form

function getPokemon(e) {    // Make API call to get the Pokemon info
    e.preventDefault();
    const pokemonId =
        containerIntro.style.display === "none" ?             // Get the Pokemon id
        document.getElementById('pokemonSearchSmall').value :
        document.getElementById('pokemonSearch').value;

    const getPokeInfo =
        fetch(baseURL + `${pokemonId}`)
            .then(res => res.json()).then(pokemon => {return pokemon })
                .catch(err => console.log(err));

    const getPokeSpecies =
        fetch(genURL + `${pokemonId}`)
        .then(res => res.json()).then(pokemon => {return pokemon})
            .catch(err => console.log(err));

    Promise.all([getPokeInfo, getPokeSpecies]).then( pokemonData => {
        createPokemon(pokemonData);
        containerIntro.style.display = "none"
        containerPokemon.style.display = "block";
        document.getElementById('findPokemonSmall').reset();    // reset the pokemon page form after a search is made
    });
};

// function getRandomNum(min, max) {                      // Get a random number
//     min = Math.ceil(1);
//     max = Math.floor(808);
//     return Math.floor(Math.random() * (max - min) + min);
// }

// function getRandomPokemon() {
//     const getRandomId = getRandomNum();
//     fetch(baseURL + `${getRandomId}`)
//     .then(res => res.json()).then( pokemon_1 => {
//         createRandomPokemon(pokemon_1)})
//         .catch(err => console.log(err));

//     const getRandomId_2 = getRandomNum();
//     fetch(baseURL + `${getRandomId_2}`)
//     .then(res => res.json()).then( pokemon_2 => {
//         createRandomPokemon(pokemon_2)})
//         .catch(err => console.log(err));

//     const getRandomId_3 = getRandomNum();
//     fetch(baseURL + `${getRandomId_3}`)
//     .then(res => res.json()).then( pokemon_3 => {
//         createRandomPokemon(pokemon_3)})
//         .catch(err => console.log(err));

//     const getRandomId_4 = getRandomNum();
//     fetch(baseURL + `${getRandomId_4}`)
//     .then(res => res.json()).then( pokemon_4 => {
//         createRandomPokemon(pokemon_4)})
//         .catch(err => console.log(err));

//     const getRandomId_5 = getRandomNum();
//     fetch(baseURL + `${getRandomId_5}`)
//     .then(res => res.json()).then( pokemon_5 => {
//         createRandomPokemon(pokemon_5)})
//         .catch(err => console.log(err));
// }

// function createRandomPokemon(pokemon_1, pokemon_2, pokemon_3, pokemon_4, pokemon_5) {

//     console.log(pokemon_1)
//     const randomSprite_1 = document.getElementById('pokeRandom_1')
//     const randomSprite_2 = document.getElementById('pokeRandom_2')
//     const randomSprite_3 = document.getElementById('pokeRandom_3')
//     const randomSprite_4 = document.getElementById('pokeRandom_4')
//     const randomSprite_5 = document.getElementById('pokeRandom_5')

//     randomSprite_1.setAttribute("src", pokemon_1.sprites.front_default)
//     randomSprite_2.setAttribute("src", pokemon_1.sprites.front_default)
//     // randomSprite_3.setAttribute("src", pokemon_3.sprites.front_default)
//     // randomSprite_4.setAttribute("src", pokemon_4.sprites.front_default)
//     // randomSprite_5.setAttribute("src", pokemon_5.sprites.front_default)
// }

function createPokemon(pokemonData) {
    const pokeName = pokeInfo.querySelector('#pokeName')
    const sprite = pokeInfo.querySelector('#sprite')
    const genera = pokeInfo.querySelector('#genera')
    const number = pokeInfo.querySelector('#number')
    const type_1 = pokeInfo.querySelector('#type_1')
    const type_2 = pokeInfo.querySelector('#type_2')
    const des = pokeInfo.querySelector('#des')
    const gen = pokeInfo.querySelector('#gen')
    const catchRate = pokeInfo.querySelector('#catchRate')
    const abilities_1 = pokeInfo.querySelector('#abilities_1')
    const abilities_2 = pokeInfo.querySelector('#abilities_2')
    const abilities_3 = pokeInfo.querySelector('#abilities_3')
    const height = pokeInfo.querySelector('#height')
    const weight = pokeInfo.querySelector('#weight')
    const stats_1 = pokeInfo.querySelector('#stat_1')
    const stats_2 = pokeInfo.querySelector('#stat_2')
    const stats_3 = pokeInfo.querySelector('#stat_3')
    const stats_4 = pokeInfo.querySelector('#stat_4')
    const stats_5 = pokeInfo.querySelector('#stat_5')
    const stats_6 = pokeInfo.querySelector('#stat_6')
    const spriteCon = pokeInfo.querySelector('#spriteContainer')

    spriteCon.style.backgroundColor = pokemonData[1].color.name
    pokeName.textContent = pokemonData[0].name
    sprite.setAttribute("src", pokemonData[0].sprites.front_default)
    genera.textContent = pokemonData[1].genera[2].genus
    number.textContent = "#" + pokemonData[0].id
    type_1.textContent = pokemonData[0].types[0].type.name
    type_2.textContent =
        pokemonData[0].types.length > 1
        ? pokemonData[0].types[1].type.name
        : ""
    des.textContent =
        pokemonData[1].flavor_text_entries[1].language.name === "en"
        ? pokemonData[1].flavor_text_entries[1].flavor_text
        : pokemonData[1].flavor_text_entries[2].flavor_text
    gen.textContent = pokemonData[1].generation.name
    catchRate.textContent = pokemonData[1].capture_rate + " / 255"
    abilities_1.textContent = pokemonData[0].abilities[0].ability.name
    abilities_2.textContent = pokemonData[0].abilities.length > 1
        ? pokemonData[0].abilities[1].ability.name
        : ""
    abilities_3.textContent = pokemonData[0].abilities.length > 2
        ? pokemonData[0].abilities[2].ability.name
        : ""
    height.textContent = pokemonData[0].height / 10 + "m"
    weight.textContent = pokemonData[0].weight / 10 + "kg"
    stats_1.textContent = pokemonData[0].stats[0].stat.name + " " + pokemonData[0].stats[0].base_stat
    stats_2.textContent = pokemonData[0].stats[1].stat.name + " " + pokemonData[0].stats[1].base_stat
    stats_3.textContent = pokemonData[0].stats[2].stat.name + " " + pokemonData[0].stats[2].base_stat
    stats_4.textContent = pokemonData[0].stats[3].stat.name + " " + pokemonData[0].stats[3].base_stat
    stats_5.textContent = pokemonData[0].stats[4].stat.name + " " + pokemonData[0].stats[4].base_stat
    stats_6.textContent = pokemonData[0].stats[5].stat.name + " " + pokemonData[0].stats[5].base_stat
}

// getRandomPokemon();

// function getRandomPokemon() {
//     const pokeArray = [];

//     for (let i = 0; i < 5; i++) {
//         const getRandomPoke = getRandomNum();
//         fetch(baseURL + `${getRandomPoke}`)
//         .then(res => res.json()).then( pokemon => {
//             pokeArray.push(pokemon);
//         })
//             .catch(err => console.log(err));
//     }

// getRandomPokemon();

//     // createRandomPokemon(pokeArray);
//     console.log(pokeArray)
// }

// function valInput() {
//     const alphanumeric = /^[a-zA-Z0-9_]*$/;
//     const sdfs;

//     if (pokemonId.charAt(0) === "0" || pokemonSearchSmall.charAt(0) === "0") {
//         string.substring(1);
//     }
// }

// const pokeStats = document.getElementById("pokeStats");             // Code for looping the pokemon type array and
// for (let i = 0; i < pokemonData[0].types.length; i++) {                reseting the values when an API call is made (doesn't work)
//         const addPokeType = document.createElement("p");
//         addPokeType.setAttribute("id", "type");
//         addPokeType.setAttribute("class", "type");
//         pokeStats.insertBefore(addPokeType, pokeStats.childNodes[2]);
//         const type = pokeInfo.querySelector('#type');
//         const pokemonDatatype = pokemonData[0].types[i].type.name;
//         type.textContent = pokemonDatatype;
//         document.getElementsByClassName("type")[i].textContent = "";
//     };
