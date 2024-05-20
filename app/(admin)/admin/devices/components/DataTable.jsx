'use client';

import DataTableAction from './DataTableAction';
import AddDeviceSideSheet from './AddSheet';

const DataTable = () => {
    const data = [
        {
            id: 1,
            Sid: 'A123456',
            Activated_code: 'ACT789',
            Owned_by: 'Company A',
            Owner: 'John Doe',
            Created_at: '2024-05-20T10:44:26.480Z',
            Updated_at: '2024-05-20T15:38:08.860Z',
        },
        {
            id: 2,
            Sid: 'B654321',
            Activated_code: 'ACT123',
            Owned_by: 'Company B',
            Owner: 'Jane Smith',
            Created_at: '2024-05-21T11:22:33.000Z',
            Updated_at: '2024-05-21T13:44:55.000Z',
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
                        <th className='py-2 px-4 '>Sid</th>
                        <th className='py-2 px-4'>Activated Code</th>
                        <th className='py-2 px-4'>Owned By</th>
                        <th className='py-2 px-4'>Owner</th>
                        <th className='py-2 px-4'>Created At</th>
                        <th className='py-2 px-4'>Updated At</th>

                        <div className='py-2 px-4'>
                            <AddDeviceSideSheet />
                        </div>
                    </tr>
                </thead>
                <tbody className='bg-gray-200 text-gray-700'>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className='border-b'
                        >
                            <td className='py-2 px-4'>{item.Sid}</td>
                            <td className='py-2 px-4'>{item.Activated_code}</td>
                            <td className='py-2 px-4'>{item.Owned_by}</td>
                            <td className='py-2 px-4'>{item.Owner}</td>
                            <td className='py-2 px-4'>
                                {formatDate(item.Created_at)}
                            </td>
                            <td className='py-2 px-4'>
                                {formatDate(item.Updated_at)}
                            </td>
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
