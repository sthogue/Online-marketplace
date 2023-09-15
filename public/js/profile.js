const delButtonHandler = async (event) => {
  if (event.target.classList.contains('delete-button')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete item');
    }
  }
};

const editButtonHandler = (event) => {
  if (event.target.classList.contains('edit-button')) {
    const id = event.target.getAttribute('data-id');
    document.location.href = `/edit-item/${id}`;
  }
};

document.querySelectorAll('.btn-group').forEach((btnGroup) => {
  btnGroup.addEventListener('click', (event) => {
    editButtonHandler(event);
    delButtonHandler(event);
  });
});

