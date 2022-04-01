// Forms
const displayForm = document.querySelector('#display-all-form');

// Error messages
const displayErrorMsg = document.querySelector('#display-all-error');

// Display results
const displayResults = document.querySelector('#display-all-results');


// Display all users
displayForm.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`/api/users/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => { 
        if(response.error) {
            displayErrorMsg.innerHTML = response.error;
        } else {
            response.forEach(user => {
                // change to a table
                displayResults.innerHTML += "Name: " + user.name + ", Age: " + user.age;
            });
            
            console.log(response);
            displayErrorMsg.innerHTML = '';
        }
    });
});