// Forms
const deleteForm = document.querySelector('#delete-form');

// delete input id
const deleteId = document.querySelector('#delete-id');

// Error messages
const deleteErrorMsg = document.querySelector('#delete-error');

// Search results
const deleteResult = document.querySelector('#delete-result');

// Search for user by id
deleteForm.addEventListener('submit', e => {
    e.preventDefault();
    const deleteDetails = {
        id: deleteId.value,
    };

    fetch(`/api/users/${deleteDetails.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteDetails)
    })
    .then(response => { 
        if(response.message) {
            deleteErrorMsg.innerHTML = response.message;
        } else {
            deleteErrorMsg.innerHTML = ''; // Show that its deleted
        }
    });
});