const router = require('express').Router();
const { Item } = require('../../models');
const {GLwithAuth} = require('../../utils/auth');

// this is a GET request to get ALL items listed in the database

router.get('/', async (req, res) => {
  try {
    const newItem = await Item.findAll();
    ({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItem);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// this is a GET request to get one item BY ID in the database
router.get('/:id', async (req, res) => {
  try {
    const newItem = await Item.findOne();
    ({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItem);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// this is a POST request to CREATE a new item with a unique ID
router.post('/', GLwithAuth, async (req, res) => {
  try {
    console.log(req.body);
    const { category, name, price, description, date } = req.body;

    console.log(category, name, price, description, date)
    // Create a new item with the received data
    const newItem = await Item.create({
      category_name: category,
      item_name: name,
      price: price,
      description: description,
      date_created: date,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

// this is a DELETE request to delete an item from the database
router.delete('/:id', GLwithAuth, async (req, res) => {
try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: 'No Item found with this id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT request updates the item in the database
router.put('/edit-item/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findByPk(itemId);

    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    const updatedItem = await Item.update(req.body, {
      where: {
        id: itemId,
      },
    });

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
