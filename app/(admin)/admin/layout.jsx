import Sidebar from './components/SideBar';

export default function RootLayout({ children }) {
    return (
        <div>
            {/* Side Bar */}
            <Sidebar />
            {/* children */}
            <div className='pl-64 '>
                <div className='p-5'>{children}</div>
            </div>
        </div>
    );
}
