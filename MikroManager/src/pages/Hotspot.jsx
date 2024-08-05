import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';

export function UserList() {
	const [data, setData] = useState([]);
	const [editData, setEditData] = useState(null);

	const fetchData = async () => {
		const host = localStorage.getItem('host');
		const user = localStorage.getItem('username');
		const pass = localStorage.getItem('password');

		if (!host || !user || !pass) {
			console.error('Missing credentials in local storage');
			return;
		}

		const body = {
			host: host,
			user: user,
			password: pass
		};

		try {
			const response = await axios.post("http://localhost:5000/user/list", body);
			console.log("data:", response.data);

			const formattedData = response.data.data.map(item => ({
				id: item[".id"],
				name: item.name,
				password: item.password,
				profile: item.profile || 'N/A'
			}));

			setData(formattedData);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			console.log('Request Completed');
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = async (id) => {
		const host = localStorage.getItem('host');
		const user = localStorage.getItem('username');
		const pass = localStorage.getItem('password');

		if (!host || !user || !pass) {
			console.error('Missing credentials in local storage');
			return;
		}

		try {
			await axios.post("http://localhost:5000/user/delete", { host, user, password: pass, userId: id });
			setData(data.filter(item => item.id !== id));
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleEdit = (user) => {
		setEditData(user); // Set the user to be edited
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		const { id, name, password, profile } = editData;

		const host = localStorage.getItem('host');
		const user = localStorage.getItem('username');
		const pass = localStorage.getItem('password');

		const body = {
			host: host,
			user: user,
			password: pass,
			userId: id,
			name: name,
			userPassword: password,
			profile: profile
		};

		try {
			await axios.post("http://localhost:5000/user/update", body);
			fetchData();
			setEditData(null); // Clear the edit state
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const columns = [
		{
			name: 'ID',
			selector: row => row.id,
			sortable: true,
		},
		{
			name: 'Name',
			selector: row => row.name,
			sortable: true,
		},
		{
			name: 'Password',
			selector: row => row.password,
			sortable: true,
		},
		{
			name: 'Profile',
			selector: row => row.profile,
			sortable: true,
		},
		{
			name: 'Actions',
			cell: row => (
				<>
					<button onClick={() => handleEdit(row)} className="mr-2">Update</button> |
					<button onClick={() => handleDelete(row.id)} className="text-red-600">Delete</button>
				</>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		}
	];

	return (
		<div className="w-full p-10">
			<h1 className="pl-2 bg-customBlue p-2 rounded-md text-white font-bold">User List</h1>
			<DataTable
				columns={columns}
				data={data}
				className="border mt-2 rounded-md"
			/>
			{editData && (
				<div className="w-2/4 p-10">
					<form className="flex flex-col border m-2 p-2" onSubmit={handleUpdate}>
						<h1 className="font-semibold bg-customBlue text-white text-center p-2">Update User</h1>
						<div className="w-1/2">
							<div className="flex m-2 p-2">
								<h2 className="p-1">Name</h2>
								<input
									className="border bg-transparent rounded-md"
									type="text"
									value={editData.name}
									onChange={(e) => setEditData({ ...editData, name: e.target.value })}
								/>
							</div>
							<div className="flex m-2 p-2">
								<h2 className="p-1">Password</h2>
								<input
									className="border bg-transparent rounded-md"
									type="text"
									value={editData.password}
									onChange={(e) => setEditData({ ...editData, password: e.target.value })}
								/>
							</div>
							<div className="flex m-2 px-2">
								<h2 className="p-1">Profile</h2>
								<input
									className="border bg-transparent rounded-md"
									type="text"
									value={editData.profile}
									onChange={(e) => setEditData({ ...editData, profile: e.target.value })}
								/>
							</div>
						</div>
						<button
							className="flex border w-36 mx-10 p-1 mt-2 justify-center rounded-md bg-customBlue text-white self-center"
							type="submit"
						>
							Update
						</button>
					</form>
				</div>
			)}
		</div>
	);
}


export function AddUser() {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [profile, setProfile] = useState('');

	const [profiles, setProfiles] = useState([]);

	// Fetch profiles from the server
	useEffect(() => {
		const fetchProfiles = async () => {
			const body = {
				host: "192.168.90.1",
				user: "admin",
				password: "admin",
			};

			try {
				const response = await axios.post("http://localhost:5000/profile/list", body);
				if (response.status === 200) {
					// Extract and set profile names
					const profileNames = response.data.data.map(profile => profile.name);
					setProfiles(profileNames);
				} else {
					console.error('Failed to fetch profiles');
				}
			} catch (error) {
				console.error('Error fetching profiles:', error);
			}
		};

		fetchProfiles();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();


		const host = localStorage.getItem('host'); // Assuming these are strings
		const user = localStorage.getItem('username');
		const pass = localStorage.getItem('password');

		if (!host || !user || !pass) {
			console.error('Missing credentials in local storage');
			return;
		}

		const body = {
			host: host,
			user: user,
			adminPassword: pass,
			name: name,
			profile: profile,
			password: password,  // Include password in the request body
		};


		try {
			const response = await axios.post("http://localhost:5000/user/add", body);
			console.log("Response:", response.data);
			if (response.status === 200) {
				alert('User added successfully');
				setName('');
				setProfile('');

				setPassword('');  // Clear password field after successful submission
			} else {
				alert('Failed to add user');
			}
		} catch (error) {
			console.error('Error adding user:', error);
			alert('An error occurred while adding the user');
		}
	};

	return (
		<div className="w-1/2 p-10 mx-auto">
			<form className="flex flex-col border m-2 p-2 " onSubmit={handleSubmit}>
				<h1 className="font-semibold bg-customBlue text-white text-center p-2">Add User</h1>
				<div className="w-full">
					<div className="flex m-2 p-2">
						<h2 className="p-1">Name</h2>
						<input
							className="border bg-transparent rounded-md"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex m-2 p-2">
						<h2 className="p-1">Password</h2>
						<input
							className="border bg-transparent rounded-md"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex m-2 px-2 w-full">
						<h2 className="p-1">Profile</h2>
						<select
							className="border bg-transparent rounded-md "
							value={profile}
							onChange={(e) => setProfile(e.target.value)}
						>
							<option value="" disabled>Select a profile</option>
							{profiles.map((profileName, index) => (
								<option key={index} value={profileName}>{profileName}</option>
							))}
						</select>
					</div>

				</div>
				<button
					className="flex border w-36 mx-10 p-1 mt-2 justify-center rounded-md bg-customBlue text-white self-center"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	);
}