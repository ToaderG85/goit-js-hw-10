import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_W1Aq51ewr6O9OlWrm5m5bBNn1TAI8eQxav68DICiuVSMxRmH3hRIHw026l30H73G";

function fetchBreeds() {
    return axios.get(`https://api.thecatapi.com/v1/breeds`)
    .then(res => res.data);
  }

function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data);
}

export default {fetchBreeds, fetchCatByBreed};

