
// Forms
const displayForm = document.querySelector('#display-all-form');

// Error messages
const displayErrorMsg = document.querySelector('#display-all-error');
const tableErrorMsg = document.querySelector('#table-error');

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
            displayTable.innerHTML = "";
            response.forEach(user => {
                tr = displayTable.insertRow();
                // cells
                // id
                userCell(tr, user, "id");
                // name
                userCell(tr, user, "name")
                //age
                userCell(tr, user, "age");

                // cells with buttons
                // delete button
                buttonRouter(tr, user, "delete");
                // update button
                buttonRouter(tr, user, "update");
                // show details button
                buttonRouter(tr, user, "details")
            });
            displayErrorMsg.innerHTML = '';
            tableErrorMsg.innerHTML = '';
        }
    });
}
// Cells for buttons + functionality
function buttonRouter(tr, user, named){
    td = tr.insertCell();
    button = td.appendChild(document.createElement('button'));
    button.innerHTML = named;
    button.addEventListener('click',  e=>{
        e.preventDefault();
        if(named == "delete") deleteRow(user.id);
        if(named == "update") updateRow(user.id, user.name, user.age);
        if(named == "details") detailRow(user.id);
        tableBuilder();
    });
}

// Cells for id, name, age & editable
function userCell(tr, user, cellName){
    onecell = tr.insertCell()
    if (cellName == "id") onecell.innerHTML = user.id;
    if (cellName == "name") onecell.innerHTML = user.name;
    if (cellName == "age") onecell.innerHTML = user.age;

    if (cellName == "id") return; // cannot change user id!!
    onecell.ondblclick=function(){
        var val=this.innerHTML;
        var input=document.createElement("input");
        input.value=val;
        input.onblur=function(){
            var val=this.value;
            this.parentNode.innerHTML=val;
            if (cellName == "id") alert("You cannot change user id");
            if (cellName == "name") user.name = val;
            if (cellName == "age") user.age = val;
        }
        this.innerHTML="";
        this.appendChild(input);
    }
}

// Builds the table after waiting a bit
function tableBuilder(){
    setTimeout(showTable(), 400000);
    showTable(); // refresh the table
}

// delete from database
function deleteRow(id){
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
                tableErrorMsg.innerHTML = response.message;
            } else {
                tableErrorMsg.innerHTML = ''; // Show that its deleted
            }
        });
}

// update the row
function updateRow(id, updatedName, updatedAge){
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
            tableErrorMsg.innerHTML = response.message;
        } else {
            //console.log(response.name, response.age);
            tableErrorMsg.innerHTML = '';
        }
    });
}

//show details about the row
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
            tableErrorMsg.innerHTML = response.message;
        } else {
            alert("Database id: " + response._id + ", __ value: " + response.__v);
            tableErrorMsg.innerHTML = '';
        }
    });
}

// build the table when started
showTable();