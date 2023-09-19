// Add an event listener to the form when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Select the edit form
    const editItemForm = document.querySelector('#editItemForm');
  
    // Attach an event listener to the form's submit button
    editItemForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Get the item ID from the form's action URL
      const actionUrl = editItemForm.getAttribute('action');
      const itemId = actionUrl.split('/').pop();
  
      // Get the form fields
      const itemNameInput = document.querySelector('#item_name');
      const itemPriceInput = document.querySelector('#price');
      const itemDescriptionInput = document.querySelector('#description');
  
      // Get the values from the form fields
      const itemName = itemNameInput.value.trim();
      const itemPrice = itemPriceInput.value.trim();
      const itemDescription = itemDescriptionInput.value.trim();
  
      // Create a data object with the updated item information
      const updatedItem = {
        item_name: itemName,
        price: itemPrice,
        description: itemDescription,
      };
  
      try {
        // Send a PUT request to update the item
        const response = await fetch(`/api/item/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
        });
  
        if (response.ok) {
          // Redirect to the profile page or wherever appropriate
          document.location.replace('/profile');
        } else {
          // Handle errors here
          alert('Failed to edit item');
        }
      } catch (error) {
        console.error(error);
        // Handle errors here
        alert('An error occurred while editing the item');
      }
    });
  });
  