const router = require('express').Router();
const { Item, User } = require('../models');
const { withAuth, ensureAuthenticated} = require('../utils/auth');


const passport = require('passport');


router.get('/', async (req, res) => {
  try {
    // Get all Items and JOIN with user data
    const itemData = await Item.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const items = itemData.map((item) => item.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      items, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/upload', (req, res) => {

  res.render('upload');
});

router.get('/edit', (req, res) => {

  res.render('edit');
});

router.get('/item/:id', async (req, res) => {
  try {
    const itemData = await Item.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    const item = itemData.get({ plain: true });

    // Check if the date property is valid before rendering the template
    if (item.date) {
      // Render the item template with valid date
      res.render('item', {
        ...item,
        logged_in: req.session.logged_in,
      });
    } else {
      // Handle the case where the date is not valid (e.g., set it to null or a default date)
      res.render('item', {
        ...item,
        logged_in: req.session.logged_in,
        date: new Date() // Replace with a default date value if needed
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route

// router.get('/profile', ensureAuthenticated, async (req, res) => {
  router.get('/profile', async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      // const userData = await User.findByPk(req.session.user_id, {
      //   attributes: { exclude: ['password'] },
      //   include: [{ model: Item }],
      // });
  
      // const user = userData.get({ plain: true });
  
      const itemData = await Item.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const items = itemData.map((item) => item.get({ plain: true }));
  
      res.render('profile', {
        // ...user,
        items,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  } 
    res.render('signup');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect or respond with a success message
    if (req.session.logged_in) {
      res.redirect('homepage');
    }
  }
);

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
  return redirect('/');
});

module.exports = router;
