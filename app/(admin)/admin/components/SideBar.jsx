'use client';

import { FaUserDoctor } from 'react-icons/fa6';
import { MdOutlineSpatialAudio } from 'react-icons/md';
import { BsDeviceSsd } from 'react-icons/bs';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    const linkClasses = (path) =>
        `flex items-center py-3 px-6 w-full rounded-md cursor-pointer ${
            pathname === path ? 'bg-gray-900' : 'bg-gray-700'
        }`;

    return (
        <div className='h-full bg-gray-800 w-64 fixed top-0 left-0 flex flex-col '>
            <div className='py-4 px-6 flex items-center justify-center bg-gray-900'>
                <span className='text-white text-lg font-semibold'>
                    Admin Page
                </span>
            </div>

            <div className='flex flex-col justify-between mt-4 p-2 flex-1'>
                <ul className='flex flex-col items-start space-y-4 '>
                    <Link
                        href='/admin/patients'
                        className={linkClasses('/admin/patients')}
                    >
                        <MdOutlineSpatialAudio className='mr-2 text-white text-2xl' />
                        <span className='text-white'>Patient</span>
                    </Link>
                    <Link
                        href='/admin/doctors'
                        className={linkClasses('/admin/doctors')}
                    >
                        <FaUserDoctor className='mr-2 text-white text-2xl' />
                        <span className='text-white'>Doctors</span>
                    </Link>
                    <Link
                        href='/admin/devices'
                        className={linkClasses('/admin/devices')}
                    >
                        <BsDeviceSsd className='mr-2 text-white text-2xl' />
                        <span className='text-white'>Devices</span>
                    </Link>
                </ul>

                <div>
                    <button className='flex items-center py-3 px-6 bg-red-700 w-full rounded-md cursor-pointer'>
                        <CiLogout className='mr-2 text-white text-2xl' />
                        <span className='text-white'>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
