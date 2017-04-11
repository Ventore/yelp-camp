var express = require("express"),
    Campground = require("../models/campground"),
    middleware = require("../middleware");
    //Comment    = require("../models/comment");
    
var router  = express.Router();

//==============================================================================
//CAMPGROUNDS ROUTES
//==============================================================================

router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res) {
  var name = req.body.capmgroundName;
  var image = req.body.capmgroundImage;
  var description =req.body.capmgroundDescription;
  var price = req.body.capmgroundPrice;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCamp = {name: name, image: image, description: description, author:author, price: price};
  Campground.create(newCamp, function(err, newCampground) {
    if(err) {
      req.flash("error", "Sorry, cannot create a Campground, please try later!");
    } else {
      res.redirect('/campgrounds');
    }
  });
});

router.get('/new', middleware.isLoggedIn, function(req, res) {
  res.render('campgrounds/new');
});

router.get('/:id', function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// Edit
router.get("/:id/edit", middleware.isLoggedIn, middleware.isAuthor, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      req.flash("error", "Sorry, the page is not found");
    } else {
      res.render('campgrounds/edit', {campground: foundCampground});
    }
  });
});

// Update
router.put("/:id", function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if(err) {
      req.flash("error", "Sorry, the page is not found");
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground was created");
      res.redirect("/campgrounds/" + updatedCampground._id);
    }
  });
});

// Destroy
router.delete("/:id", middleware.isAuthor, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect("/campgrounds");
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});


module.exports = router;