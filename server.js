
const express = require('express');




const app = express();
// Sets an initial port.
const PORT = process.env.PORT || 3000;

// Sets up the Express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


app.listen(PORT, function() {
  console.log(`Server is listening on PORT: ${PORT}`);
});