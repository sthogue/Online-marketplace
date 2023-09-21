// JS for logout.handlebars
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  // If the logout is successful redirects to the homepage, otherwise alerts the user it failed
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('logout').addEventListener('click', logout);
