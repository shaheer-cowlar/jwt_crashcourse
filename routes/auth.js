const router = require("express").Router();
const { users } = require("../db")
const { check,validationResult } = require("express-validator")
router.post('/signup',
[
  check("email","Please provide a valid email").isEmail(),
  check("password","Please provide a password with a minimum of 6 characters").isLength({
    min: 6
  })
],
(req, res) => {
  const { password, email } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const userExists = users.find((user) => {
    return user.email === email;
  });

  if (userExists) {
    return res.status(400).json({
      "errors": [
        {
          "msg": "This user already exists"
        }
      ]
    });
  }

  console.log(password, email);
  res.send("Validation passed");
});

module.exports = router;
