// Forms
const searchForm = document.querySelector('#search-form');

// Search input
const searchId = document.querySelector('#search-id');

// Error messages
const searchErrorMsg = document.querySelector('#search-error');

// Search results
const searchResult = document.querySelector('#search-result');

// Search for user by id
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchDetails = {
        id: searchId.value
    };

    fetch(`/api/users/${searchDetails.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => { 
        console.log(response.message);
        if(response.message) {
            searchErrorMsg.innerHTML = response.message;
        } else {
            searchResult.innerHTML = "Name: " + response.name + ", Age: " + response.age;
            console.log(response.message);
            searchErrorMsg.innerHTML = '';
        }
    });
});