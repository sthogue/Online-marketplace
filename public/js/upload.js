const uploadFileHandler = async (event) => {
  event.preventDefault();

  const categoryInput = document.querySelector('#category'); // Target the select for category
  const itemNameInput = document.querySelector('#itemName'); // Target the input for item name
  const itemPriceInput = document.querySelector('#itemPrice'); // Target the input for item price
  const itemDescriptionInput = document.querySelector('#itemDescription'); // Target the textarea for item description

  const name = itemNameInput.value.trim();
  const price = itemPriceInput.value.trim();
  const description = itemDescriptionInput.value.trim();

  // Validate your form fields as needed (e.g., check if they are not empty)

  // Create a FormData object to send data to the server
  const formData = new FormData();

  // Append form data with the item details
  formData.append('category_name', categoryInput.value);
  formData.append('item_name', name);
  formData.append('price', price);
  formData.append('description', description);
  formData.append('date_created', new Date());
  formData.append('user_id', req.session.user_id);

  try {
    const response = await fetch('/api/items', { // Updated API route for creating items
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      document.location.replace('/profile'); // Redirect to the profile page on success
    } else {
      alert('Failed to create item');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while creating the item');
  }
};

// Target the form in your upload.handlebars
const createItemForm = document.querySelector('#createItemForm');

// Attach the event listener to the form's submit button
createItemForm.addEventListener('submit', uploadFileHandler);
