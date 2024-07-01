const express = require('express');
const cors = require('cors');
const rosRest = require('ros-rest');
require('dotenv').config();


const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
// const clientRosRest = rosRest({
//    host: "",
//    user: "",
//    password: "",
//    port: 443, // default 443
//    secure: false, // default false
// });


// clientRosRest
//    .print('system/resource')
//    .then((res) => {
//       console.log('result:', res.data);
//    })
//    .catch((err) => {
//       console.log('error:', err);
//    });

// app.get("/login", (req, res) => {
//    clientRosRest
//    .print('system/resource')
//    .then((res) => {
//       console.log('result:', res.data);
//    })
//    .catch((err) => {
//       console.log('error:', err);
//    });
// })
app.post("/login", (req, res) => {
   const { host, user, password } = req.body;
   const clientRosRest = rosRest({
      host: host,
      user: user,
      password: password,
      port: 443, // default 443
      secure: false, // default false
   });

   clientRosRest
      .print('system/resource')
      .then((response) => {  // Renamed to avoid confusion
         if (response.data) {
            res.status(200).json({ message: 'Authentication successful' })

         } else {
            res.status(401).json({ message: 'Authentication Failed' })
         }
      })
      .catch((err) => {
         console.log('error:', err);
         res.status(500).json({ error: err.message });
      });
});


app.post("/profile/list", (req, res) => {
   const { host, user, password } = req.body;
   const clientRosRest = rosRest({
      host: host,
      user: user,
      password: password,
      port: 443, // default 443
      secure: false, // default false
   });

   clientRosRest
      .print('ip/hotspot/user/profile')
      .then((response) => {  // Renamed to avoid confusion
         if (response.data) {
            res.status(200).json({ message: 'Authentication successful', data: response.data })

         } else {
            res.status(401).json({ message: 'Authentication Failed' })
         }
      })
      .catch((err) => {
         console.log('error:', err);
         res.status(500).json({ error: err.message });
      });
});


app.post("/profile/add", (req, res) => {
   const { host, user, password, name, rateLimit } = req.body;
   const clientRosRest = rosRest({
      host: host,
      user: user,
      password: password,
      port: 443, // default 443
      secure: false, // default false
   });

   clientRosRest
      .add('ip/hotspot/user/profile', {
         name: name,
         'rate-limit': rateLimit
      })
      .then((response) => {  // Renamed to avoid confusion
         if (response.data) {
            res.status(200).json({ message: 'Authentication successful', data: response.data })

         } else {
            res.status(401).json({ message: 'Authentication Failed' })
         }
      })
      .catch((err) => {
         console.log('error:', err);
         res.status(500).json({ error: err.message });
      });
});

app.listen(5000, () => {
   console.log("Server started on port 5000")
})