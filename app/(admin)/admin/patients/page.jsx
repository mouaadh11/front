import React from 'react';
import HeaderTitle from '../components/HeaderTitle';
import DataTable from './components/DataTable';

function page() {
    return (
        <div>
            <HeaderTitle title={'Patients'} />
            <div className='my-4'></div>
            <DataTable />
        </div>
    );
}

export default page;
