import { useEffect } from "react";
import AdminProductStore from "../../../store/AdminProductStore.js";
import { Link } from "react-router-dom";

const ProductDetail = ({ id }) => {
    const { ProductDetail, ProductDetailRequest } = AdminProductStore();

    useEffect(() => {
        if (id) {
            ProductDetailRequest(id);
        }
    }, [id]);

    if (!ProductDetail) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-lg p-4">
                <div className="row">
                    {/* Product Image */}
                    <div className="col-md-4 text-center">
                        <img
                            src={ProductDetail.image}
                            alt={ProductDetail.title}
                            className="img-fluid rounded"
                            style={{ maxHeight: "250px", objectFit: "contain" }}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="col-md-8">
                        <h3>{ProductDetail.title}</h3>
                        <p className="text-muted">{ProductDetail.shortDes}</p>

                        {/* Price */}
                        <h5>
                            {ProductDetail.discount ? (
                                <>
                                    <span className="text-danger me-2">
                                        <strike>${ProductDetail.price}</strike>
                                    </span>
                                    <span className="text-success fw-bold">
                                        ${ProductDetail.discountPrice}
                                    </span>
                                </>
                            ) : (
                                <span>${ProductDetail.price}</span>
                            )}
                        </h5>

                        {/* Stock */}
                        <p>
                            {ProductDetail.stock ? (
                                <span className="badge bg-success">In Stock</span>
                            ) : (
                                <span className="badge bg-danger">Out of Stock</span>
                            )}
                        </p>

                        {/* Remark */}
                        <p>
                            <strong>Remark:</strong> {ProductDetail.remark}
                        </p>

                        {/* Created Date */}
                        <p className="text-muted small">
                            Added on: {new Date(ProductDetail.createdAt).toLocaleDateString()}
                        </p>

                        {/* Back Button */}
                        <Link to="/products" className="btn btn-outline-secondary mt-2">
                            ← Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
