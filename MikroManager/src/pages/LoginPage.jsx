import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Image from '../assets/bgGuess.png';

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
	const [alertContent, setAlertContent] = useState('');
	const [isLoading, setIsLoading] = useState(false);



	const handleSubmit = async (e) => {
		e.preventDefault();
		const msg = "Incorrect Credentials"
		setIsLoading(true);
		try {
			const response = await loginUser({
				host,
				username,
				password
			});
			if (response.token) {
				setAlertContent(response.token);
				localStorage.setItem('token', response.token);
				setIsLoading(false);
				navigate("/dashboard");
				window.location.reload();
			}
		} catch (error) {
			setIsLoading(false);
			setAlertContent(error);
			alert(msg);
		}

	};

	return (
		<div className="flex flex-col justify-center h-screen w-full items-center" style={{ backgroundImage: `url(${Image})` }}>
			{isLoading ?
				<div className='absolute backdrop-blur-sm h-screen w-screen'>
					<div className='flex justify-center items-center h-full w-full'>
						<FontAwesomeIcon icon={faSpinner} className='animate-spin h-7 w-7' />
					</div>
				</div>
				: <> </>}
			<form className='flex-col border border-blue-400 pb-2 rounded-lg justify-between items-center p-5' onSubmit={handleSubmit}>
				<h1 className="bg-customBlue rounded-t-lg p-2 mx-auto my-auto font-bold text-xl text-white tracking-wider px-28 mb-4">Guess Wi-Fi</h1>
				<div className='flex mt-2 justify-center'>
					<h1> IP MikroTik </h1>
					<input
						className='pl-2 ml-[45px] w-64 bg-gray-200 rounded-sm border border-[#008BC9]'
						type="text"
						value={host}
						onChange={(e) => setHost(e.target.value)}
						required
					/>

				</div>
				<div className='flex mt-2 justify-center'>
					<h1> Username </h1>
					<input
						className='pl-2 ml-[53px] w-64 bg-gray-200 rounded-sm border border-[#008BC9]'
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>

				</div>
				<div className='flex mt-2 justify-center'>
					<h1 className=''> Password </h1>
					<input
						className='pl-2 ml-[58px] w-64 bg-gray-200 rounded-sm border border-[#008BC9] '
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

				</div>
				<div className='flex mx-auto justify-center text-center border-gray-600 mt-2 px-1'>
					<button className='w-full px-5 py-1 text-center bg-gray-200 hover:bg-customBlue hover:text-white hover:scale-105 border  rounded-md transition duration-300 ease-in-out' type="submit">Connect</button>
				</div>
			</form>
		</div >
	);
};

export default LoginPage;
