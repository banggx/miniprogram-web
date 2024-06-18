const express = require('express');
const path = require('path');
const app = express();
const port = 3600;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/lib', express.static(path.join(__dirname, 'lib')));
app.use('/components', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});