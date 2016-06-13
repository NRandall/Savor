var Restaurant = require('./models');
var _ = require('underscore');
var express = require('express');
var Yelp = require('yelp');
var config = require(__dirname + '/../config.js');

module.exports = {
  //function not being used...
  fetchAllById: function(clientID, callback) {
    Restaurant.findById(clientID).then(function(err, restaurant) {
      if (err) {
        console.log(err);
      } else {
        callback(restaurant);
      }
    });
  },

  fetchAll: function(callback) {
    Restaurant.find(function(err,restaurants) {
      if(err) {
        console.error(err);
      } else {
        callback(restaurants);
      }
    });
  },
  //function not being used...
  fetchOne: function(id, callback) {
    Restaurant.findById(id).then(function(restaurant){
        callback(restaurant);
      }
    )
    .catch(function(err){
      console.log(err);
    });
  },

  addRestaurantReview: function(restaurant, callback) {
    var newRestaurant = new Restaurant(restaurant);
    newRestaurant.save(function(err, newEntry) {
      if (err) {
        console.log(err);
      } else {
        callback(newEntry);
      }
    });
  },
  //function not being used...
  updateOne: function(id, newProperties, callback) {
    Restaurant.findByIdAndUpdate(id, newProperties)
      .then(function () {
        callback("Restaurant Updated");
      })
      .catch(function (err) {
      console.log(err);
      res.status(404).send('DatabaseError');
    });
  },
  //function not being used...
  deleteOne: function(id, callback) {
    fetchOne(id, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        user.remove(function(err, removed) {
          if (err) {
            console.log('There was an error deleting the entry');
          } else {
            callback(removed);
          }
        });
      }
    });
  },
  queryRestaurant: function(data, callback) {
    var yelpConfig = config.api.yelp;
    var yelp = new Yelp({
        consumer_key: yelpConfig.consumer_key,
        consumer_secret: yelpConfig.consumer_secret,
        token: yelpConfig.token,
        token_secret: yelpConfig.token_secret,
    });
    yelp.search({ term: data.name, location: data.address, limit: 5 })
      .then(function(data) {
        var results = data.businesses;
        callback(results);
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};
