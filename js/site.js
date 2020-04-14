fetch('https://dog.ceo/api/breeds/list/all')
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log(data);
  setBreeds(data);
  setBreedOptions();
});

let breeds = [];

function setBreeds(data) {
    breeds = data.message;
}

function setBreedOptions() {
    Object.keys(breeds).forEach(breed => {
        var breedOption = document.createElement("option");
        breedOption.value = breed;
        breedOption.appendChild(document.createTextNode(breed));
        document.getElementById("dlBreeds").appendChild(breedOption);
        if (breeds[breed].length > 0) {
            breeds[breed].forEach(subBreed => {
                var subBreedOption = document.createElement("option");
                subBreedOption.value = breed + " - " + subBreed;
                subBreedOption.appendChild(document.createTextNode(breed + " - " + subBreed));
                document.getElementById("dlBreeds").appendChild(subBreedOption);
            });
        }
    });
}

function searchBreeds() {
    var imgContainer = document.getElementById("homepageImageContainer");
    while(imgContainer.hasChildNodes()) {
        imgContainer.removeChild(imgContainer.firstChild);
    }
    var searchURL = "";
    var selectedBreed = document.getElementById("inputSearchBreed").value;
    var count = document.getElementById("selectSearchBreed").value;
    var dashIndex = selectedBreed.indexOf("-");
    if (dashIndex > 0) {
        var breed = selectedBreed.substring(0, dashIndex - 1);
        var subbreed = selectedBreed.substring(dashIndex + 2, selectedBreed.length);
        searchURL = "https://dog.ceo/api/breed/" + breed + "/" + subbreed + "/images/random/" + count;
    } else {
        searchURL = "https://dog.ceo/api/breed/" + selectedBreed + "/images/random/" + count
    }
    fetch(searchURL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        showSearchResults(data.message);
    });
}

function showSearchResults(imageURLs) {
    for(i = 0; i < imageURLs.length; i++) {
        var url = imageURLs[i];
        var img = document.createElement("img");
        img.src = url;
        img.classList = "image";
        document.getElementById("homepageImageContainer").appendChild(img);
    }
}