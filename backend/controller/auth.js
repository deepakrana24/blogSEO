const user = require("../models/user");
const shortId = require("shortid");

exports.signup = (req, res) => {
  // const { Name, email, password } = req.body;
  // res.json({
  //   user: { Name, email, password },
  // });
  user.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    const { Name, email, password } = req.body;
    let username = shortId.generate();
    res.json({
      user: { username },
    });
  });
};
