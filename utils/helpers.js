module.exports = {
  // formats the date to MM/DD/YYYY
  format_date: (date) => {

    return date.toLocaleDateString();
  },
  // Brings in an image based on the category name
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
      imagePath = "/images/default.png";
    } else {
      imagePath = "/images/default.jpg";
    }

    return `<img src="${imagePath}" alt="${category_name}" width="100" height="100">`;
  },
  // Brings in the seller's email
  sellerEmail: (email) => {
    return email;
  },
  // Formats the price to 2 decimal places
  format_amount: (amount) => {
    const parsedAmount = parseFloat(amount);

    if (!isNaN(parsedAmount)) {
      return parsedAmount.toFixed(2);
    } else {
      return "Invalid Amount";
    }
  }
};