const uploadFileHandler = async (event) => {
  event.preventDefault();

  const categoryInput = document.querySelector('#category'); // Target the select for category
  const itemNameInput = document.querySelector('#itemName'); // Target the input for item name
  const itemPriceInput = document.querySelector('#itemPrice'); // Target the input for item price
  const itemDescriptionInput = document.querySelector('#itemDescription'); // Target the textarea for item description

  const category = categoryInput.value.trim();
  const name = itemNameInput.value.trim();
  const price = itemPriceInput.value.trim();
  const description = itemDescriptionInput.value.trim();

  // Validate your form fields as needed (e.g., check if they are not empty)

  // Create a FormData object to send data to the server
  const formData = {};

  // Append form data with the item details
  formData.category= category;
  formData.name= name;
  formData.price= price;
  formData.description= description;
  formData.date = new Date();

  try {
    const response = await fetch('/api/item/', { // Updated API route for creating items
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
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


const createItemForm = document.querySelector('#uploadForm');

createItemForm.addEventListener('submit', uploadFileHandler);
