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
   console.log('login');
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
            // res.status(200).json({ message: 'Authentication successful' })
            res.send({
               token: '5080e0c520f2c7b8e0b3679915d53155'
            })
         } else {
            res.status(401).json({ message: 'Authentication Failed' })
         }
      })
      .catch((err) => {
         console.log('error:', err);
         res.status(500).json({ error: err.message });
      });
});

// --PROFILE--
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


// --USER--

app.post("/user/list", (req, res) => {
   const { host, user, password } = req.body;
   const clientRosRest = rosRest({
      host: host,
      user: user,
      password: password,
      port: 443, // default 443
      secure: false, // default false
   });

   clientRosRest
      .print('ip/hotspot/user')
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


app.post('/user/add', (req, res) => {
	const { host, user, adminPassword, name, profile, uptime, password: userPassword } = req.body;
	const clientRosRest = rosRest({
		host: host,
		user: user,
		password: adminPassword,
		port: 443, // default 443
		secure: false, // default false
	});

	clientRosRest
		.add('ip/hotspot/user', {
			name: name,
			profile: profile,
			// uptime: uptime,
			password: userPassword, // Include user password
		})
		.then((response) => {
			if (response.data) {
				res.status(200).json({ message: 'User added successfully', data: response.data });
			} else {
				res.status(401).json({ message: 'Failed to add user' });
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