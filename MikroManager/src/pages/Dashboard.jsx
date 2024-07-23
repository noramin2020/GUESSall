import { NavBar } from "../components/NavBar"
// import NewSidebar from "../components/NewSidebar";
// import { Sidebar } from "../components/Sidebar"
import { AddUser } from "./Hotspot";
import { faWifi3 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function DashboardPage() {


    return (
        <div className="flex w-full h-full m-5 border rounded-md bg-white">

            <div className="flex p-5 gap-5 w-full">
                <div className="card w-full shadow-xl">
                    <div className="card-body bg-[#4dbd74] text-white rounded-md ">
                        <h2 className="card-title">Active User</h2>
                        <p>Number of Active user: 8</p>
                        <div className="card-actions justify-end">
                            <button className="px-5 py-2 rounded md bg-white text-black hover:scale-95 duration-300">Show</button>
                        </div>
                    </div>
                </div>
                <div className="card w-full shadow-xl">
                    <div className="card-body bg-[#f86c6b] text-white rounded-md ">
                        <h2 className="card-title">User</h2>
                        <p>Number of User: 128</p>
                        <div className="card-actions justify-end">
                            <button className="px-5 py-2 rounded md bg-white text-black hover:scale-95 duration-300">Show</button>
                        </div>
                    </div>
                </div>
                <div className="card w-full shadow-xl">
                    <div className="card-body bg-customBlue text-white rounded-md ">
                        <h2 className="card-title">Add Whitelist</h2>
                        <p>Number of Whitelist: 5</p>
                        <div className="card-actions justify-end">
                            <button className="px-5 py-2 rounded md bg-white text-black hover:scale-95 duration-300">+ Add whitelist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}