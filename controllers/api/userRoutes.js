const router = require('express').Router();
const { User } = require('../../models');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passConfig = require('../../config/passport');
const crypto = require('crypto');

const userData = [];

router.get('/', async(req, res) => {
  try {
    //const userDataPath = path.join(__dirname, '../../seeds/userData.json');
    //const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: passConfig.google.clientID,
      clientSecret: passConfig.google.clientSecret,
      callbackURL: passConfig.google.callbackURL,
      scope: ['profile']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
                    // Find or create a user in the database based on their Google ID
          const user = await User.findOne({ 
            where: 
              { email: profile.emails[0].value} });

          if (!user) {
            const lastName = profile.name.familyName[0];
            const lastFirstLetter = lastName.charAt(0).toUpperCase();
            var salt = crypto.randomBytes(16);
            var hashed_password = crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256')

            user = await User.create({
              googleId: profile.id,
              name: profile.name.givenName + ' ' + lastFirstLetter,
              email: profile.emails[0].value,
              password: hashed_password,
              provider: 'google',
              // Add other user properties as needed
            });

          }
          return done(null, user);
         } catch (err) {
          return done(err);
        }
      } 
  )
);
    
passport.serializeUser((user, done) => {
  process.nextTick(function () {
    done(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser((user, done) => {
  // Here, you can retrieve the user from the database based on the `id` and call the `done` callback with the user object.
  process.nextTick(function () {
    return done(null, user);
  });
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//initiates the authentication process and redirects the user to the Google login page
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

//handles the callback from Google after the user has logged in and exchanges the authorization code for user information
// router.get('/auth/google/callback', 
//   passport.authenticate('google', {  failureRedirect: '/login', successRedirect: '/profile' }, (req, res) => {
//     // Redirect or respond with a success message
//     if (req.session.logged_in) {
//       req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;;
//       } else {
//         res.redirect('/login');
//         })),
// );

router.get('/auth/google/callback', function (req, res, next) {
  passport.authenticate('google', function (err, user, info, status) {
    if (err) { 
      return res.redirect('/login'); }
    if (!user) { return res.redirect('/login') }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(userData)
    });
    res.redirect('/profile');
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
