import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
export function NavBar() {
    return (
        <div className="flex bg-customBlue p-5 w-screen justify-between">
            <label className="text-white font-bold">MikroManager</label>
            <div className="cursor-pointer">
                <FontAwesomeIcon icon={faRightFromBracket} color="white" className="px-2 hover:scale-125 transition delay-100" />
                <label className="text-white font-semibold">Logout</label>
            </div>
        </div>
    )
}