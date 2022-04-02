
// Forms
const displayForm = document.querySelector('#display-all-form');

// Error messages
const displayErrorMsg = document.querySelector('#display-all-error');

// Display results
const displayResults = document.querySelector('#display-all-results');

// Table 
const displayTable = document.querySelector('#users-table');


// Display all users
displayForm.addEventListener('submit', e => {
    e.preventDefault();
    showTable();
});

function showTable (){
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
            displayTable.innerHTML = "";
            response.forEach(user => {
                tr = displayTable.insertRow();

                // cells with id name age
                tr.insertCell().innerHTML = user.id;
                tr.insertCell().innerHTML = user.name;
                tr.insertCell().innerHTML = user.age;

                // cells with buttons
                // delete row
                td = tr.insertCell();
                button = td.appendChild(document.createElement('button'));
                button.innerHTML="delete";
                button.addEventListener('click', e=>{
                    e.preventDefault();
                    deleteRow(user.id); // delete from the database
                    setTimeout(showTable(), 400000);
                    showTable(); // refresh the table
                });
                
                // update row
                td = tr.insertCell();
                button = td.appendChild(document.createElement('button'));
                button.innerHTML="update";
                button.addEventListener('click',  e=>{
                    e.preventDefault();
    
                    updateRow(user.id, "kalle", 54); // hardcoded
                    setTimeout(showTable(), 400000);
                    showTable(); // refresh the table
                });

                // show details about row
                td = tr.insertCell();
                button = td.appendChild(document.createElement('button'));
                button.innerHTML="details";
                button.addEventListener('click', e=>{
                    e.preventDefault();
                    detailRow(user.id);
                }); 
            });
            displayErrorMsg.innerHTML = '';
        }
    });
}

// delete from database
function deleteRow(id){
    const deleteErrorMsg = document.querySelector('#delete-error');
        const deleteDetails = {
            id: id,
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
}

function updateRow(id, updatedName, updatedAge){
    //const updateName = document.querySelector('#update-name');
    //const updateAge = document.querySelector('#update-age');
    const updateDetails = {
        id: id,
        name: updatedName,
        age: updatedAge
    };

    fetch(`/api/users/${id}`, {
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
            //updateResult.innerHTML = "Name: " + response.name + ", Age: " + response.age;
            console.log(response.name);
            //updateErrorMsg.innerHTML = '';
        }
    });
}

function detailRow(id){
    fetch(`/api/users/${id}`, {
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
            alert("Database id: " + response._id + ", __ value: " + response.__v);
            searchErrorMsg.innerHTML = '';
        }
    });
}

showTable();