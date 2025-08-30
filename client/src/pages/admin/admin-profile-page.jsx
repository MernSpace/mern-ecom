import React, { Fragment, Suspense, lazy } from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const AdminProfile = lazy(() => import('../../components/admin/admin-profile'));
const AdminProfilePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <AdminProfile />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default AdminProfilePage;