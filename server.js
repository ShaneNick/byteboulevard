require('dotenv').config(); 

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const apiRoutes = require('./routes/api');  // Adjusted this line
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const homeRoutes = require('./routes/api/homeRoutes');
const app = express();
const PORT = process.env.PORT || 3003;

// Set up sessions with secret from environment variables
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));  
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);
app.use(homeRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
