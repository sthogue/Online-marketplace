// JS for edit.handlebars
document.addEventListener('DOMContentLoaded', () => {
    // Selects the edit form
    const editItemForm = document.querySelector('#editItemForm');
    console.log(editItemForm)
    // Event listener for when the edit form is submitted
    editItemForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const itemId = document.location.href.split('/').pop();
      console.log(itemId)

      // Selects input fields
      const categoryInput = document.querySelector('#item_category');
      const itemNameInput = document.querySelector('#item_name');
      const itemPriceInput = document.querySelector('#item_price');
      const itemDescriptionInput = document.querySelector('#description');
      
      // Gets the values from the input fields
      const category = categoryInput.value.trim();
      const itemName = itemNameInput.value.trim();
      const itemPrice = itemPriceInput.value.trim();
      const itemDescription = itemDescriptionInput.value.trim();
  
      // Updates the item object
      const updatedItem = {
        category_name: category,
        item_name: itemName,
        price: itemPrice,
        description: itemDescription,
      };
      
      // Sends a PUT request to update the selected item
      try {
        const response = await fetch(`/api/item/edit-item/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
        });
        // If the edit is successful redirects to the profile page, otherwise alerts the user it failed
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to edit item');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while editing the item');
      }
    });
  });
  