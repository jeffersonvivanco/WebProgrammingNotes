const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const sampleJson = require('./sample_json.json');

const myLogger = (req, res, next) => {
  console.log(`[server] ${req.method} - ${req.url}`);
  next();
}

app.use(cors({credentials: true}));
app.use(express.static('dist'));
app.use(express.json());
app.use(myLogger);

app.get('/hello', (req, res) => {
  setTimeout(() => {
    res.json({message: 'hello friend'});
  }, 1000);
});

/*
 Route parameters
 */
app.get('/hello/:name', (req, res) => {
  res.json({message: `Hello ${req.params.name}`});
});

/*
req.body - {name:string}
 */
app.post('/greet', (req, res) => {
  res.json({greet: `Hello ${req.body.name}`});
});

app.get('/greet', (req, res) => {
  res.json({greet: 'hello'});
})

app.get('/bye', (req, res) => {
  res.json({message: 'bye friend'});
})

app.get('/info', (req, res) => {
  res.json(sampleJson);
})

/*
 Handle 404 not found error
 */
app.use((req, res, next) => {
  res.status(404).json({message: 'Not found'});
})
app.listen(port, () => console.log(`app is started on port ${port}`));
