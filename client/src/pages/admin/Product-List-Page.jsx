import React, { Fragment, Suspense, lazy } from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const ProductList = lazy(() => import('../../components/admin/product/Product-list'));
const ProductListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <ProductList />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductListPage;