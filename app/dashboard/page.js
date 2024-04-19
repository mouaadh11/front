'use client';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import Header from '@/components/header';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { status } = useSession();

    const router = useRouter();

    setTimeout(() => {
        const token = Cookies.get('session');
        if (token) {
            console.log('from dashboard', token);
        } else {
            console.log('there is no token');
        }
    }, 100);

    const buttons = [
        {
            buttonTitle: 'Add New Device',
            clickHandler: () => {
                router.push('/device/information');
            },
        },
        {
            buttonTitle: 'Register New Patient',
            clickHandler: () => {
                router.push('/Patient/add');
            },
        },
    ];

    return (
        <>
            <Header
                title='Dashboard'
                buttons={buttons}
            />
            <div>
                <h1>APP Name</h1>
            </div>
        </>
    );
}
