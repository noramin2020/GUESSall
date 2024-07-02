import React from 'react';
import { useEffect, useState } from 'react';
import { faArrowDown, faCaretDown, faDashboard, faGlobe, faList, faUser, faUserAstronaut, faUserPlus, faWifi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Sidebar() {
    const [hotspotClick, setHotspotClick] = useState(false);
    const [profileClick, setProfileClick] = useState(false);


    useEffect(() => {
        console.log('Clicked');
    }, [hotspotClick])
    return (
        <div className="border border-customBlue w-full h-96 mt-1">
            <div className="flex bg-customBlue w-full h-15 p-2 justify-center">
                <label className="text-white font-bold">Mikrotik</label>
            </div>
            <div className="px-2 mt-2">
                <ul className="space-y-4">

                         {/* -----------Hotspot---------- */}
                    <li className="flex hover:bg-customBlue hover:text-white hover:rounded-md">
                        <div className="flex gap-3 justify-center items-center px-2">
                            <div>
                                <FontAwesomeIcon icon={faDashboard} />
                            </div>
                            <div>
                                <label>Dashboard</label>
                            </div>
                        </div>
                    </li>
                    <li className="flex flex-col ">
                        <div className="flex gap-3  items-center px-2  border-y border-customBlue">
                            <div>
                                <FontAwesomeIcon icon={faWifi} />
                            </div>
                            <div >
                                <label >Hotspot</label>
                            </div>
                        </div>
                        <div className='pl-5 mt-3'>
                            <ul className='space-y-1'>
                                <li className='flex gap-3 items-center justify-left hover:bg-customBlue hover:text-white hover:rounded-md pl-2'>
                                    <div>
                                        <FontAwesomeIcon icon={faList} />
                                    </div>
                                    <div>
                                        <label>
                                            User List
                                        </label>
                                    </div>

                                </li>
                                <li className='flex gap-3 items-center justify-left hover:bg-customBlue hover:text-white hover:rounded-md pl-2 '>
                                    <div>
                                        <FontAwesomeIcon icon={faUserAstronaut} />
                                    </div>
                                    <div>
                                        <label>
                                            Add User
                                        </label>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>
                    {/* -----------User Profile---------- */}
                    <li className="flex flex-col ">
                        <div className="flex gap-3 justify-left items-center px-2 border-y border-customBlue">
                            <div>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div>
                                <label >User Profile</label>
                            </div>
                        </div>
                        <div className='pl-5 mt-3'>
                            <ul className='space-y-1'>
                                <li className='flex gap-3 items-center justify-left hover:bg-customBlue hover:text-white hover:rounded-md pl-2 '>
                                    <div>
                                        <FontAwesomeIcon icon={faList} />
                                    </div>
                                    <div>
                                        <label>
                                            Profile List
                                        </label>
                                    </div>
                                </li>
                                <li className='flex gap-3 items-center justify-left hover:bg-customBlue hover:text-white hover:rounded-md pl-2'>
                                    <div>
                                        <FontAwesomeIcon icon={faUserPlus} />
                                    </div>
                                    <div>
                                        <label>
                                            Add Profile
                                        </label>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        {/* -----------WEBSITE---------- */}

                        <li className="flex flex-col mt-2">
                            <div className="flex gap-3  items-center px-2  border-y border-customBlue">
                                <div>
                                    <FontAwesomeIcon icon={faGlobe} />
                                </div>
                                <div >
                                    <label >Website</label>
                                </div>
                            </div>
                            <div className='pl-5 mt-3'>
                                <ul className='space-y-1'>
                                    <li className='flex gap-3 items-center justify-left hover:bg-customBlue hover:text-white hover:rounded-md pl-2'>
                                        <div>
                                            <FontAwesomeIcon icon={faList} />
                                        </div>
                                        <div>
                                            <label>
                                                White list
                                            </label>
                                        </div>

                                    </li>
                                    <li className='flex gap-3 items-center justify-left hover:bg-customBlue hover:text-white hover:rounded-md pl-2 '>
                                        <div>
                                            <FontAwesomeIcon icon={faUserAstronaut} />
                                        </div>
                                        <div>
                                            <label>
                                                Add list
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </li>
                </ul>
            </div>
        </div >
    )
}