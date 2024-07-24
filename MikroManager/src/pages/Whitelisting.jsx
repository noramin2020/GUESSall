export function Whitelist() {
	return (
		<div>
			WHITE LIST
		</div>
	)
}

export function AddList() {
	return (
		<div className="w-2/4 p-10">
			<form className="flex flex-col border m-2 p-2">
				<h1 className="font-semibold bg-customBlue text-white text-center p-2" >Add user</h1>
				<div className="w-1/2">
					<div className="flex m-2 p-2">
						<h2 className="p-1">Name</h2>
						<input className="border bg-transparent rounded-md" type="text" />
					</div>
					<div className="flex m-2 px-2">
						<h2 className="p-1 whitespace-pre">MAC ADDRESS</h2>
						<input className="border bg-transparent rounded-md" type="text" />
					</div>

				</div>
				<button className="flex border w-36 mx-10 p-1 mt-2 justify-center rounded-md bg-customBlue text-white self-center">Submit</button>
			</form>
		</div>
	)
}