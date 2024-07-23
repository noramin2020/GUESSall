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

			<form className="flex flex-col border m-2 p-2">
				<h1 className="font-semibold bg-customBlue text-white text-center p-2" >Add Profile</h1>
				<div className="flex m-2 p-2">
					<h2 className="p-1">Title</h2>
					<input className="border" type="text" />
				</div>
				<div className="flex m-2 p-2">
					<h2 className="p-1">Year</h2>
					<input className="border" type="text" />
				</div>
				<button className="flex border mx-10 p-1 justify-center">Submit</button>
			</form>
		</div>
	)
}