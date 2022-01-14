export {};
const mongoose = require("mongoose");

// address:{"building":"1007","coord":[-73.856077,40.848447],"street":"Morris Park Ave","zipcode":"10462"},"borough":"Bronx","cuisine":"Bakery","grades":[{"date":{"$date":"2014-03-03T00:00:00.000Z"},"grade":"A","score":2},{"date":{"$date":"2013-09-11T00:00:00.000Z"},"grade":"A","score":6},{"date":{"$date":"2013-01-24T00:00:00.000Z"},"grade":"A","score":10},{"date":{"$date":"2011-11-23T00:00:00.000Z"},"grade":"A","score":9},{"date":{"$date":"2011-03-10T00:00:00.000Z"},"grade":"B","score":14}],"name":"Morris Park Bake Shop","restaurant_id":"30075445"}
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a restaurant should have a name"],
  },
  borough: {
    type: String,
    required: [true, "a restaurant should have a borough"],
  },
  cuisine: {
    type: String,
    required: [true, "a restaurant should have a cuisine"],
  },
  address: {
    building: String,
    coord: [Number],
    street: String,
    zipcode: String,
  },
  grades: [
    {
      date: {
        $date: Date,
      },
      grade: String,
      score: Number,
    },
  ],
  restaurant_id: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
