const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passConfig = require('./config/passport');
const GStrategy = require()

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: passConfig.google.clientID,
      clientSecret: passConfig.google.clientSecret,
      callbackURL: passConfig.google.callbackURL,
      scope: ['profile'],
      state: true
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can handle the user authentication logic and save the user to the database
      // For example, you can find or create a user in your MySQL database based on the profile information
      // and call the `done` callback with the user object.
      // The `profile` object contains information about the authenticated user.
      sequelize.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
          'https://accounts.google.com',
          profile.id
        ], function (err, cred) {
          if (err) { return cb(err); }

          if (!cred) {
            // The account at Google has not logged in to this app before.  Create a
            // new user record and associate it with the Google account.
            sequelize.run('INSERT INTO users (name) VALUES (?)', [
              profile.displayName
            ], function (err) {
              if (err) { return cb(err); }

              var id = this.lastID;
              sequelize.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
                id,
                'https://accounts.google.com',
                profile.id
              ], function (err) {
                if (err) { return cb(err); }

                var user = {
                  id: id,
                  name: profile.displayName
                };
                return cb(null, user);
              });
            });
          } else {
            // The account at Google has previously logged in to the app.  Get the
            // user record associated with the Google account and log the user in.
            sequelize.get('SELECT * FROM users WHERE id = ?', [cred.user_id], function (err, user) {
              if (err) { return cb(err); }
              if (!user) { return cb(null, false); }
              return cb(null, user);
            });
          }
        });
      }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Here, you can retrieve the user from the database based on the `id` and call the `done` callback with the user object.
});


// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

