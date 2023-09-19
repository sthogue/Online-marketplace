const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("loginFormHandler");
  // Collect values from the login form
  const email = document.querySelector('#floatingInput').value.trim();
  const password = document.querySelector('#floatingPassword').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const googleFormHandler = async (event) => {
  event.preventDefault();
  document.location.replace('/auth/google');
  console.log("-------googleFormHandler------");

};

document
  .querySelector('#login-btn')
  .addEventListener('click', loginFormHandler);

document
  .querySelector('#google-login')
  .addEventListener('click', googleFormHandler);
