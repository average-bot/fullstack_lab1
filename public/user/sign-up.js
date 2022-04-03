// Forms
const signUpForm = document.querySelector('#sign-up-form');

// Sign up inputs
const signUpId = document.querySelector('#sign-up-id');
const signUpName = document.querySelector('#sign-up-name');
const signUpAge = document.querySelector('#sign-up-age');

// error messages
const signUpErrorMsg = document.querySelector('#sign-up-error');


// Create new user
signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const signUpDetails = {
        id: signUpId.value,
        name: signUpName.value,
        age: signUpAge.value
    };

    fetch('/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpDetails)
    })
    .then(res => res.json())
    .then(response => { 
        if(response.message) {
            signUpErrorMsg.innerHTML = response.message;
        } else {
            console.log(response);

            signUpErrorMsg.innerHTML = '';
        }
    });
});