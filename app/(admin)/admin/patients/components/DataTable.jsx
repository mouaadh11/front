'use client';

import { FaRegPenToSquare } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';
import DataTableAction from './DataTableAction';
const DataTable = () => {
    const data = [
        {
            id: 1,
            email: 'tiribrk@gmail.com',
            phoneNum: '0523316564',
            createdAt: '2024-05-20T10:44:26.480Z',
            updatedAt: '2024-05-20T15:38:08.860Z',
            birthdate: '2003-10-21T00:00:00.000Z',
            firstName: 'safio',
            lastName: 'sdsdf',
            weight: 120,
            height: 170,
        },
        {
            id: 2,
            email: 'example2@example.com',
            phoneNum: '123-456-7890',
            createdAt: '2024-05-21T11:22:33.000Z',
            updatedAt: '2024-05-21T13:44:55.000Z',
            birthdate: '1995-08-15T00:00:00.000Z',
            firstName: 'John',
            lastName: 'Doe',
            weight: 150,
            height: 180,
        },
    ];

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = ('0' + (dateObject.getMonth() + 1)).slice(-2); // Adding 1 to month because it is zero-based
        const day = ('0' + dateObject.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div className='overflow-x-auto mt-5'>
            <table className='min-w-full border-collapse table-auto'>
                <thead>
                    <tr className='bg-gray-800 text-white'>
                        <th className='py-2 px-4 '>First Name</th>
                        <th className='py-2 px-4'>Last Name</th>
                        <th className='py-2 px-4'>Email</th>
                        <th className='py-2 px-4'>Phone Number</th>
                        <th className='py-2 px-4'>Created At</th>
                        <th className='py-2 px-4'>Updated At</th>
                        <th className='py-2 px-4'>Birthdate</th>
                        <th className='py-2 px-4'>Weight</th>
                        <th className='py-2 px-4'>Height</th>
                        <th className='py-2 px-4'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-200 text-gray-700'>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className='border-b'
                        >
                            <td className='py-2 px-4'>{item.firstName}</td>
                            <td className='py-2 px-4'>{item.lastName}</td>
                            <td className='py-2 px-4'>{item.email}</td>
                            <td className='py-2 px-4'>{item.phoneNum}</td>
                            <td className='py-2 px-4'>
                                {formatDate(item.createdAt)}
                            </td>
                            <td className='py-2 px-4'>
                                {formatDate(item.updatedAt)}
                            </td>
                            <td className='py-2 px-4'>
                                {formatDate(item.birthdate)}
                            </td>
                            <td className='py-2 px-4'>{item.weight}</td>
                            <td className='py-2 px-4'>{item.height}</td>
                            <td className=''>
                                <DataTableAction />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
