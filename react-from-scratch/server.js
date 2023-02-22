const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors({credentials: true}));

app.use(express.static('dist'));
app.use(express.json());

app.get('/hello', (req, res) => {
  setTimeout(() => {
    console.log('[server] /hello');
    res.json({message: 'hello friend'});
  }, 1000);
});

/*
req.body - {name:string}
 */
app.post('/greet', (req, res) => {
  res.json({greet: `Hello ${req.body.name}`});
});

app.get('/greet', (req, res) => {
  console.log('[server] /greet');
  res.json({greet: 'hello'});
})

app.get('/bye', (req, res) => {
  console.log('[server] /bye');
  res.json({message: 'bye friend'});
})

app.use((req, res, next) => {
  res.status(404).json({message: 'Not found'});
})
app.listen(port, () => console.log(`app is started on port ${port}`));
