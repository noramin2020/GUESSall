import DataTable from "react-data-table-component"
const columns = [
	{
		name: 'Title',
		selector: row => row.title,
	},
	{
		name: 'Year',
		selector: row => row.year,
	},
];

const data = [
	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
]

export function UserList() {
	return (
		<div className="p-2">
			<h1 className="font-semibold" >User List</h1>
			<DataTable
				columns={columns}
				data={data}
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

