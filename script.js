fetch('./data/quotes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const firstItemDiv = document.getElementById('first-item');
    firstItemDiv.textContent = data[0]["content"];
  })
  .catch(error => {
    console.error('Error fetching the JSON file:', error);
  });

fetch('./data/authors.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const dataList = document.getElementById('data-suggestions');

    // Populate the datalist with options from the data
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      dataList.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching the JSON file:', error);
  });
