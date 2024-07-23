import DataTable from "react-data-table-component"
const columns = [
	{
		name: 'Name',
		selector: row => row.name,
	},
	{
		name: 'Profile',
		selector: row => row.profile,
	},
	{
		name: 'Uptime',
		selector: row => row.uptime,
	},
];

const data = [
	{
		id: 1,
		name: 'User1',
		profile: 'Faculty',
		uptime: '1.5',
	},
	{
		id: 2,
		name: 'User2',
		profile: 'Student',
		uptime: '2.5',
	},
]

export function UserList() {
	return (
		<div className="w-full p-10">
			<h1 className="pl-2 bg-customBlue p-2 rounded-md text-white font-bold" >User List</h1>
			<DataTable
				columns={columns}
				data={data}
				className="border mt-2 rounded-md"
			/>
		</div>
	)
}

export function AddUser() {
	return (
		<div>

			<form className="flex flex-col border m-2 p-2">
				<h1 className="font-semibold bg-customBlue text-white text-center p-2" >Add user</h1>
				<div className="flex m-2 p-2">
					<h2 className="p-1">Title</h2>
					<input className="border" type="text" />
				</div>
				<div className="flex m-2 px-2">
					<h2 className="p-1">Year</h2>
					<input className="border" type="text" />
				</div>
				<button className="flex border mx-10 p-1 mt-2 justify-center">Submit</button>
			</form>
		</div>
	)
}

