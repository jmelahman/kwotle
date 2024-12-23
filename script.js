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

function insertAuthor(authorData) {
  const authorDetailsContainer = document.getElementById('author-details');
  if (authorData) {
    const authorDetailsHTML = `
            <div class="card row">
              <div class="author-avatar">
                <img src="images/jamison.jpg"/>
                </div>
                <div class="author-details">
                <div class="author-header">
                  <h3>${authorData.name}</h3>
                </div>
                <div class="author-info">
                  <div class="correct"><strong>Gender</strong> ${authorData.gender}</div>
                  <div class="correct"><strong>Nationality</strong> ${authorData.nationality}</div>
                  <div class="close"><strong>Profession</strong> ${authorData.profession}</div>
                  <div><strong>Period</strong> ${authorData.timePeriod}</div>
                </div>
              </div>
            </div>
          `;
    authorDetailsContainer.innerHTML = authorDetailsHTML;
  }
}

// Handle form submission
document.getElementById('submit-button').addEventListener('click', () => {
  const inputName = dataInput.value;

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
        insertAuthor(authorData);
      })
      .catch(error => {
        console.error('Error fetching author details:', error);
      });
  }
});
