module.exports = {
  withAuth: (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  },
  GLwithAuth: (req, res, next) => {
    if (req.session.user_id === undefined && !req.isAuthenticated()) {
      res.redirect('/login');
    } else {
      next();
    }
  },
};
   