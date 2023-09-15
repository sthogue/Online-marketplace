const router = require('express').Router();
const { Item } = require('../../models');
const { withAuth } = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const { imageName, imageDescription, uploadDate } = req.body;

    // Create a new item with the received data
    const newItem = await Item.create({
      category_name: category,
      name: imageName,
      description: imageDescription,
      date_created: uploadDate,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
