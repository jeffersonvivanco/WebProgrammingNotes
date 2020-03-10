const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('dist/angular-playground'));

app.listen(PORT, () => console.log(`app listening of port ${PORT}`));
