const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

app.use(express.static('dist'));

app.listen(port, () => console.log(`app is started on port ${port}`));
