const HeaderTitle = ({ title }) => {
    return (
        <div className='bg-gray-800 py-4 px-6 flex items-center justify-between'>
            <h1 className='text-white text-xl font-semibold'>{title}</h1>
        </div>
    );
};

export default HeaderTitle;
