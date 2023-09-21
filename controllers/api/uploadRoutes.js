// const router = require('express').Router();
// const { Item } = require('../../models');
// const { GLwithAuth } = require('../../utils/auth');

// router.post('/', GLwithAuth, async (req, res) => {
//   try {
//     const { itemName, itemPrice, itemDescription, uploadDate } = req.body;

//     const newItem = await Item.create({
//       category_name: category,
//       item_name: itemName,
//       price: itemPrice,
//       description: itemDescription,
//       date_created: uploadDate,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newItem);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// module.exports = router;
