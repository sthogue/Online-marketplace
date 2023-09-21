// JS for profile.handlebars
const delButtonHandler = async (event) => {
  // If the delete button is clicked, sends a DELETE request to the delete route
  if (event.target.hasAttribute('data-id')) {
    // Gets the id from the delete button
    const id = event.target.getAttribute('data-id');
console.log(id);
    const response = await fetch(`/api/item/${id}`, {
      method: 'DELETE',
    });
    // If the delete is successful redirects to the profile page, otherwise alerts the user it failed
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete item');
    }
  }
};



// If the upload button is clicked, redirects to the upload page
document.getElementById("upload-button").addEventListener("click", function() {
  window.location.href = "/upload";
});

// If the edit button is clicked, redirects to the edit page
const editButtonHandler = (event) => {
  if (event.target.classList.contains('edit-button')) {
    const id = event.target.getAttribute('data-id');
    document.location.href = `/edit/${id}`;
  }
};

// If the logout button is clicked, sends a POST request to the logout route
document.querySelectorAll('.btn-group').forEach((btnGroup) => {
  btnGroup.addEventListener('click', (event) => {
    editButtonHandler(event);
    delButtonHandler(event);
  });
});

