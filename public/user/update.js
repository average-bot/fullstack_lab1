// Forms
const updateForm = document.querySelector('#update-form');

// Update input id
const updateId = document.querySelector('#update-id');
const updateName = document.querySelector('#update-name');
const updateAge = document.querySelector('#update-age');

// Error messages
const updateErrorMsg = document.querySelector('#update-error');

// Search results
const updateResult = document.querySelector('#update-result');

// Search for user by id
updateForm.addEventListener('submit', e => {
    e.preventDefault();
    const updateDetails = {
        id: updateId.value,
        name: updateName.value,
        age: updateAge.value
    };

    fetch(`/api/users/${updateDetails.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateDetails)
    })
    .then(res => res.json())
    .then(response => { 
        if(response.message) {
            updateErrorMsg.innerHTML = response.message;
        } else {
            updateResult.innerHTML = "Id: " + response.id + ", Name: " + response.name + ", Age: " + response.age;
            console.log(response);
            updateErrorMsg.innerHTML = '';
        }
    });
});