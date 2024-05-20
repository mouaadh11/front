'use client'
import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation'

function DataTableAction({ itemId }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const user = localStorage.getItem('user');
            if (!user) {
                console.error('User not found in local storage');
                return;
            }

            // Parse user object and get userId
            const parsedUser = JSON.parse(user);
            const userId = parsedUser.id;

            const response = await fetch(`http://localhost:5000/user/devices/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserId: userId,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            setIsLoading(false);
            console.log('Item deleted successfully!');
            router.refresh()
        } catch (error) {
            console.error('Error deleting item:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className='py-2 px-4 flex items-center gap-3'>
            <button onClick={handleDelete} disabled={isLoading}>
                <MdDeleteOutline className={`text-xl ${isLoading ? 'text-gray-400' : 'text-red-400'}`} />
            </button>
        </div>
    );
}

export default DataTableAction;
