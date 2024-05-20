import React from 'react';
import HeaderTitle from '../components/HeaderTitle';
import DataTable from './components/DataTable';
import AddDoctorSideSheet from './components/AddSheet';

function page() {
    return (
        <div>
            <HeaderTitle title={'Doctors'} />

            <DataTable />
        </div>
    );
}

export default page;
