const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, console.log("Server running on port " + PORT))

//Get random quote route
app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes)
    res.json({quote: randomQuote})
})

//GET all quotes or with params for a single person
app.get('/api/quotes', (req, res, next) => {
    if (!req.query.hasOwnProperty('person')) {
      res.send({quotes: quotes});
    } else {
      const filterQuote = quotes.filter(element => element.person === req.query.person);
      if(filterQuote.length === 0){
          res.send({quotes: quotes})
      } else {
          res.send({quotes: filterQuote});
      }
    }
  });

  //POST method to create a new quote
  app.post('/api/quotes', (req, res) => {
      const newQuote = req.query
      if(newQuote.hasOwnProperty('person') && newQuote.hasOwnProperty('quote')){
          quotes.push(newQuote)
          res.json({quote : newQuote})
      } else {
          res.status(400).send()
      }
  })