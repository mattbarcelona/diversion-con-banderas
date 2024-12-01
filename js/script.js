let countriesList = document.getElementById("countries-list");

// Function to fetch and display countries

let countries = async () => {
  try {
    // Fetch the data

    const response = await fetch("https://restcountries.com/v3/all");

    if (!response.ok) {
      throw new Error("La solicitud no fue exitosa");
    }

    // Parse the JSON data

    const data = await response.json();

    // Sort the countries alphabetically by their common name

    const sortedCountries = data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );

    // Display the sorted data

    countriesList.innerHTML = sortedCountries

      .map(
        (country, index) => ` 

          <li> 

            <img src="${country.flags[0]}" alt="${country.name.common} flag" width="150"> 

            <span><strong>${country.name.common}</strong></span> 

            <button class="details-btn" data-index="${index}">Detalles</button> 

          </li> 

        `
      )

      .join("");

    // Add event listeners to "Detalles" buttons

    document.querySelectorAll(".details-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;

        ventanaEmergente(sortedCountries[index]);
      })
    );

    return sortedCountries;
  } catch (error) {
    countriesList.innerText = "Error: No se pudo obtener la lista de países.";

    console.error(error);
  }
};

// Function to handle the popup display

function ventanaEmergente(country) {
  const popUp = document.getElementById("popUp");

  const paisEmergente = document.getElementById("propiedadesPais");

  paisEmergente.innerHTML = ` 

    <img id="imgBandera" src="${country.flags[0]}" alt="Bandera de ${
    country.name.common
  }" /> 

    <p>País: ${country.name.common}</p> 

    <p>Capital: ${country.capital?.[0] || "N/A"}</p> 

    <p>Población: ${country.population.toLocaleString()}</p> 

    <p>Conducen por: ${country.car.side}</p> 

  `;

  popUp.classList.remove("oculto");
}

// Close popup button functionality

const popUpbtn = document.getElementById("popUpbtn");

popUpbtn.addEventListener("click", () => {
  const popUp = document.getElementById("popUp");

  popUp.classList.add("oculto");
});

// Call the function to fetch and display countries

countries();
