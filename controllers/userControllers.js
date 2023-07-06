const { User } = require('../models');
const bcrypt = require('bcrypt');

// Function to hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Function to validate password
const isValidPassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

const signup = async (req, res) => {
  try {
    console.log(req.body);

    if (!req.body.password || req.body.password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters' });
    }

    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};


const login = async (req, res) => {
  try {
    console.log('Request body:', req.body); 

    const userData = await User.findOne({ where: { username: req.body.username } });

    console.log('User data:', userData); 

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect credentials, please try again' });
      return;
    }

    const validPassword = await isValidPassword(
      req.body.password,
      userData.password
    );

    console.log('Valid password:', validPassword); 

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).end();
    });
  } catch (err) {
    console.log('Error:', err); 
    res.status(500).json(err);
  }
};

const logout = (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
};

module.exports = {
  signup,
  login,
  logout,
};
