const express = require("express");
const routers = express.Router();

// @route GET api/posts
// @desc Test route
// @access Public
const AL = require("../../models/sch.js");
routers.get("/", async (req, res) => {
  const all = await AL.find();
  res.json(all);
});

routers.delete("/:id", async (req, res) => {
  const all = await AL.findById(req.params.id);
  all.delete();
  res.json(all);
});

routers.post("/", async (req, res) => {
  const all = new AL({
    PostUser: req.body.postuser,
    Imageurl: req.body.imagepost,
    description: req.body.descriptions,
    postdate: req.body.postdate,
  });

  const a1 = await all.save();
  res.json(a1);
});

module.exports = routers;
