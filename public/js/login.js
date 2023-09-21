// JS for login.handlebars
const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("loginFormHandler");

  // Selects the email and password fields
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // If the email and password fields are not empty, sends a POST request to the login route
  if (email && password) {

    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If the login is successful redirects to the profile page, otherwise alerts the user it failed
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const googleFormHandler = async (event) => {
  event.preventDefault();  
  document.location.replace('/api/users/auth/google');
};

document
  .querySelector('#login-btn')
  .addEventListener('click', loginFormHandler);

document
  .querySelector('#google-login')
  .addEventListener('click', googleFormHandler);
