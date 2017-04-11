var express    = require("express"),
    flash      = require("connect-flash"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    //Campground = require("./models/campground"),
    //Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds"),
    passport   = require("passport"),
    methodOverride = require("method-override"),
    localStrategy = require("passport-local");
    
    
// Routes    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    indexRoutes      = require("./routes/index.js");
    
var app = express();

mongoose.connect("mongodb://yelp_camp:33278727@ds159180.mlab.com:59180/yelp_camp");

app.set('view engine', 'ejs');
app.use(require("express-session")({
  secret: "Secret 64564564654",
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  app.locals.moment = require('moment');
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//seedDB();

app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Server is running, crtl + C to exit...');
});