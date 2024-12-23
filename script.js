
let quotesData = [];

// Fetch quotes data
fetch('./data/quotes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    quotesData = data;
    const firstItemDiv = document.getElementById('first-item');
    firstItemDiv.textContent = data[0]["content"];
  })
  .catch(error => {
    console.error('Error fetching the JSON file:', error);
  });

// Fetch authors data
fetch('./data/authors.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const dataList = document.getElementById('data-suggestions');

    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      dataList.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching the JSON file:', error);
  });

// Handle form submission
document.getElementById('submit-button').addEventListener('click', () => {
  const inputName = document.getElementById('data-input').value;
  const resultMessage = document.getElementById('result-message');
  const authorDetailsContainer = document.getElementById('author-details');

  // Clear previous author details
  authorDetailsContainer.innerHTML = '';

  if (quotesData.length > 0 && inputName === quotesData[0]["author"]) {
    resultMessage.textContent = 'Match found: The input matches the author.';
  } else {
    resultMessage.textContent = 'No match: The input does not match the author.';

    // Fetch authors data to get details
    fetch('./data/authors.json')
      .then(response => response.json())
      .then(authorsData => {
        const authorData = authorsData.find(author => author.name === inputName);

        if (authorData) {
          const authorDetailsHTML = `
            <div class="author-card">
              <div class="author-header">
                <div class="author-avatar"></div>
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
