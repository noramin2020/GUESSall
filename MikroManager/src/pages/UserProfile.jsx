import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

export function ProfileList() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null); // State to hold the profile being edited
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Hook for navigation

  const fetchData = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    const host = localStorage.getItem('host');
    const user = localStorage.getItem('username');
    const pass = localStorage.getItem('password');

    if (!host || !user || !pass) {
      console.error('Missing credentials in local storage');
      setLoading(false);
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

      const formattedData = response.data.data.map(item => ({
        id: item[".id"],
        name: item.name,
        sharedUsers: item["shared-users"],
        rateLimit: item["rate-limit"] || 'N/A',
      }));

      setData(formattedData);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch profile data.');
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmed) return; // Exit if the user cancels

    const host = localStorage.getItem('host');
    const user = localStorage.getItem('username');
    const pass = localStorage.getItem('password');

    const body = {
      host: host,
      user: user,
      password: pass,
      profileId: id,
    };

    try {
      await axios.post("http://localhost:5000/profile/delete", body);
      fetchData();
    } catch (error) {
      console.error('Error deleting Profile entry:', error);
      alert('Failed to delete Profile entry.');
    }
  };

  const handleEdit = (profile) => {
    setEditData(profile); // Set the profile to be edited
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while updating
    const { id, name, rateLimit } = editData;

    const host = localStorage.getItem('host');
    const user = localStorage.getItem('username');
    const pass = localStorage.getItem('password');

    const body = {
      host: host,
      user: user,
      password: pass,
      profileId: id,
      name: name,
      rateLimit: rateLimit,
    };

    try {
      await axios.post("http://localhost:5000/profile/update", body);
      fetchData();
      setEditData(null); // Clear the edit state
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false); // Set loading to false after update
    }
  };

  const handleCancel = () => {
    setEditData(null); // Clear the edit state
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
      name: 'Shared Users',
      selector: row => row.sharedUsers,
      sortable: true,
    },
    {
      name: 'Rate Limit',
      selector: row => row.rateLimit,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <button onClick={() => handleEdit(row)} className="mr-2">
            <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
          </button> 
          <button onClick={() => handleDelete(row.id)} className="text-red-600">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      ),
	  ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-between">
        <h1 className="pl-2 bg-customBlue p-2 rounded-md text-white font-bold flex-grow">Profile List</h1>
        <button
          className="bg-customBlue text-white p-2 rounded-md ml-2"
          onClick={() => navigate('/addprofile')}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {loading ? (
        <div className="text-center mt-4">Loading...</div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={data}
            className="border mt-2 rounded-md"
            pagination
            paginationPerPage={10} // Set the number of rows per page
            paginationRowsPerPageOptions={[10, 25, 50]} // Options for rows per page
            noDataComponent={error ? error : 'No data available'}
          />
          {editData && (
            <div className="w-1/2 p-10 mx-auto">
              <form className="flex flex-col border m-2 p-2" onSubmit={handleUpdate}>
                <h1 className="font-semibold bg-customBlue text-white text-center p-2">Update Profile</h1>
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
                  <div className="flex m-2 px-2">
                    <h2 className="p-1 whitespace-pre">Rate Limit (rx/tx)</h2>
                    <input
                      className="border bg-transparent rounded-md"
                      type="text"
                      value={editData.rateLimit}
                      onChange={(e) => setEditData({ ...editData, rateLimit: e.target.value })}
                    />
                  </div>
                </div>
				<div className="flex justify-between mt-2 w-full">
					<button
						className="flex-grow mx-2 border p-1 justify-center rounded-md bg-customBlue text-white"
						type="submit"
					>
						Update
					</button>
					<button
						className="flex-grow mx-2 border p-1 justify-center rounded-md bg-gray-300 text-black"
						type="button"
						onClick={handleCancel}
					>
						Cancel
					</button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
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
		<div className="w-1/2 p-10 mx-auto">
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