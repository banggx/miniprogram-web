const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3200;

app.use(cors());
app.use('/ui_sdk', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});