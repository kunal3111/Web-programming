const $pokemons = document.querySelector("#pokemons");
const $morepokemons = document.querySelector("#more");
const $pokemon_dialog = document.querySelector("#dialog");
let Clicked_Pokemon;
let DataId;

let key = "project";

const pokedata = [];
const printData = [];
let savedArray = [];

function saveData() {
    localStorage.setItem(key, JSON.stringify(savedArray));
}

getData();
function displayLocal() {
    for (let item of savedArray) {
        if (item) {
            console.log(item);
            let cardElement = document.querySelector(`.card[data-id="${item}"]`);
            cardElement.classList.add("green");
            let caught = document.querySelector(`.caught[data-id="${item}"]`);
            caught.classList.add("white");

            let catchbtn1 = document.querySelector(`.catch[data-id="${item}"]`);
            let dltBtn = document.createElement("button");
            console.log(catchbtn1);
            dltBtn.setAttribute("data-id", item);
            dltBtn.innerHTML = "Delete";
        }
    }
}

function getData() {
    let data = localStorage.getItem(key);
    if (data) {
        savedArray = JSON.parse(data);
        console.log(data);
        console.log(savedArray);
    } else {
        savedArray = [];
    }
}

function anotherFetch(data) {
    pokedata.push(...data.results);
    console.log(pokedata);

    const last20 = pokedata.slice(-20);

    last20.forEach(async (item) => {
        const response = await fetch(item.url);
        let data = await response.json();
        printData.push(data);
        displayPokemon(printData);
    });
}

function displayPokemon(printData) {
    $pokemons.innerHTML = "";

    $pokemons.innerHTML = printData.reduce(
        (html, prop) =>
            html +
            `

            <div class="card" id="${prop.id}" data-id="${prop.id}">
            <img src = "${prop.sprites.other["official-artwork"].front_default}">
            <h2 class="poke-title">${prop.name}</h2>
            <h3 class="caught" data-id="${prop.id}">CAUGHT</h3>

            </div>

        `,
        ""
    );

    $pokemons.addEventListener("click", clickExecute);
    displayLocal();
}

function clickExecute(ev) {
    let Clicked_Pokemon;
    if (ev.target.closest(".card")) {
        DataId = ev.target.closest(".card").getAttribute("data-id");

        Clicked_Pokemon = printData.find((item) => item.id === Number(DataId));
        displayDialog(Clicked_Pokemon);
    }
}

function displayDialog(pokemon) {
    $pokemon_dialog.showModal();

    let types = [];
    let moves = [];
    pokemon.types.forEach((item) => types.push(item.type.name));
    pokemon.moves.forEach((item) => moves.push(item.move.name));

    moves.length = 6;
    $pokemon_dialog.innerHTML = `
  <div class="dialogContainer">
    <div class="dialogHeader">
      <h2 class="dialogTitle">${pokemon.name}</h2>
      <button id="dialogClose">X</button>
    </div>
    <div class="dialogData">
      <img src="${pokemon.sprites.other["official-artwork"].front_shiny}" alt="" />
      <div class="dialogText" data-id="${pokemon.id}">
        <div>
          <h3 class="types">Types</h3>
          <p class="typesText">${types}</p>
        </div>
        <div>
          <h3 class="moves">Moves</h3>
          <p class="movesText">${moves}</p>
        </div>
        ${savedArray.includes(pokemon.id)
            ? `<button class="delete" data-id="${pokemon.id}">Delete</button>`
            : `<button class="catch" data-id="${pokemon.id}">Catch</button>`
        }
      </div>
    </div>
  </div>
`;
    let closeBtn = $pokemon_dialog.querySelector("#dialogClose");
    let dltBtn = $pokemon_dialog.querySelector(`.delete`);
    console.log(dltBtn);
    if (dltBtn) {
        dltBtn.addEventListener("click", pokeDelete);
    }
    let catchBtn = $pokemon_dialog.querySelector(".catch");

    closeBtn.addEventListener("click", () => {
        $pokemon_dialog.close();
    });

    catchBtn.addEventListener("click", catchAction);
}
function catchAction(ev) {
    ev.preventDefault();
    DataId = ev.target.getAttribute("data-id");
    Clicked_Pokemon = printData.find((item) => item.id === Number(DataId));
    if (!savedArray.includes(Number(DataId))) {
        savedArray.push(Clicked_Pokemon.id);
        let cardElement = document.querySelector(`.card[data-id="${DataId}"]`);
        cardElement.classList.add("green");
        let caught = document.querySelector(`.caught[data-id="${DataId}"]`);
        caught.classList.add("white");
        $pokemon_dialog.close();
        saveData();
    }
}

function pokeDelete(ev) {
    console.log(ev.target);
    ev.preventDefault();
    DataId = ev.target.getAttribute("data-id");

    const index = savedArray.indexOf(Number(DataId));
    if (index !== -1) {
        savedArray.splice(index, 1);
    }

    let cardElement = document.querySelector(`.card[data-id="${DataId}"]`);
    cardElement.classList.remove("green");

    let caught = document.querySelector(`.caught[data-id="${DataId}"]`);
    caught.classList.remove("white");

    let catchbtn1 = document.querySelector(`.delete[data-id="${DataId}"]`);
    let catchBtn = document.createElement("button");
    catchBtn.setAttribute("class", "catch");
    catchBtn.setAttribute("data-id", DataId);
    catchBtn.innerHTML = "Catch";
    catchbtn1.replaceWith(catchBtn);

    saveData();
    pokeDelete.close();
}

function caughtAction() {
    console.log(savedArray);
}

$morepokemons.addEventListener("click", async function (ev) {
    ev.preventDefault();
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pokedata.length}`
    );
    const data = await response.json();
    anotherFetch(data);
});

fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
    .then((response) => response.json())
    .then((data) => {
        anotherFetch(data);
    });
