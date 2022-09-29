const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());   
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes
require("./routes/api_route")(app);
require("./routes/html_route")(app);


app.listen(PORT, () => {
  console.log(`server now on Port ${PORT}`);
})