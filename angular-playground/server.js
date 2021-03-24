const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/angular-playground')));

app.get('/api/hello', (req, res) => {
  res.json({message: 'Hello!'});
});

app.listen(PORT, () => console.log(`app (serving angular component) listening of port ${PORT}`));
