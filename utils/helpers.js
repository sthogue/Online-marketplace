module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  // function to generate an image if category_name equals a specific category
  // it specifies an image path based on category name
  thumbnail: (category_name) => {
    let imagePath;

    if (category_name === "Electronics") {
      imagePath = "/images/electronics.jpeg";
    } else if (category_name === "Furniture") {
      imagePath = "/images/furniture.jpeg";
    } else if (category_name === "Clothing") {
      imagePath = "/images/clothing.png";
    } else if (category_name === "Books") {
      imagePath = "/images/books.avif";
    } else if (category_name === "Toys") {
      imagePath = "/images/toys.jpeg";
    } else if (category_name === "Furniture") {
      imagePath = "/images/furniture.jpeg";
    } else if (category_name === "Other") {
      imagePath = "/images/other.jpeg";
    } else {
      imagePath = "/images/default.jpg";
    }

    return `<img src="${imagePath}" alt="${category_name}" width="100" height="100">`;
  }
};
