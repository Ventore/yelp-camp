var Campground = require("../models/campground"),
    Comment    = require("../models/comment");

var middlewareObj = {
  
};

middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First");
  res.redirect("/login");
};

middlewareObj.isAuthor = function(req, res, next) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      req.flash("error", "Sorry, the page is not found");
      res.redirect("back");
    } else {
      if(foundCampground.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash("error", "You have to be an author to perform this action!");
        res.redirect("back");
      }
    }
  });
}

middlewareObj.isCommentBelongsToUser = function(req, res, next) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if(err) {
      req.flash("error", "Sorry, the comment is not found");
      res.redirect("back");
    } else {
      if(foundComment.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash("error", "You have to be an author to perform this action!");
        res.redirect("back");
      }
    }
  });
}

module.exports = middlewareObj;