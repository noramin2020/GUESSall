import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faSpinner, faWifi } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
export function NavBar() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            localStorage.removeItem("token");
            window.location.reload();
        }, [500]);
    };

    return (
        <div>
            {isLoading ?
                <div className='absolute backdrop-blur-sm h-screen w-screen'>
                    <div className='flex justify-center items-center h-full w-full'>
                        <FontAwesomeIcon icon={faSpinner} className='animate-spin h-7 w-7' />
                    </div>
                </div>
                : <> </>}
            <div className="flex bg-customBlue p-7 w-screen justify-between">
                <div>
                    <FontAwesomeIcon icon={faWifi} color="white" className="px-2 hover:scale-125 transition duration-300 ease-in-out" />
                    <label className="text-white font-bold">Guess</label>
                </div>
                <div className="cursor-pointer mr-5" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} color="white" className="px-2 hover:scale-125 transition duration-300 ease-in-out" />
                    <label className="text-white font-semibold">Logout</label>
                </div>
            </div>
        </div>
    )
}