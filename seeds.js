var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Mountana Hill",
    image: "http://haileyidaho.com/wp-content/uploads/2015/01/Stanley-lake-camping-Credit-Carol-Waller-2011.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur leo gravida, lacinia lacus sed, varius urna. Donec ac magna in erat feugiat luctus. Quisque lorem elit, pretium ultrices malesuada at, pulvinar posuere urna. Aliquam et eleifend mauris. In vitae suscipit lectus. Phasellus a erat porta, egestas massa vel, pulvinar dui. Aenean quis blandit ex. Donec eget mattis justo. Proin interdum imperdiet lacus. Morbi facilisis in augue nec euismod. Curabitur vestibulum urna orci, quis pellentesque neque tincidunt pharetra. Etiam efficitur aliquam neque. Aliquam neque magna, tincidunt eget porttitor in, mollis ut risus. Cras eu enim euismod, rhoncus ligula imperdiet, fringilla odio. Cras rhoncus venenatis lacus sed fermentum. Donec eget nulla pellentesque, sodales est ut, posuere tellus."
  },
  {
    name: "Beverly Hills",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSV6pKqKMttmz17JFeZTheLoC6l2s745Ek1pQrCWOgEnOukL45Z",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur leo gravida, lacinia lacus sed, varius urna. Donec ac magna in erat feugiat luctus. Quisque lorem elit, pretium ultrices malesuada at, pulvinar posuere urna. Aliquam et eleifend mauris. In vitae suscipit lectus. Phasellus a erat porta, egestas massa vel, pulvinar dui. Aenean quis blandit ex. Donec eget mattis justo. Proin interdum imperdiet lacus. Morbi facilisis in augue nec euismod. Curabitur vestibulum urna orci, quis pellentesque neque tincidunt pharetra. Etiam efficitur aliquam neque. Aliquam neque magna, tincidunt eget porttitor in, mollis ut risus. Cras eu enim euismod, rhoncus ligula imperdiet, fringilla odio. Cras rhoncus venenatis lacus sed fermentum. Donec eget nulla pellentesque, sodales est ut, posuere tellus."
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Everything was removed");
      data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
          if(err) {
            console.log(err);
          } else {
            console.log("Create a campground");
            Comment.create(
              {
                text: "Best place",
                author: "Homer"
              }, function(err, comment) {
                if(err) {
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("Create comment");
                }
              });
          }
        });
      });
    }
  });
}

module.exports = seedDB;