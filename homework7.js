// Get references to the form and result container
const countryForm = document.getElementById('country-form');
const resultContainer = document.getElementById('result-container');

// Add event listener to the form
countryForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission

  // Get the country name from the form input
const countryName = document.getElementById('country-name').value;

try {
    // Fetch country data from the API
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();

    // If no data is returned, show an error message
    if (data.length === 0) {
    resultContainer.innerHTML = '<p>No country found with that name.</p>';
    return;
    }

    const country = data[0];

    // Create HTML elements to display country information
    const flagImg = document.createElement('img');
    flagImg.src = country.flags.png;
    flagImg.alt = `${country.name.common} Flag`;

    const coatOfArmsImg = document.createElement('img');
    coatOfArmsImg.src = country.coatOfArms.png;
    coatOfArmsImg.alt = `${country.name.common} Coat of Arms`;

    const currencyList = document.createElement('ul');
    for (const currency of Object.values(country.currencies)) {
    const currencyItem = document.createElement('li');
    currencyItem.textContent = currency.name;
    currencyList.appendChild(currencyItem);
    }

    const capital = document.createElement('p');
    capital.textContent = `Capital: ${country.capital}`;

    const languageList = document.createElement('ul');
    for (const language of Object.values(country.languages)) {
    const languageItem = document.createElement('li');
    languageItem.textContent = language;
    languageList.appendChild(languageItem);
    }

    // Clear previous result and append new elements
    resultContainer.innerHTML = '';
    resultContainer.appendChild(flagImg);
    resultContainer.appendChild(coatOfArmsImg);
    resultContainer.appendChild(document.createElement('h2')).textContent = 'Currencies:';
    resultContainer.appendChild(currencyList);
    resultContainer.appendChild(capital);
    resultContainer.appendChild(document.createElement('h2')).textContent = 'Languages:';
    resultContainer.appendChild(languageList);
} catch (error) {
    resultContainer.innerHTML = '<p>An error occurred while fetching country data.</p>';
    console.error(error);
}
});
