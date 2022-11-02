// Setting some initial params which might be subject to change
const apiKey = '082401cbfa1c4ea9afb29dc33a06cad1';
const startDate = '2019-01-01';
const endDate = '2019-12-31';
const limit = 8; // I would prefer if the API accepted a limit in the request.

// Build the URL
const url = `https://api.rawg.io/api/games?dates=${startDate},${endDate}&ordering=-rating&key=${apiKey}`;

// Fetching DOM elements to change/Use
const loaderElement = document.querySelector('.loader');
const tableElement = document.querySelector('.result-table');
const tableBodyElement = document.querySelector('table > tbody');
const errorElement = document.querySelector('.error-div');

// Checking if value is empty, null or have a length under 1, returning Unknown if so. Else return Value as is.
const checkValue = (val) => {
  if (val === '' || val === null || val.length <= 0) {
    return 'Unknown';
  } else {
    return val;
  }
}

const fetchData = async () => {
  loaderElement.classList.toggle('hidden');
  await fetch(url)
    .then((res) => res.json())
    .then((result) => {
      const resArray = result.results;
      let list = "";
      for(let i = 0; i < limit; i++) {
        const name = resArray[i].name;
        const rating = resArray[i].rating;
        const numTags = resArray[i].tags.length;
        // Adding 1 to i to get correct line number to show
        list += `<tr><td>${i+1}</td><td>${checkValue(name)}</td><td>${checkValue(rating)}</td><td>${checkValue(numTags)}</td></tr>`;
      }
      tableBodyElement.innerHTML = list;
      loaderElement.classList.toggle('hidden');
      tableElement.classList.toggle('hidden');
    })
    .catch((e) => {
      loaderElement.classList.add('hidden');
      tableElement.classList.add('hidden');
      errorElement.textContent = 'Sorry, something went wrong. Please try again. If the problem persist, please contact the webmaster';
      errorElement.classList.toggle('hidden');
      console.log(e)
    });
}
fetchData();
