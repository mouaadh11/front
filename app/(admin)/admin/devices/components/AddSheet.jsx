'use client';
import React, { useState } from 'react';

const AddDeviceSideSheet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        Sid: '',
        Activated_code: '',
    });
    const [errors, setErrors] = useState({});

    const toggleSideSheet = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.Sid.trim()) {
            validationErrors.Sid = 'Sid is required';
        }
        if (!formData.Activated_code.trim()) {
            validationErrors.Activated_code = 'Activated Code is required';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            // Handle form submission here (e.g., send data to server)
            console.log('Form submitted:', formData);
            // Reset form after submission
            setFormData({
                Sid: '',
                Activated_code: '',
            });
        }
    };

    return (
        <div className='relative'>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={toggleSideSheet}
            >
                Add Device
            </button>
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-40'
                    onClick={toggleSideSheet}
                ></div>
            )}
            <div
                className={`fixed top-0 right-0 bottom-0 bg-white w-1/3 overflow-y-auto transform transition-all duration-300 z-50 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className='p-4'>
                    <h2 className='text-lg font-bold mb-4 text-black'>
                        Add Device
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label
                                htmlFor='Sid'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Sid
                            </label>
                            <input
                                type='text'
                                id='Sid'
                                name='Sid'
                                className={`mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                                    errors.Sid ? 'border-red-500' : ''
                                }`}
                                placeholder='Enter Sid'
                                value={formData.Sid}
                                onChange={handleChange}
                                required
                            />
                            {errors.Sid && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.Sid}
                                </p>
                            )}
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='Activated_code'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Activated Code
                            </label>
                            <input
                                type='text'
                                id='Activated_code'
                                name='Activated_code'
                                className={`mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                                    errors.Activated_code
                                        ? 'border-red-500'
                                        : ''
                                }`}
                                placeholder='Enter Activated Code'
                                value={formData.Activated_code}
                                onChange={handleChange}
                                required
                            />
                            {errors.Activated_code && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.Activated_code}
                                </p>
                            )}
                        </div>
                        <div className='flex items-center justify-between'>
                            <button
                                type='submit'
                                className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            >
                                Submit
                            </button>
                            <button
                                type='button'
                                className='mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                onClick={toggleSideSheet}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDeviceSideSheet;
