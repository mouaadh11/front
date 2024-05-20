import React from 'react';
import HeaderTitle from '../components/HeaderTitle';
import DataTable from './components/DataTable';

function page() {
    return (
        <div>
            <HeaderTitle title={'Devices'} />
            <DataTable />
        </div>
    );
}

export default page;
