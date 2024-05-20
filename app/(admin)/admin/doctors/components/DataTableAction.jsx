'use client'
import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation'

function DataTableAction({ itemId }) {
    const router = useRouter()

    const handleDelete = async (id) => {
        const user = localStorage.getItem('user');
        if (!user) {
            console.error('User not found in local storage');
            return;
        }

        // Parse user object and get userId
        const parsedUser = JSON.parse(user);
        const userId = parsedUser.id;

        try {
            console.log(userId)
            const response = await fetch(`http://localhost:5000/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UserId: userId }),
            });
            

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Item deleted successfully');
            router.refresh()
            // You can perform additional actions after successful deletion if needed
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className='py-2 px-4 flex items-center gap-3'>
            <button onClick={() => handleDelete(itemId)}>
                <MdDeleteOutline className='text-xl text-red-400' />
            </button>
        </div>
    );
}

export default DataTableAction;
