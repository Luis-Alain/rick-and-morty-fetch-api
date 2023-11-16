async function fetchData() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("There was a problem with the fetch operation", error);
    throw error;
  }
}

async function getCharacterData() {
  try {
    const characters = await fetchData();
    const processedData = characters.map((character) => ({
      name: character.name,
      status: character.status,
      location: character.location.name,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: character.origin.name,
      image: character.image,
    }));

    renderCharacters(processedData);
    return processedData;
  } catch (error) {
    console.error("There was a problem processing character data", error);
  }
}

function renderCharacters(characters) {
  const container = document.getElementById("container");

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.classList.add("character-image");
    image.src = character.image;
    image.alt = character.name;

    const name = document.createElement("h2");
    name.textContent = character.name;

    const status = document.createElement("p");
    status.textContent = `Status: ${character.status}`;

    const location = document.createElement("p");
    location.textContent = `Location: ${character.location}`;

    const button = document.createElement("button");
    button.textContent = "See more details";
    button.addEventListener("click", () => {
      openModal(character);
    });

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(status);
    card.appendChild(location);
    card.appendChild(button);
    container.appendChild(card);
  });
}

// Función para abrir el modal con los detalles del personaje
function openModal(character) {
  const modal = document.getElementById("characterModal");

  modal.style.display = "flex";

  const modalName = document.getElementById("modalName");
  const modalStatus = document.getElementById("modalStatus");
  const modalLocation = document.getElementById("modalLocation");
  const modalImage = document.getElementById("modalImage");
  const modalSpecies = document.getElementById("modalSpecies");
  const modalGender = document.getElementById("modalGender");
  const modalOrigin = document.getElementById("modalOrigin");
  const modalType = document.getElementById("modalType");

  modalName.textContent = character.name;
  modalStatus.textContent = `Status: ${character.status}`;
  modalLocation.textContent = `Location: ${character.location}`;
  modalSpecies.textContent = `Species: ${character.species}`;
  modalGender.textContent = `Gender. ${character.gender}`;
  modalOrigin.textContent = `Origin: ${character.origin.name}`;
  if (character.type === "") {
    console.log("No type");
  } else {
    modalType.textContent = `Type: ${character.type}`;
  }
  modalImage.src = character.image;
  modalImage.alt = character.name;
}

function closeModal() {
  const modal = document.getElementById("characterModal");
  modal.style.display = "none";
}

getCharacterData();
