
export function ProfileList() {
	return (
		<div>
			PROFILE LIST
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