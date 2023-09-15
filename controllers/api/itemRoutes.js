const router = require('express').Router();
const { Item } = require('../../models');
const {withAuth} = require('../../utils/auth');

// this is a GET request to get ALL items listed in the database

// router.get('/', withAuth,  async (req, res) => {

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
// router.get('/:id', withAuth, async (req, res) => {

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
// router.post('/', withAuth, async (req, res) => {

  router.post('/', async (req, res) => {
  try {
    const newItem = await Item.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

// this is a DELETE request to delete an item from the database
// router.delete('/:id', withAuth, async (req, res) => {

router.delete('/:id', async (req, res) => {
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

module.exports = router;
