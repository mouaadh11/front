'use client';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';
export default function Header(props) {
    const { SidbarOpen, setSidbarOpen } = useContext(GlobalContext);
    const {isRegisterPOpen} = useContext(GlobalContext);
    
    return (
        <header className='sticky top-0 z-999 w-full bg-[#e5f1fb] drop-shadow-md'>
            <div className='py-4 px-4 shadow-2 flex flex-row '>
                <h1 className='text-3xl font-bold mb-2 mt-2 text-gray-800 my-auto'>
                    {props.title}
                </h1>
                <div className='flex flex-grow items-center gap-2 justify-end'>
                    <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
                        <Button
                            function={() => {}}
                            title={SidbarOpen ? 'hide Sidbar' : 'show Sidbar'}
                        />
                    </div>

                    {props.buttons.map((button, index) => (
                        <Button
                            key={index}
                            handler={button.clickHandler}
                            title={button.buttonTitle}
                        />
                    ))}
                </div>
            </div>
        </header>
    );
}
