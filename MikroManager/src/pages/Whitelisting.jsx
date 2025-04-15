import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

export function Whitelist() {
    const [whitelist, setWhitelist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchWhitelist = async () => {
        const host = localStorage.getItem('host');
        const user = localStorage.getItem('username');
        const pass = localStorage.getItem('password');

        if (!host || !user || !pass) {
            console.error('Missing credentials in local storage');
            setError('Missing credentials');
            setLoading(false);
            return;
        }

        const body = {
            host: host,
            user: user,
            password: pass,
        };

        try {
            const response = await axios.post('http://localhost:5000/whitelist/list', body);
            console.log('Whitelist Data:', response.data);

            const addressMap = new Map();

            response.data.data.forEach(entry => {
                if (!addressMap.has(entry.address) && entry.comment == null) {
                    addressMap.set(entry.address, entry);
                }
            });

            const formattedData = Array.from(addressMap.values()).map(entry => ({
                address: entry.address,
                list: entry.list,
                creationTime: entry['creation-time'],
                comment: entry.comment || '',
            }));

            setWhitelist(formattedData);
        } catch (error) {
            console.error('Error fetching whitelist:', error);
            setError('Failed to fetch whitelist.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWhitelist();
    }, []);

    const handleDelete = async (address) => {
        const confirmed = window.confirm("Are you sure you want to delete this entry?");
        if (!confirmed) return; // Exit if the user cancels

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
            password: pass,
            address: address,
        };

        setLoading(true); // Set loading to true before the API call

        try {
            const response = await axios.post('http://localhost:5000/whitelist/delete', body);
            if (response.status === 200) {
                console.log('Whitelist entry deleted');
                await fetchWhitelist(); // Reload the whitelist data after deletion
            } else {
                console.error('Failed to delete entry:', response.data);
                alert('Failed to delete Whitelist entry.');
            }
        } catch (error) {
            console.error('Error deleting Whitelist entry:', error);
            alert('Failed to delete Whitelist entry.');
        } finally {
            setLoading(false); // Set loading to false after update
        }
    };

    const columns = [
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            name: 'List',
            selector: row => row.list,
            sortable: true,
        },
        {
            name: 'Creation Time',
            selector: row => row.creationTime,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <button
                    onClick={() => handleDelete(row.address)}
                    className="text-red-600"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            ),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		  }
    ];

    return (
        <div className="w-full p-10">
            <div className="flex items-center justify-between">
                <h1 className="pl-2 bg-customBlue p-2 rounded-md text-white font-bold flex-grow">Whitelist</h1>
                <button
                    className="bg-customBlue text-white p-2 rounded-md ml-2"
                    onClick={() => navigate('/addlist')}
                >
                    <FontAwesomeIcon icon={faPlus} />
					</button>
            </div>
            {loading ? (
                <div className="text-center mt-4">Loading...</div>
            ) : (
                <DataTable
                    columns={columns}
                    data={whitelist}
                    className="border mt-2 rounded-md"
                    pagination
                    paginationPerPage={10} // Set the number of rows per page
                    paginationRowsPerPageOptions={[10, 25, 50]} // Options for rows per page
                    noDataComponent={error ? error : 'No data available'}
                />
            )}
        </div>
    );
}


//adddlist
export function AddList() {
	const [host, setHost] = useState('');
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [website, setWebsite] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		

		const host = localStorage.getItem('host'); // Assuming these are strings
		const user = localStorage.getItem('username');
		const pass = localStorage.getItem('password');

		if (!host || !user || !pass) {
			console.error('Missing credentials in local storage');
			return;
		}

		const requestBody = {
			host: host,
			user: user,
			password: pass,
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
		<div className="w-1/2 p-10 mx-auto">
			<form className="flex flex-col border m-2 p-2" onSubmit={handleSubmit}>
				<h1 className="font-semibold bg-customBlue text-white text-center p-2">Add Whitelist</h1>
				<div className="w-1/2">
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

// delete
