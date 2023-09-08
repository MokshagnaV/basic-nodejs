const express = require("express");

const app = express();

const PORT = 8080;

app.use(express.static(__dirname));

app.get("*", (req, res) => {
  res.redirect("/404.html");
});

app.listen(PORT, () =>
  console.log(`Server is running and listening on ${PORT}`)
);
