const reguest = 'https://swapi.dev/api/people/';
const urlSearch = "http://swapi.dev/api/people/?search=";
const ulElement = document.querySelector('section > ul');
const btnSearch = document.querySelector(".btnSearch");
const inputSearch = document.querySelector("section.btn > input");
const sectionElement = document.querySelector("section.content");
const worldContentElement = document.querySelector("section.worldContent");


function getData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(callback)
        .catch(error => console.log(error));
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

getData(reguest, dataEdit);

function dataEdit(users) {

    removeAllChildNodes(ulElement)
    for (let i = 0; i < users.results.length; i++) {

        const _user = users.results[i];

        const liElement = document.createElement('li');

        liElement.setAttribute('name', _user.name);
        liElement.textContent = _user.name;
        ulElement.appendChild(liElement);
    }


    const previousBtn = document.createElement('button');
    previousBtn.textContent = '< Önceki Sayfa';
    ulElement.appendChild(previousBtn);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Sonraki Sayfa >';
    ulElement.appendChild(nextBtn);

    previousBtn.addEventListener('click', function() {
        getData(users.previous, dataEdit)
    }, false);

    nextBtn.addEventListener('click', function() {
        getData(users.next, dataEdit)
    }, false);


    function ulOnClick(event) {
        const name = event.target.getAttribute('name');

        for (let i = 0; i < users.results.length; i++) {
            const user = users.results[i];

            if (user.name == name) {
                editPerson(user);
                break;
            }
        }
    }
    ulElement.addEventListener('click', ulOnClick);
}

function search() {

    const url = `${urlSearch}${inputSearch.value}`;
    getData(url, dataEdit);

    inputSearch.value = "";
}

btnSearch.addEventListener('click', search)

inputSearch.addEventListener("keyup", evt => {
    if (evt.key === "Enter") {
        search()
    }
})

function editPerson(user) {

    getData(reguest);
    removeAllChildNodes(sectionElement);
    let name = user.name;
    let gender = user.gender;
    let hair_color = user.hair_color;
    let height = user.height;
    let eye_color = user.eye_color;
    let homeworld = user.homeworld;

    if (gender == "n/a") {
        gender = "Robot"
        hair_color = "Metal"
    }

    const articleElement = document.createElement("article");
    const h2Name = document.createElement("h2");
    const pGender = document.createElement("p");
    const pHairColor = document.createElement("p");
    const pEyeColor = document.createElement("p");
    const pHeight = document.createElement("p");

    h2Name.textContent = name;
    pGender.textContent = `Cinsiyet: ${gender}`;
    pHairColor.textContent = `Saç Rengi: ${hair_color}`;
    pEyeColor.textContent = `Göz Rengi: ${eye_color}`;
    pHeight.textContent = `Boyu: ${height}`;

    articleElement.appendChild(h2Name);
    articleElement.appendChild(pGender);
    articleElement.appendChild(pHairColor);
    articleElement.appendChild(pEyeColor);
    articleElement.appendChild(pHeight);
    sectionElement.appendChild(articleElement)
    getData(homeworld, editWorld);
}

function editWorld(planet) {

    removeAllChildNodes(worldContentElement);

    let name = planet.name;
    let diameter = planet.diameter;
    let terrain = planet.terrain;
    let population = planet.population;

    const planetArticleElement = document.createElement("article");
    const h1Describe = document.createElement("h1");
    const planeth2Name = document.createElement("h2");
    const pDiameter = document.createElement("p");
    const pTerrain = document.createElement("p");
    const pPopulation = document.createElement("p");

    h1Describe.textContent = "Doğduğu Gezegen:";
    planeth2Name.textContent = name;
    pDiameter.textContent = `Gezegen Çapı: ${diameter}`;
    pTerrain.textContent = `Toprak Yapısı: ${terrain}`;
    pPopulation.textContent = `nüfus: ${population}`;

    planetArticleElement.appendChild(h1Describe);
    planetArticleElement.appendChild(planeth2Name);
    planetArticleElement.appendChild(pDiameter);
    planetArticleElement.appendChild(pTerrain);
    planetArticleElement.appendChild(pPopulation);

    worldContentElement.appendChild(planetArticleElement);
}