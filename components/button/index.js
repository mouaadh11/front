'use client';
import React from 'react';
export default function Button({ handler, title }) {
    return (
        <button
            onClick={handler}
            className='bg-[#0374db] hover:bg-[#fb7c32] px-4 py-2 rounded text-white font-semibold'
        >
            {title}
        </button>
    );
}
