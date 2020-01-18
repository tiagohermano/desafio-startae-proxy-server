require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


var Twit = require('twit');

var T = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', async (req, res) => {
  res.send('Desafio Frontend Startae Proxy Server for Twitter API requests.');
});

app.use('/tweets', async (req, res) => {
  const { username, tweetsAmount } = req.query;
  T.get('statuses/user_timeline', { screen_name: username, count: tweetsAmount, trim_user: true, exclude_replies: true }, function(err, data, response) {
    if(err) res.send(err);
    res.send(data);
  });
})

app.listen(process.env.PORT || 7777, () => console.log('SERVER RUNNING ON localhost:7777'));