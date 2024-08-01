import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
const columns = [
	{
		name: 'Name',
		selector: row => row.name,
	},
	{
		name: 'Rate Limit (rx/tx)',
		selector: row => row.rl,
	},
];

const data = [
	{
		id: 1,
		name: 'Faculty Profile',
		rl: '10M/10M',
	},
	{
		id: 2,
		name: 'Student Profile',
		rl: '5M/5M',
	},
]

export function ProfileList() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {

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
				password: pass,
			};
	

			try {
				const response = await axios.post("http://localhost:5000/profile/list", body);
				console.log("data:", response.data);

				// Format the data to include only the fields you want
				const formattedData = response.data.data.map(item => ({
					id: item[".id"],
					name: item.name,
					sharedUsers: item["shared-users"],
					rateLimit: item["rate-limit"] || 'N/A' // If rate-limit is missing, set it to 'N/A'
				}));

				setData(formattedData);
			} catch (error) {
				console.error('Error:', error);
			} finally {
				console.log('Request Completed');
			}
		};

		fetchData();
	}, []);

	// Define the columns configuration
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
			name: 'Shared Users',
			selector: row => row.sharedUsers,
			sortable: true,
		},
		{
			name: 'Rate Limit',
			selector: row => row.rateLimit,
			sortable: true,
		},
	];

	return (
		<div className="w-full p-10">
			<h1 className="pl-2 bg-customBlue p-2 rounded-md text-white font-bold">Profile List</h1>
			<DataTable
				columns={columns}
				data={data}
				className="border mt-2 rounded-md"
			/>
		</div>
	);
}

export function AddProfile() {
	const [name, setName] = useState('');
	const [rateLimit, setRateLimit] = useState('');

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
			password: pass,
			name: name,
			rateLimit: rateLimit,  // Include password in the request body
		};

		try {
			const response = await axios.post("http://localhost:5000/profile/add", body);
			console.log("Response:", response.data);
			if (response.status === 200) {
				alert('Profile added successfully');
				// Optionally, clear the form
				setName('');
				setRateLimit('');
			} else {
				alert('Failed to add profile');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while adding the profile');
		}
	};

	return (
		<div className="w-2/4 p-10">
			<form className="flex flex-col border m-2 p-2" onSubmit={handleSubmit}>
				<h1 className="font-semibold bg-customBlue text-white text-center p-2">Add Profile</h1>
				<div className="w-1/2">
					<div className="flex m-2 p-2">
						<h2 className="p-1">Name</h2>
						<input
							className="border bg-transparent rounded-md"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex m-2 px-2">
						<h2 className="p-1 whitespace-pre">Rate Limit (rx/tx)</h2>
						<input
							className="border bg-transparent rounded-md"
							type="text"
							value={rateLimit}
							onChange={(e) => setRateLimit(e.target.value)}
						/>
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