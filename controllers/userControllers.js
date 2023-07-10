const { User } = require('../models');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters' });
    }

    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({ username, password: hashedPassword });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userData = await User.findOne({ where: { username } });

    if (!userData) {
      return res
        .status(400)
        .json({ message: 'Incorrect credentials, please try again' });
    }

    const validPassword = await bcrypt.compare(password, userData.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ message: 'Logged in successfully' });
    });
  } catch (err) {
    console.log(err);
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
