import DataTable from "react-data-table-component"
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
	return (
		<div className="w-full p-10">
		<h1 className="pl-2 bg-customBlue p-2 rounded-md text-white font-bold" >Profile List</h1>
		<DataTable
			columns={columns}
			data={data}
			className="border mt-2 rounded-md"
		/>
	</div>
	)
}

export function AddProfile() {
	return (
		<div>
			ADD PROFILE
		</div>
	)
}