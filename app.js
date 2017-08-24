const express = require("express");
const app = express();
app.use(express.static(__dirname + "/distribution/"));

app.listen(process.env.PORT || 80);
