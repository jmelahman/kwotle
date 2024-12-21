
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
  console.log('handling click');
  const inputName = document.getElementById('data-input').value;
  const resultMessage = document.getElementById('result-message');

  if (quotesData.length > 0 && inputName === quotesData[0]["author"]) {
    resultMessage.textContent = 'Match found: The input matches the author.';
  } else {
    resultMessage.textContent = 'No match: The input does not match the author.';
  }
});
