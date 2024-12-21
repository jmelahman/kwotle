fetch('data/quotes.json')
   .then(response => {
       if (!response.ok) {
           throw new Error('Network response was not ok');
       }
       return response.json();
   })
   .then(data => {
       console.log('First item:', data[0]["content"]);
   })
   .catch(error => {
       console.error('Error fetching the JSON file:', error);
   });
