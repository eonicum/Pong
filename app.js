const express = require("express");
const app = express();
app.use(express.static(__dirname + "/distribution"));

app.listen(80);
