const apiKey = "bqbDmfF5WJdMwepNzuuMZDtQwz7gNpcoPue08l2GAkJSKpsOcE05Jqn4";

function loadImages(url) {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((data) => {
      const albumContainer = document.querySelector(".album .container .row");
      albumContainer.innerHTML = "";

      data.photos.forEach((photo) => {
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-4";

        const cardDiv = document.createElement("div");
        cardDiv.className = "card mb-4 shadow-sm";

        const img = document.createElement("img");
        img.src = photo.src.medium;
        img.className = "bd-placeholder-img card-img-top ";

        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = photo.photographer;

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = "Lorem Ipsum";

        const cardFooterDiv = document.createElement("div");
        cardFooterDiv.className =
          "d-flex justify-content-between align-items-center";

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        const viewButton = document.createElement("button");
        viewButton.className = "btn btn-sm btn-outline-secondary";
        viewButton.textContent = "View";

        const hideButton = document.createElement("button");
        hideButton.className = "btn btn-sm btn-outline-secondary";
        hideButton.textContent = "Hide";
        hideButton.addEventListener("click", () => {
          colDiv.remove();
        });

        const smallP = document.createElement("small");
        smallP.className = "text-muted";
        smallP.textContent = photo.id;

        btnGroup.appendChild(viewButton);
        btnGroup.appendChild(hideButton);

        cardFooterDiv.appendChild(btnGroup);
        cardFooterDiv.appendChild(smallP);

        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(cardFooterDiv);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBodyDiv);

        colDiv.appendChild(cardDiv);

        albumContainer.appendChild(colDiv);
      });
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}
// Funzione per creare la barra di ricerca dinamicamente
function createSearchBar() {
  const searchContainer = document.createElement("div");
  searchContainer.className = "container";

  const searchRow = document.createElement("div");
  searchRow.className = "row";

  const searchCol = document.createElement("div");
  searchCol.className = "col-md-12";

  const inputGroup = document.createElement("div");
  inputGroup.className = "input-group mb-3";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "searchInput";
  searchInput.className = "form-control";
  searchInput.placeholder = "Search images...";

  const searchBtn = document.createElement("button");
  searchBtn.type = "button";
  searchBtn.id = "searchBtn";
  searchBtn.className = "btn btn-outline-primary";
  searchBtn.textContent = "Search";

  inputGroup.appendChild(searchInput);
  inputGroup.appendChild(searchBtn);

  searchCol.appendChild(inputGroup);
  searchRow.appendChild(searchCol);
  searchContainer.appendChild(searchRow);

  // Seleziono il container dove vogliamo aggiungere la barra di ricerca
  const searchsContainer = document.querySelector(".search");
  // aggiungo la barra di ricerca al container
  searchsContainer.appendChild(searchContainer);

  // aggiungo l'event listener per il bottone di ricerca
  searchBtn.addEventListener("click", function () {
    // ottengo la ricerca dall'input, rimuovendo gli spazi vuoti
    const searchTerm = searchInput.value.trim();
    // eseguo la funzione di ricerca con il termine ottenuto
    performSearch(searchTerm);
  });
  //aggiungo l'event listener per la pressione del tasto "Enter" nell'input
  searchInput.addEventListener("keypress", function (event) {
    // verifico se il tasto premuto è "Enter"
    if (event.key === "Enter") {
      //ottengo il termine di ricerca rimuovendo gli spazi
      const searchTerm = searchInput.value.trim();
      //eseguo la funzione per cercare
      performSearch(searchTerm);
    }
  });
  // funzione per cercare le immagini
  function performSearch(searchTerm) {
    //verifico se il campo di ricerca non è vuoto
    if (searchTerm !== "") {
      let url;
      // decido l'URL in base al termine di ricerca inserito
      if (searchTerm === "mountains") {
        url = "https://api.pexels.com/v1/search?query=mountains";
      } else if (searchTerm === "dog") {
        url = "https://api.pexels.com/v1/search?query=dog";
      } else {
        // codifico correttamente il termine di ricerca nell'URL nel caso contenga spazi o caratteri speciali
        url =
          "https://api.pexels.com/v1/search?query=" +
          encodeURIComponent(searchTerm);
      }

      loadImages(url);
    } else {
      console.log("Inserire un termine di ricerca valido");
    }
  }
}
//chiamo la funzione per generare la barra

createSearchBar();

// funzione sui bottoni
document
  .querySelectorAll(".btn-primary.my-2, .btn-secondary.my-2")
  .forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      let url;

      if (this.id === "loadImagesBtn") {
        url = "https://api.pexels.com/v1/search?query=cat";
      } else if (this.id === "loadSecondaryImagesBtn") {
        url = "https://api.pexels.com/v1/search?query=dog";
      }

      loadImages(url);
    });
  });
