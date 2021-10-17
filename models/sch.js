const mongoose = require("mongoose");

const postdata = new mongoose.Schema({
  PostUser: {
    type: String,
    required: true,
  },
  Imageurl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postdate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("post_data", postdata);
