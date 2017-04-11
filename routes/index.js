var express = require("express"),
    passport   = require("passport"),
    User       = require("../models/user");
    
var router  = express.Router();

//Homepage
router.get('/', function(req, res) {
  res.render('landing'); 
});

//==============================================================================
//AUTHENTICATION
//==============================================================================

//Sign up
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});


router.post("/register", function(req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      res.render("register", {error: err.message});
    } else {
      passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to the Yelpcamp: " + user.username);
      res.redirect("/campgrounds");
      });
    }
  });
});

// Login
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {
});

// Log out
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged You Out");
  res.redirect("/");
});

// function isLoggedIn(req, res, next) {
//   if(req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }

module.exports = router;