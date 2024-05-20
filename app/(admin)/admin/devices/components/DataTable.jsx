'use client'
import React, { useState, useEffect } from 'react';
import DataTableAction from './DataTableAction';
import AddDeviceSideSheet from './AddSheet';


const DataTable = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const user = localStorage.getItem('user');
            if (!user) {
                console.error('User not found in local storage');
                return;
            }

            // Parse user object and get userId
            const parsedUser = JSON.parse(user);
            const userId = parsedUser.id;
            try {
                const response = await fetch('http://localhost:5000/user/devices/all', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // Optionally, you can pass any body data here if needed
                    body: JSON.stringify({
                        UserId: userId,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const responseData = await response.json();
                setData(responseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once on component mount

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
                        <th className='py-2 px-4'>Sid</th>
                        <th className='py-2 px-4'>Activated Code</th>
                        <th className='py-2 px-4'>Owned By</th>
                        <th className='py-2 px-4'>Created At</th>
                        <th className='py-2 px-4'>Updated At</th>
                        <th className='py-2 px-4'><AddDeviceSideSheet/></th>
                    </tr>
                </thead>
                <tbody className='bg-gray-200 text-gray-700'>
                    {data.map((item) => (
                        <tr key={item.id} className='border-b'>
                            <td className='py-2 px-4 text-center'>{item.Sid}</td>
                            <td className='py-2 px-4 text-center'>{item.activateCode}</td>
                            <td className='py-2 px-4 text-center'>{item.ownerID}</td>
                            <td className='py-2 px-4 text-center'>
                                {formatDate(item.createdAt)}
                            </td>
                            <td className='py-2 px-4 text-center'>
                                {formatDate(item.updateAt)}
                            </td>
                            <td className=''>
                                <DataTableAction itemId={item.Sid} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
