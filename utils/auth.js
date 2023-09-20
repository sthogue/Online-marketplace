module.exports = {
  withAuth: (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  },
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    }
    res.redirect('/login');
  },
  GLwithAuth: (req, res, next) => {
    if (req.session.user_id === undefined && !req.isAuthenticated()) {
      res.redirect('/login');
    } else {
      next();
    }
  },
};
   