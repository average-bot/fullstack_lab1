// Display all users
//const usersDisplay = document.querySelector("#users");
//usersDisplay.innerHTML = "users here";



// Forms
const signUpForm = document.querySelector('#sign-up-form');

// Sign up inputs
const signUpId = document.querySelector('#sign-up-id');
const signUpName = document.querySelector('#sign-up-name');
const signUpAge = document.querySelector('#sign-up-age');

// error messages
const errorMsg = document.querySelector('#error');

signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const signUpDetails = {
        id: signUpId.value,
        name: signUpName.value,
        age: signUpAge.value
    };

    fetch('/api/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpDetails)
    })
    .then(res => res.json())
    .then(response => { 
        if(response.error) {
            errorMsg.innerHTML = response.error;
        } else {
            console.log(response);
            errorMsg.innerHTML = '';
            //localStorage.setItem('auth-token', response.token);
            //location.href = response.redirect;
        }
    });
});