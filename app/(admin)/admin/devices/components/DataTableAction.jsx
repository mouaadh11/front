import React from 'react';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';

function DataTableAction() {
    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    };

    const handleUpdate = (id) => {
        // Add your logic for updating a row here
        console.log('Update row with ID:', id);
    };

    return (
        <div className='py-2 px-4 flex items-center gap-3'>
            {/* <button onClick={() => handleUpdate(item.id)}>
                <FaRegPenToSquare className='text-lg text-green-400' />
            </button> */}
            <button onClick={() => handleDelete(item.id)}>
                <MdDeleteOutline className='text-xl text-red-400' />
            </button>
        </div>
    );
}

export default DataTableAction;
