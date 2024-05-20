'use client';
import React, { useState } from 'react';

const AddDoctorSideSheet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        birthdate: '',
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
        if (!formData.firstName.trim()) {
            validationErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            validationErrors.lastName = 'Last Name is required';
        }
        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }
        if (!formData.phoneNumber.trim()) {
            validationErrors.phoneNumber = 'Phone Number is required';
        }
        if (!formData.birthdate.trim()) {
            validationErrors.birthdate = 'Birthdate is required';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            // Handle form submission here (e.g., send data to server)
            console.log('Form submitted:', formData);
            // Reset form after submission
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                birthdate: '',
            });
        }
    };

    return (
        <div className='relative'>
            <button
                className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={toggleSideSheet}
            >
                Add
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
                        Add Doctor
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label
                                htmlFor='firstName'
                                className='block text-sm font-medium text-gray-700'
                            >
                                First Name
                            </label>
                            <input
                                type='text'
                                id='firstName'
                                name='firstName'
                                className={`mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                    errors.firstName ? 'border-red-500' : ''
                                }`}
                                placeholder='John'
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            {errors.firstName && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.firstName}
                                </p>
                            )}
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='lastName'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Last Name
                            </label>
                            <input
                                type='text'
                                id='lastName'
                                name='lastName'
                                className={`mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                    errors.lastName ? 'border-red-500' : ''
                                }`}
                                placeholder='Doe'
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            {errors.lastName && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                className={`mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                    errors.email ? 'border-red-500' : ''
                                }`}
                                placeholder='john.doe@example.com'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='phoneNumber'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Phone Number
                            </label>
                            <input
                                type='tel'
                                id='phoneNumber'
                                name='phoneNumber'
                                className={`mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                    errors.phoneNumber ? 'border-red-500' : ''
                                }`}
                                placeholder='Enter phone number'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                            {errors.phoneNumber && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.phoneNumber}
                                </p>
                            )}
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='birthdate'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Birthdate
                            </label>
                            <input
                                type='date'
                                id='birthdate'
                                name='birthdate'
                                className={`mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                    errors.birthdate ? 'border-red-500' : ''
                                }`}
                                value={formData.birthdate}
                                onChange={handleChange}
                                required
                            />
                            {errors.birthdate && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.birthdate}
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

export default AddDoctorSideSheet;
