const express = require("express");
const app = express();
app.use(express.static("distribution"));

app.listen(80);
