
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
                // cells with id name age
                // id
                tr.insertCell().innerHTML = user.id;
                // name
                namecell = tr.insertCell()
                namecell.classList.add("name");
                namecell.innerHTML = user.name;

                namecell.ondblclick=function(){
                    var val=this.innerHTML;
                    var input=document.createElement("input");
                    input.value=val;
                    input.onblur=function(){
                        var val=this.value;
                        this.parentNode.innerHTML=val;
                        user.name = val;
                    }
                    this.innerHTML="";
                    this.appendChild(input);
                }
                // age
                agecell = tr.insertCell()
                agecell.classList.add("age");
                agecell.innerHTML = user.age;
               
                agecell.ondblclick=function(){
                    var val=this.innerHTML;
                    var input=document.createElement("input");
                    input.value=val;
                    input.onblur=function(){
                        var val=this.value;
                        this.parentNode.innerHTML=val;
                        user.age = val;
                    }
                    this.innerHTML="";
                    this.appendChild(input);
                    input.focus();
                }

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
                    updateRow(user.id, user.name, user.age);
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
            console.log(response.name, response.age);
            tableErrorMsg.innerHTML = '';
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
            tableErrorMsg.innerHTML = response.message;
        } else {
            alert("Database id: " + response._id + ", __ value: " + response.__v);
            tableErrorMsg.innerHTML = '';
        }
    });
}

showTable();