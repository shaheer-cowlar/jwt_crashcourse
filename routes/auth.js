const router = require("express").Router();
const { users } = require("../db")
const { check,validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = require("../user")

//get all users
router.get('/getall',(req,res)=>{
    res.send(users)
})

//login
router.post('/login', async (req, res) => {
  const { password, email } = req.body;

  // Find the user in MongoDB based on the email
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid Credentials"
          }
        ]
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid Credentials"
          }
        ]
      });
    }

    // If the password is correct, generate a JWT token
    const token = await JWT.sign(
      {
        email
      },
      "your-secret-key", // Replace this with your own secret key for JWT
      {
        expiresIn: "1h" // You can set the expiration time as needed
      }
    );

    res.json({
      token
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({
      errors: [
        {
          msg: "Server Error"
        }
      ]
    });
  }
});


router.post('/signup',
[
  check("email","Please provide a valid email").isEmail(),
  check("password","Please provide a password with a minimum of 6 characters").isLength({
    min: 6
  })
],
async (req, res) => {
  const { password, email, name } = req.body;

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


      const user=await User.create({
          name:name,
          age:26,
          email:email,
          password:hashedPassword,
          
      })
      
      await user.save()
  


  users.push({
    email,
    password:hashedPassword
  })

  const token = await JWT.sign({
     email
  },
  "fghjghjhgjhgjgjgjgjgjgjg",
  {
    expiresIn:9999999999
  }
  ) 

  res.json({
    token
  });
  console.log(hashedPassword);
  
});

module.exports = router;
