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
        if(response.message) {
            displayErrorMsg.innerHTML = response.message;
        } else {
            displayResults.innerHTML = "";
            response.forEach(user => {
                // change to a table
                displayResults.innerHTML += "Id: " + user.id + ", Name: " + user.name + ", Age: " + user.age + "<br>";
            });
            
            console.log(response);
            displayErrorMsg.innerHTML = '';
        }
    });
});