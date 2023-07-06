import api from "./cat-api.js";
// import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const select = document.querySelector(".breed-select");
select.classList.add("hidden");
// new SlimSelect({
//     select: select,
//     settings: {
//         alwaysOpen: false,
//         openPosition: "down",
//         showSearch: false,
//         closeOnSelect: true,
//     }
// });

const loader = document.querySelector(".loader");
const errorMessage = document.querySelector(".error");
errorMessage.classList.add("hidden");
const catInfo = document.querySelector(".cat-info");

api.fetchBreeds()
    .then(optionsList => {
        console.log(optionsList);
        optionsList.forEach(element => {
           let option = document.createElement("option");
           option.setAttribute("value", element.id);
           option.classList.add("option");
           select.append(option);
           option.textContent = element.name;
        });
        
        select.classList.remove("hidden");
        loader.classList.add("hidden");
    })
    .catch(err => {
        loader.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    });

select.addEventListener("change", (event) => {
    loader.classList.remove("hidden");
    catInfo.classList.add("hidden");
    errorMessage.classList.add("hidden");
    api.fetchCatByBreed(event.currentTarget.value)
    .then(result => {
        console.log(result);        
        catInfo.innerHTML = `<div class="cat-data"><img src="${result[0].url}" width="550px" class="cat-image" alt="">
        <div class="breed-info"><h2 class="breed-name">${result[0].breeds[0].name}</h2>
        <p class="breed-description">${result[0].breeds[0].description}</p>
        <p class="breed-temperament"><span>Temperament: </span>${result[0].breeds[0].temperament}</p></div></div>`;  
        loader.classList.add("hidden");
        catInfo.classList.remove("hidden");
       
    })
    .catch (err => {
        loader.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    });
});

