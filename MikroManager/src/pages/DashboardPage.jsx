import { NavBar } from "../components/NavBar"
import { Sidebar } from "../components/Sidebar"
import { UserList } from "./HotspotPage"
import { faWifi3 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function DashboardPage() {
    return (
        <div>
            <NavBar />
            <div>
                <div className="flex space-x-2 space-y-1">
                    {/* -------SIDEBAR------- */}
                    <div className="w-1/6">
                        <Sidebar />
                    </div>

                    {/* ----------HOME SECTION-------- */}
                    <div className="w-5/6 border border-customBlue">
                        <div className="flex bg-customBlue w-full h-15 p-2 items-center space-x-2">
                            <FontAwesomeIcon icon={faWifi3} color="white" />
                            <label className="text-white font-bold">Hotspot</label>
                        </div>
                        <UserList />
                    </div>
                </div>
            </div>
        </div>
    )
}