import React, { Fragment, Suspense, lazy } from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import { useParams } from 'react-router-dom';
const ProductDetail = lazy(() => import('../../components/admin/product/Product-detail'));
const ProductDetailPage = () => {
    const { id } = useParams();

    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <ProductDetail id={id} />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductDetailPage;