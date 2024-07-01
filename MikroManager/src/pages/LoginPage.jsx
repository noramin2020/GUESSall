import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
	const [host, setHost] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const navigate = useNavigate();

	const handleSubmit = () => {
		// axios.get("/login")
		// 	.then(({ data }) => data)
		// 	.finally(console.log('Data'))
		navigate('Dashboard');
	}

	return (
		<div className="flex flex-col justify-center h-screen">
			<form className='flex-col border border-blue-400 pb-2 rounded-lg justify-center mx-auto my-auto divide-y-8 divide-white divide-solid' onSubmit={handleSubmit}>
				<h1 className="bg-customBlue  rounded-t-lg p-2 mx-auto my-auto font-bold text-xl text-white tracking-wider px-28 mb-4">Guess Wi-Fi</h1>
				<div className='flex'>
					<label className='ml-4'>
						IP MikroTik
						<input
							className='ml-[45px] w-64 bg-gray-200 rounded-sm border border-[#008BC9]'
							type="text"
						// value={mikrotik}
						// onChange={(e) => setMikrotik(e.target.value)}
						/>
					</label>
				</div>
				<div className='flex'>
					<label className='ml-4'>
						Username
						<input
							className='ml-[53px] w-64 bg-gray-200 rounded-sm border border-[#008BC9]'
							type="text"
						// value={username}
						// onChange={(e) => setUsername(e.target.value)}
						/>
					</label>
				</div>
				<div className='flex'>
					<label className='ml-4'>
						Password
						<input
							className='ml-[58px] w-64 bg-gray-200 rounded-sm border border-[#008BC9]'
							type="text"
						// value={password}
						// onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
				</div>
				<div className='flex mx-auto justify-center text-center border-gray-600 mt-2 px-1'>
					<button className='px-5 py-1 text-center bg-gray-200 border border-customBlue hover:scale-105 hover:bg-customBlue hover:border-gray-200 hover:text-white' type="submit">Connect</button>
					<button className='px-5 py-1 text-center bg-gray-200 border border-[#008BC9]'>Ping</button>
					<button className='px-5 py-1 text-center bg-gray-200 border border-[#008BC9]'>Save</button>
					<button className='px-5 py-1 text-center bg-gray-200 border border-[#008BC9]'>Refresh</button>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
