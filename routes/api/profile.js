const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile/me
// @desc Get current user's profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    return res.json(profile);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route POST api/profile
// @desc Create or update user profile
// @access Private

router.post(
  "/",
  [auth, [check("status", "Status is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { location, status, bio, imageUrl } = req.body;

    const profileField = {
      user: req.user.id,
      location: location,
      status: status,
      bio: bio,
      imageUrl: imageUrl,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        );
        return res.json(profile);
      }

      //Insert
      profile = new Profile(profileField);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route GET api/profile
// @desc Get all profiles
// @access private

router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    const currentUserId = req.user.id;
    const newProfiles = profiles.filter(
      (profile) => profile.user.id != currentUserId
    );
    res.json(newProfiles);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/profile
// @desc Delete profile and user
// @access private

router.delete("/", auth, async (req, res) => {
  try {
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "Account deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route POST api/profile/id
// @desc Get profile by id
// @access private

router.post("/id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.body.id,
    }).populate("user", ["name"]);
    res.json(profile);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
