const express = require('express');
const cors = require('cors');
const rosRest = require('ros-rest');
require('dotenv').config();
const app = express();
app.use(cors());


const clientRosRest = rosRest({
   host: process.env.REACT_APP_BASE_URL,
   user: process.env.REACT_APP_USERNAME,
   password: process.env.REACT_APP_PASSWORD,
   port: 443, // default 443
   secure: false, // default false
});

// clientRosRest
//    .print('system/resource')
//    .then((res) => {
//       console.log('result:', res.data);
//    })
//    .catch((err) => {
//       console.log('error:', err);
//    });

app.get("/login", (req, res) => {
   clientRosRest
   .print('system/resource')
   .then((res) => {
      console.log('result:', res.data);
   })
   .catch((err) => {
      console.log('error:', err);
   });
})


app.listen(5000, () => {
   console.log("Server started on port 5000")
})