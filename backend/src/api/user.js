const express = require('express');
const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const User = require('../../models/users');
const router = express.Router();
const cookie = require('cookie');
const passport = require('passport');
const { auth } = require("../../src/middlewares");

// Read All
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    
    res.json(users);

  } catch (error) {
    next(error);
  } 
});

// Read one
router.get('/:id', async (req, res, next) => {
 try {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  
  if (!user) {
    return res.status(400).json({ message: "User not Found!" })
  };
  
  res.json(user);

 } catch (error) {
  //  next(error);
   res.status(400).send({ message: 'Not Found!'});
 }

});

// Create one
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password ) {
      return res.status(400).json({ message: "Missing fields!" });
    }
    // Check password Length
    if (password.length < 8 ) {
      return res.status(400).json({ message: "The password needs to be at least 8 characters long." });
    }

    // Check existing Email
    const emailExist = User.findOne({ email: email })
      .then(user => {
        if (user) {
          res.status(409).json({ message: 'The email has already been used'});
        } else {
          hash(req.body.password, 10, async function(err, hash) {
            // Store hash in your password DB.
            const userData = await new User({
                name: name,
                email: email,
                password: hash
            });
            
            const user = await User.create(userData);
            res.status(200).json(user);

          });
        }
      })
  
  } catch (error) {
    next(error);
    res.status(400).json({ message: 'We only support POST' });
  }

});

// Update one
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    if (!name || !email || !password ) {
      res.status(400).json({ message: "Please fill in all fields! " });
    }

    hash(password, 10, async function(err, hash) {
      const user = {
        name,
        email,
        password: hash
      }

      User.findByIdAndUpdate(id, user, { new: true })
      .then(updatedUser => {
        res.json(updatedUser)
      })
    })
  } catch (error) {
    next(error);
  }
});

// Delete one
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.status(200).json({ message: "Successfully Deleted!"});
  } catch (error) {
    res.status(500).json({ error: error });
  }

});

// Login 
router.post('/login', async (req, res, next) => {
  try {
    const { name, email, password} = req.body;

    // Validate 
    if (!email || !password ) {
      return res.status(400).json({ message: "All fields is required" });
    }

    User.findOne({ email })
      .then(user => {
        // Check user
        if ( !user ) {
          return res.status(400).json({ message: "User not Found!" })
        }

        // Check password || password Match
        compare(password, user.password)
          .then(isMatch => {
            if( isMatch ) {
              // User Match
              const payload =  { id: user.id, name: user.name, email: user.email, avatar: user.avatar };

              //Sign Token
              const Token = sign({ id: user._id}, process.env.SECRET, {expiresIn: '1h'});
              // const jwt =  sign(payload, process.env.SECRET, {expiresIn: '1h'});
              res.setHeader("Set-Cookie", cookie.serialize("Bearer", Token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 3600,
                path: "/"
              }));
              res.json({ 
                Token,
                user: {
                  payload
                }
              });
            } else {
              return res.status(400).json({ message: "Ops, Something went wrong!" });
            }
          })
      })
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'We only support POST' });
  }
});

// Return Current user 
router.get('/current', auth, (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
}); 


module.exports = router;
