const router = require('express').Router();
const { Item, User } = require('../models');
const { GLwithAuth } = require('../utils/auth');


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
      logged_in: req.session.logged_in || req.isAuthenticated()
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/upload', (req, res) => {

  res.render('upload');
});

router.get('/edit-item/:id', (req, res) => {

  res.render('edit');
});

router.get('/about', (req, res) => {

  res.render('about');
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

    

    res.render('item', {
      ...item,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route

  router.get('/profile', GLwithAuth, async (req, res) => {

   try {
      let userID;
      //Find the logged in user based on the session ID
      if (req.session.user_id === undefined) {
        userID = req.user.id;
      } else {
        userID = req.session.user_id;
      }

      const userData = await User.findByPk(userID, {
        attributes: { exclude: ['password'] },
        include: [{ model: Item }],
      });

      console.log(userData);
  
      const user = userData.get({ plain: true });
  
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
        ...user,
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

//router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect or respond with a success message
    if (req.session.logged_in) {
      res.redirect('homepage');
    }
  }
);

router.get('/logout', function (req, res, next) {

  if (req.session.user_id === undefined) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
       
  } else {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
    return res.redirect('/');
  }
});

module.exports = router;
