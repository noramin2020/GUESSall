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
			<h1 className="font-semibold" >Add user</h1>
		</div>
	)
}

