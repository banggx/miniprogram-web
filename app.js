const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3077;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/native', express.static(path.join(__dirname, 'public')));
app.use('/mini_resource', express.static(path.join(__dirname, 'apps')))
app.use('/page_frame', express.static(path.join(__dirname, 'pageframe')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
