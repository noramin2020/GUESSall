import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component"
import axios from 'axios';

export function Whitelist() {
	const [whitelist, setWhitelist] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchWhitelist = async () => {
			const body = {
				host: '192.168.90.1',
				user: 'admin',
				password: 'admin',
			};

			try {
				const response = await axios.post('http://localhost:5000/whitelist/list', body);
				console.log('Whitelist Data:', response.data);

				// Format the data to include only the fields you want
				const formattedData = response.data.data.map(entry => ({
					name: entry.name.replace('allow-', ''), // Format name to remove prefix
					regexp: entry.regexp, // Display regexp if needed
				}));

				setWhitelist(formattedData);
			} catch (error) {
				console.error('Error fetching whitelist:', error);
				setError('Failed to fetch whitelist.');
			} finally {
				setLoading(false);
			}
		};

		fetchWhitelist();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	// Define the columns configuration
	const columns = [
		{
			name: 'Name',
			selector: row => row.name,
			sortable: true,
		},
	];

	return (
		<div className="w-full p-10">
			<h1 className="pl-2 bg-customBlue p-2 rounded-md text-white font-bold">Whitelist</h1>
			<DataTable
				columns={columns}
				data={whitelist}
				className="border mt-2 rounded-md"
			/>
		</div>
	);
}

export function AddList() {
	const [host, setHost] = useState('');
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [website, setWebsite] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const requestBody = {
			host,
			user,
			password,
			website,
		};

		try {
			const response = await fetch('http://localhost:5000/whitelist/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});
			
			if (response.ok) {
				const data = await response.json();
				alert('Whitelist entry added successfully');
			} else {
				const error = await response.json();
				alert(`Failed to add whitelist entry: ${error.message}`);
			}
		} catch (err) {
			console.error('Error:', err);
			alert('An error occurred while adding the whitelist entry');
		}
	};

	return (
		<div className="w-2/4 p-10">
			<form className="flex flex-col border m-2 p-2" onSubmit={handleSubmit}>
				<h1 className="font-semibold bg-customBlue text-white text-center p-2">Add Whitelist</h1>
				<div className="w-1/2">
					<div className="flex m-2 p-2">
						<h2 className="p-1">Host</h2>
						<input
							className="border bg-transparent rounded-md"
							type="text"
							value={host}
							onChange={(e) => setHost(e.target.value)}
						/>
					</div>
					<div className="flex m-2 p-2">
						<h2 className="p-1">User</h2>
						<input
							className="border bg-transparent rounded-md"
							type="text"
							value={user}
							onChange={(e) => setUser(e.target.value)}
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
					<div className="flex m-2 p-2">
						<h2 className="p-1">Website</h2>
						<input
							className="border bg-transparent rounded-md"
							type="text"
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
						/>
					</div>
				</div>
				<button className="flex border w-36 mx-10 p-1 mt-2 justify-center rounded-md bg-customBlue text-white self-center">
					Submit
				</button>
			</form>
		</div>
	);
}
