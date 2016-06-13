var restaurantController = require('./../db/controllers');

module.exports = {

    //function not being used
    getRestaurantsByUser: function(req, res) {
        var id = req.params.id;
        restaurantController.fetchAllById(id, function(restaurant) {
            res.status(200).json(restaurant);
        });
    },

    getRestaurants: function(req, res) {
        restaurantController.fetchAll(function(restaurants) {
            res.status(200).json(restaurants);
        });
    },
    //function not being used
    getOneRestaurant: function(req, res) {
        var id = req.params.id;
        restaurantController.fetchOne(id, function(restaurant) {
            res.status(200).json(restaurant);
        });
    },

    addRestaurant: function(req, res) {
        console.log("req.body: ", req.body);
        var restaurant = req.body;
        restaurantController.addRestaurantReview(restaurant, function(newRestaurant) {
            res.status(201).json(newRestaurant);
        });
    },
    //function not being used
    updateRestaurantInfo: function(req, res) {
        var id = req.params.id;
        var newProperties = req.body;
        restaurantController.updateOne(id, newProperties, function(updatedRestaurant) {
            res.status(200).json(updatedRestaurant);
        });
    },
    //function not being used
    deleteRestaurant: function(req, res) {
        var id = req.params.id;
        restaurantController.deleteOne(id, function(deleted) {
            res.status(200).json(deleted);
        });
    },
    queryRestaurant: function(req, res) {
      var data = req.body;
      restaurantController.queryRestaurant(data, function(list) {
        res.status(200).json(list);
      });
    }
};
