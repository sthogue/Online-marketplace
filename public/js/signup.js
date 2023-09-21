// JS for signup.handlebars
const signupFormHandler = async (event) => {
    event.preventDefault();
    // Selects the name, email, and password fields
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // If the name, email, and password fields are not empty, sends a POST request to the signup route
    if (name && email && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    // If the signup is successful redirects to the profile page, otherwise alerts the user it failed
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);