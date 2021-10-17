const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

/* @route   POST api/changepassword
 * @desc    Update user password
 * @access  Public
 */
router.post("/", auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    let user = await User.findById(userId);

    //Authenticating user
    const isMatch = await bcrypt.compare(oldPassword,user.password);
    if(!isMatch)
    {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Password!!!"}] });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    let hash_password = await bcrypt.hash(newPassword, salt);

    //updating database
    user = await User.updateOne({email: user.email},{password: hash_password});
    res.json({ msg: "Password Updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;