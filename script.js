let quotesData = [];
let authorSuggestions = [];
let correct = false;
const submitButton = document.getElementById('submit-button');
const dataInput = document.getElementById('data-input');

// Fetch data asynchronously
async function fetchData() {
  try {
    const [quotesResponse, authorsResponse] = await Promise.all([
      fetch('./data/quotes.json'),
      fetch('./data/authors.json')
    ]);

    if (!quotesResponse.ok || !authorsResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const [quotesData, authorsData] = await Promise.all([
      quotesResponse.json(),
      authorsResponse.json()
    ]);

    // Set first quote
    const firstItemDiv = document.getElementById('first-item');
    firstItemDiv.textContent = '"' + quotesData[0]["content"] + '"';

    // Populate author suggestions
    authorSuggestions = authorsData.map(author => author.toLowerCase());
    const dataList = document.getElementById('data-suggestions');

    authorsData.forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      dataList.appendChild(option);
    });

    // Add input validation
    dataInput.addEventListener('input', event => {
      submitButton.disabled = !authorSuggestions.includes(event.target.value.toLowerCase()) || correct;
    });

    return { quotesData, authorsData };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Initialize data on page load
fetchData().then(({ quotesData: data }) => {
  quotesData = data;
});

// Handle form submission
document.getElementById('submit-button').addEventListener('click', () => {
  const inputName = dataInput.value;
  const authorDetailsContainer = document.getElementById('author-details');

  // Clear previous author details
  authorDetailsContainer.innerHTML = '';

  // Clear input and disable submit button
  dataInput.value = '';
  submitButton.disabled = true;

  if (quotesData.length > 0 && inputName === quotesData[0]["author"]) {
    correct = true;

    const submitButton = document.getElementById('submit-button');
    submitButton.disabled = true;

  } else {

    // Fetch authors data to get details
    fetch('./data/authors.json')
      .then(response => response.json())
      .then(authorsData => {
        let authorData = authorsData.find(author => author.name === inputName);
        authorData = {
          name: "Jamison Lahman",
          nationality: "USA",
          gender: "male",
          profession: "scientist",
          timePerioud: "contemporary",
        }
        console.log(authorData);
        if (authorData) {
          const authorDetailsHTML = `
            <div class="card">
              <div class="author-avatar"></div>
              <div class="author-header">
                <h2>${authorData.name}</h2>
              </div>
              <div class="author-info">
                <p><strong>Nationality:</strong> ${authorData.nationality}</p>
                <p><strong>Gender:</strong> ${authorData.gender}</p>
                <p><strong>Profession:</strong> ${authorData.profession}</p>
                <p><strong>Time Period:</strong> ${authorData.timePeriod}</p>
              </div>
            </div>
          `;
          authorDetailsContainer.innerHTML = authorDetailsHTML;
        }
      })
      .catch(error => {
        console.error('Error fetching author details:', error);
      });
  }
});
