const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const path = require('path'); //for prod
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connecion settings
// mysql://b79cc199be31c1:c0eb7e4f@us-cdbr-iron-east-02.cleardb.net/heroku_7a140c76f566951?reconnect=true
var con = mysql.createConnection({
  host: 'us-cdbr-iron-east-02.cleardb.net',
  user: 'b79cc199be31c1',
  password: 'c0eb7e4f',
  database: 'heroku_7a140c76f566951'
});

app.get('/api/trailers', (req, res)=>{
  const query = "CALL GET_TRAILER_VIEW";
  con.query(query, (err, response)=>{
    if(err){
      res.send(err);
    }else{
      return res.json({ data : response[0] })
    }
  });
});


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// start of prod code ------------------------------------------------------------------------- 
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
// end of prod code -------------------------------------------------------------------------


app.listen(port, () => console.log(`Listening on port ${port}`));