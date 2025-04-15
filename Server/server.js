const express = require('express');
const cors = require('cors');
const rosRest = require('ros-rest');
require('dotenv').config();

const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

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
      .then((response) => {
         if (response.data) {
            res.send({ token: '5080e0c520f2c7b8e0b3679915d53155' })
            // console.log('success');
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
      .then((response) => {
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
      .then((response) => {
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

app.post("/profile/delete", (req, res) => {
   const { host, user, password, profileId } = req.body;
   const clientRosRest = rosRest({
      host: host,
      user: user,
      password: password,
      port: 443,
      secure: false,
   });

   clientRosRest
      .remove(`/ip/hotspot/user/profile/${profileId}`)
      .then(() => {
         res.status(200).json({ message: 'Profile deleted successfully' });
      })
      .catch((err) => {
         console.log('error:', err);
         res.status(500).json({ error: err.message });
      });
});

app.post("/profile/update", (req, res) => {
   const { host, user, password, profileId, name, rateLimit } = req.body;
   const clientRosRest = rosRest({
      host: host,
      user: user,
      password: password,
      port: 443,
      secure: false,
   });

   const updateData = {};
   if (name) updateData.name = name;
   if (rateLimit) updateData["rate-limit"] = rateLimit;

   clientRosRest
      .set(`/ip/hotspot/user/profile/${profileId}`, updateData)
      .then((response) => {
         if (response.data) {
            res.status(200).json({ message: 'Profile updated successfully', data: response.data })
         } else {
            res.status(401).json({ message: 'Authentication Failed' })
         }
      })
      .catch((err) => {
         console.log('error:', err);
         res.status(500).json({ error: err.message });
      });
});



//  -------------------------EMD OF PROFILE-------------------------------



// ----------------------------USER------------------------------------

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
      .then((response) => {
         if (response.data) {
            // Count the users
            const userCount = response.data.length;
            res.status(200).json({ count: userCount, data: response.data });
         } else {
            res.status(401).json({ message: 'Authentication Failed' });
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

app.post("/user/delete", (req, res) => {
   const { host, user, password, userId } = req.body;
   const clientRosRest = rosRest({
       host: host,
       user: user,
       password: password,
       port: 443,
       secure: false,
   });

   console.log('UserId:', userId);
   clientRosRest
       .remove(`/ip/hotspot/user/${userId}`)
       .then(() => {
           res.status(200).json({ message: 'User deleted successfully' });
       })
       .catch((err) => {
           console.log('error:', err);
           res.status(500).json({ error: err.message });
       });
});

app.post("/user/update", (req, res) => {
	const { host, user, password, userId, name, userPassword, profile } = req.body;
	const clientRosRest = rosRest({
		host: host,
		user: user,
		password: password,
		port: 443,
		secure: false,
	});

	const updateData = {};
	if (name) updateData.name = name;
	if (userPassword) updateData.password = userPassword;
	if (profile) updateData.profile = profile;

	clientRosRest
		.set(`/ip/hotspot/user/${userId}`, updateData)
		.then((response) => {
			if (response.data) {
				res.status(200).json({ message: 'User updated successfully', data: response.data });
			} else {
				res.status(401).json({ message: 'Authentication Failed' });
			}
		})
		.catch((err) => {
			console.log('error:', err);
			res.status(500).json({ error: err.message });
		});
});

//  -------------------------EMD OF USER LIST-------------------------------


app.post('/active', (req, res) => {
   const { host, user, password } = req.body;
   const clientRosRest = rosRest({
     host: host,
     user: user,
     password: password,
     port: 443,
     secure: false,
   });
 
   clientRosRest
     .print('ip/hotspot/active')
     .then((response) => {
       if (response.data) {
         res.status(200).json({ message: 'Success', data: response.data });
       } else {
         res.status(401).json({ message: 'Failed to fetch active users' });
       }
     })
     .catch((err) => {
       console.log('error:', err);
       res.status(500).json({ error: err.message });
     });
 });
 

// --WHITELIST--

app.post('/whitelist/add', (req, res) => {
   const { host, user, password, website } = req.body;

   // Check if all required fields are present
   if (!host || !user || !password || !website) {
      return res.status(400).json({ message: 'Host, user, password, and website are required' });
   }

   const clientRosRest = rosRest({
      host: host,
      user: user,
      password: password,
      port: 443, // default 443
      secure: false, // default false
   });

   // Add the website to the address list 'Allowed Websites'
   clientRosRest
      .add('ip/firewall/address-list', {
         address: website,
         list: 'allowed-websites',
      })
      .then((response) => {
         if (response.data) {
            res.status(200).json({ message: 'Whitelist entry added successfully', data: response.data });
         } else {
            res.status(401).json({ message: 'Failed to add whitelist entry' });
         }
      })
      .catch((err) => {
         console.error('Error:', err);
         res.status(500).json({ error: err.message });
      });
});


app.post('/whitelist/list', (req, res) => {
   const { host, user, password } = req.body;

   // Check if all required fields are present
   if (!host || !user || !password) {
      return res.status(400).json({ message: 'Host, user, and password are required' });
   }

   const clientRosRest = rosRest({
      host: host,
      user: user,
      password: password,
      port: 443, // default 443
      secure: false, // default false
   });

   clientRosRest
      .print('ip/firewall/address-list')
      .then((response) => {
         if (response.data) {
            // Log the response data for debugging
            // console.log('Address Lists:', response.data);

            // Filter out the whitelist entries based on naming convention
            const whitelistedWebsites = response.data;

            // Return the filtered whitelist entries
            res.status(200).json({ message: 'Whitelist retrieved successfully', data: whitelistedWebsites });
         } else {
            res.status(404).json({ message: 'No whitelist entries found' });
         }
      })
      .catch((err) => {
         console.error('Error fetching whitelist:', err);
         res.status(500).json({ error: 'Internal server error' });
      });
});
//delete
app.post("/whitelist/delete", (req, res) => {
   const { host, user, password, address } = req.body; // Use 'address' instead of 'userId'
   const clientRosRest = rosRest({
       host: host,
       user: user,
       password: password,
       port: 443,
       secure: false,
   });

   console.log('Address:', address);

   // Find and remove the website from the address list 'allowed-websites'
   clientRosRest
       .print('ip/firewall/address-list')
       .then((response) => {
           const addresses = response.data;
           const addressToDelete = addresses.find(entry => entry.address === address);

           if (!addressToDelete) {
               return res.status(404).json({ message: 'Address not found in the whitelist' });
           }

           return clientRosRest.remove(`ip/firewall/address-list/${addressToDelete['.id']}`);
       })
       .then(() => {
           res.status(200).json({ message: 'Whitelist entry deleted successfully' });
       })
       .catch((err) => {
           console.log('Error:', err);
           res.status(500).json({ error: err.message });
       });
});

//profile usage



app.listen(5000, () => {
   console.log("Server started on port 5000");
});
