var express = require("express"),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware");
    //User       = require("../models/user");

var router  = express.Router({mergeParams: true});

//==============================================================================
//COMMENTS ROUTES
//==============================================================================
//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});  
    }
  });
});
//Comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          req.flash("error", "Sorry something went wrong");
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Comment was created");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});
// Comment edit
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.isCommentBelongsToUser, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      Comment.findById(req.params.comment_id, function(err, comment) {
        if(err) {
          res.redirect("back");
        } else {
          res.render("./comments/edit", { campground: campground, comment: comment });
        }
      });  
    }
  });
});

// Comment update
router.put("/:comment_id", middleware.isLoggedIn, middleware.isCommentBelongsToUser, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if(err) {
      console.log(err);
      res.redirect("back");
    } else {
      updatedComment.save();
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
// Comments destroy
router.delete("/:comment_id", middleware.isLoggedIn, middleware.isCommentBelongsToUser, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment was deleted");
      res.redirect("back");
    }
  });
});

module.exports = router;