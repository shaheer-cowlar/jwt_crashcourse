const router = require("express").Router();
const { users } = require("../db")
const { check,validationResult } = require("express-validator")
const bcrypt = require("bcrypt")

//get all users
router.get('/getall',(req,res)=>{
    res.send(users)
})

router.post('/signup',
[
  check("email","Please provide a valid email").isEmail(),
  check("password","Please provide a password with a minimum of 6 characters").isLength({
    min: 6
  })
],
async (req, res) => {
  const { password, email } = req.body;

  const errors = validationResult(req);
   
  //validating user s email and password are according to standards
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  //validating user dose not already exist
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
  
  //hashing the password
  let hashedPassword = await bcrypt.hash(password,10)
  console.log(password, email);
  //storing into db
  users.push({
    email,
    password:hashedPassword
  })
  res.send("Validation passed");
  console.log(hashedPassword);
  
});

module.exports = router;
