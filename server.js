// import dependencies (express, express-session, handlebars, etc.)
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passConfig = require('./config/passport');
const crypto = require('crypto');
const { User } = require('./models');
 
// const userData = [];

// import sequelize and session store to store session data
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// set the value of the PORT to 3001
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// set the variable that configures the session middleware using the express-session library
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


// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(passport.initialize());

// app.use(passport.authenticate('session'));
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) =>{
    done(null, user)
  })
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
        var user = await User.findOne({
          where:
            { email: profile.emails[0].value }
        });

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
        console.error("f;adslkfjalsd", err);
        return done(err);
      }
    }
  )
);


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

