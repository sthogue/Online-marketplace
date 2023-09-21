// JS for upload.handlebars
const uploadFileHandler = async (event) => {
  event.preventDefault();
  // Selects the category, name, price, and description fields
  const categoryInput = document.querySelector('#category'); 
  const itemNameInput = document.querySelector('#itemName'); 
  const itemPriceInput = document.querySelector('#itemPrice'); 
  const itemDescriptionInput = document.querySelector('#itemDescription'); 
  // Gets the values from the input fields
  const category = categoryInput.value.trim();
  const name = itemNameInput.value.trim();
  const price = itemPriceInput.value.trim();
  const description = itemDescriptionInput.value.trim();
  // Creates an object with the values from the input fields
  const formData = {};

  formData.category= category;
  formData.name= name;
  formData.price= price;
  formData.description= description;
  formData.date = new Date();
  // Sends a POST request to create a new item
  try {
    const response = await fetch('/api/item/', { 
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });
    // If the item is created successfully redirects to the profile page, otherwise alerts the user it failed
    if (response.ok) {
      document.location.replace('/profile'); 
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
