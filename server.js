const express = require ('express');
const app = express ();
const port = process.env.PORT || 3001;
const path = require('path')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


const exphbs = require('express-handlebars');


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
    res.render('home');
  });
  

app.listen(port,()=>{
    console.log('Server is listening on' , port);
})