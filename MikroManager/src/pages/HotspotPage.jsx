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
            <h1 className="font-semibold" >Add user</h1>
        </div>
    )
}

