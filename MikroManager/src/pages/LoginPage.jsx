import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

async function loginUser(credentials) {
	const { host, username, password } = credentials;

	// console.log(credentials);
	const body = {
		host: host,
		user: username,
		password: password
	};
	return axios.post("http://localhost:5000/login", body)
		.then((response) => {
			return response.data; // Return the response data
		})
		.catch((error) => {
			console.error('Error:', error);
			throw error; // Rethrow the error for further handling
		})
		.finally(() => {
			console.log('Request Completed');
		});
}

const LoginPage = () => {
	const navigate = useNavigate();
	const [host, setHost] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	// const [alert, setAlert] = useState(false);
	const [alertContent, setAlertContent] = useState('');

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setAlert((prev) => !prev)
	// 	}, 1000)
	// }, [alert]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await loginUser({
				host,
				username,
				password
			});
			if (response.token) {
				// setAlert(true);
				setAlertContent(response.token);
				localStorage.setItem('token', response.token);
				navigate("/dashboard");
				window.location.reload();
			}
		} catch (error) {
			console.error('Login failed:', error);
			// setAlert(true);
			setAlertContent(error);
		}
	};

	return (
		<div className="flex flex-col justify-center h-screen">
			{/* <div>
				{alert ? <Alert severity='success'> {alertContent} </Alert> : <></>}
			</div> */}
			<form className='flex-col border border-blue-400 pb-2 rounded-lg justify-center mx-auto my-auto divide-y-8 divide-white divide-solid p-5' onSubmit={handleSubmit}>
				<h1 className="bg-customBlue rounded-t-lg p-2 mx-auto my-auto font-bold text-xl text-white tracking-wider px-28 mb-4">Guess Wi-Fi</h1>
				<div className='flex'>
					<label className=''>
						IP MikroTik
						<input
							className='pl-2 ml-[45px] w-64 bg-gray-200 rounded-sm border border-[#008BC9]'
							type="text"
							value={host}
							onChange={(e) => setHost(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className='flex'>
					<label className=''>
						Username
						<input
							className='pl-2 ml-[53px] w-64 bg-gray-200 rounded-sm border border-[#008BC9]'
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className='flex'>
					<label className=''>
						Password
						<input
							className='pl-2 ml-[58px] w-64 bg-gray-200 rounded-sm border border-[#008BC9]'
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className='flex mx-auto justify-center text-center border-gray-600 mt-2 px-1'>
					<button className='px-5 py-1 text-center bg-gray-200 border border-customBlue hover:scale-105 hover:bg-customBlue hover:border-gray-200 hover:text-white rounded-md' type="submit">Connect</button>
				</div>
			</form>
		</div >
	);
};

export default LoginPage;
