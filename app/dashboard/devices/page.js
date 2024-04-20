'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';

export default function Device() {
    const [devices, setDevices] = useState([]); // State to store fetched devices
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null); // State to handle errors
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const [selectedDevice, setselectedDevice] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchDevices = async () => {
            setIsLoading(true); // Set loading state to true
            setError(null); // Clear any previous errors

            try {
                const response = await fetch('/api/devices'); // Adjust API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch devices');
                }
                const data = await response.json();
                setDevices(data);
                console.log(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false); // Set loading state to false after fetch (success or error)
            }
        };

        fetchDevices();
    }, []);
    const buttons = [
        {
            buttonTitle: 'Configure a New Device',
            clickHandler: () => {
                // router.push('/device/information');
                console.log("worked")
            },
        },
    ];
    const toggleAside = (device) => {
        if (!selectedDevice || selectedDevice.deviceId === device.deviceId) {
            // Toggle aside bar if clicking the same device ID
            setIsAsideOpen(!isAsideOpen);
        } else {
            setselectedDevice(device);
            setIsAsideOpen(true); // Open the aside bar for the new patient
        }
    };
    return (
        <>
            <Header
                title='Activated Devices'
                buttons={buttons}
            />
            <div className='w-full h-full max-w-full '>
                <div className='w-full bg-white py-4 px-6'>
                    {isLoading && (
                        <p className='text-gray-600'>Loading devices...</p>
                    )}
                    {error && <p className='text-red-600'>Error: {error}</p>}
                    {devices.length > 0 ? (
                        <ul className='w-full rounded-lg h-auto '>
                            {devices.map((device) => (
                                <button
                                    className='w-full'
                                    key={device.deviceId}
                                    onClick={() => {
                                        toggleAside(device);
                                    }}
                                >
                                    <li className='py-4 px-4 border-b border-blue-100 flex flex-row justify-between hover:bg-gray-100 rounded-s-sm'>
                                        <div className='infromation'>
                                            <span className=' text-left block text-lg font-bold text-gray-800 mb-1'>
                                                Owner:
                                                <span className='text-gray-600 font-semibold ml-2'>
                                                    {device.username}
                                                </span>
                                            </span>
                                            <span className='text-gray-600 font-semibold mr-6'>
                                                Device ID:
                                                <span className='text-gray-600 font-normal ml-2'>
                                                    {device.deviceId}
                                                </span>
                                            </span>
                                            <span className='text-gray-600 font-semibold mr-6'>
                                                Activated Date:
                                                <span className='text-gray-600 font-normal ml-2'>
                                                    {device.activationDate}
                                                </span>
                                            </span>
                                        </div>
                                    </li>
                                </button>
                            ))}
                        </ul>
                    ) : (
                        <p className='mt-4 text-gray-600'>No devices found.</p>
                    )}
                </div>
                <div
                    className={`relative w-full h-full  px-6 py-4 bg-white text-black ${
                        !isAsideOpen ? 'hidden' : ''
                    }`}
                >
                    <h1>Hello</h1>
                    <button
                        className='close-btn absolute top-0 right-0 mr-6 bg-[#0374db] hover:bg-[#fb7c32] px-4 py-2 rounded text-white font-semibold mt-4'
                        onClick={() => setIsAsideOpen(false)}
                    >
                        X
                    </button>
                </div>
            </div>
        </>
    );
}
