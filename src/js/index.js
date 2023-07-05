import api from "./cat-api.js";

const select = document.querySelector(".breed-select");

api.fetchBreeds()
    .then(optionsList => {
        console.log(optionsList);
        optionsList.forEach(element => {
           let option = document.createElement("option");
           option.setAttribute("value", element.id);
           select.append(option);
           option.textContent = element.name;
        });
    })
    .catch(err => {
        console.log(err)
    });

select.addEventListener("change", (event) => {
    api.fetchCatByBreed(event.currentTarget.value)
    .then(result => {
        console.log(result);
        const catInfo = document.querySelector(".cat-info");
        catInfo.innerHTML = `<img src="${result[0].url}" width="550px" class="cat-image" alt="">
        <h2 class="breed-name">${result[0].breeds[0].name}</h2>
        <p class="breed-description">${result[0].breeds[0].description}</p>
        <p class="breed-temperament"><span>Temperament</span>${result[0].breeds[0].temperament}</p>`;  
    })
    .catch (err => {
        console.log(err)
    });
});

const loader = document.querySelector(".loader");
loader.classList.add("hidden");
