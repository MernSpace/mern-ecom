import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminProductStore from "../../../store/AdminProductStore.js";

// Skeleton Loader (Bootstrap style)
const ProductTableSkeleton = () => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped">
                <thead className="table-light">
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Remark</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, i) => (
                        <tr key={i}>
                            <td>
                                <div
                                    className="bg-secondary placeholder col-6 rounded"
                                    style={{ height: "50px", width: "50px" }}
                                ></div>
                            </td>
                            <td>
                                <span className="placeholder col-8"></span>
                            </td>
                            <td>
                                <span className="placeholder col-4"></span>
                            </td>
                            <td>
                                <span className="placeholder col-3"></span>
                            </td>
                            <td>
                                <span className="placeholder col-4"></span>
                            </td>
                            <td>
                                <span className="placeholder col-6"></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ProductList = () => {
    const { ProductList, ProductListRequest } = AdminProductStore();

    useEffect(() => {
        const fetchData = async () => {
            await ProductListRequest();
        };
        fetchData();
    }, []);

    if (ProductList === null) {
        return <ProductTableSkeleton />;
    }

    return (
        <div className="table-responsive mt-3">
            <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Remark</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {ProductList.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: "60px", height: "60px", objectFit: "contain" }}
                                />
                            </td>
                            <td>
                                <Link to={`/products/${item._id}`} className="text-decoration-none fw-bold">
                                    {item.title}
                                </Link>
                            </td>
                            <td>
                                {item.discount ? (
                                    <span>
                                        <strike className="text-danger">${item.price}</strike>{" "}
                                        <strong className="text-success">${item.discountPrice}</strong>
                                    </span>
                                ) : (
                                    `$${item.price}`
                                )}
                            </td>
                            <td>
                                {item.stock ? (
                                    <span className="badge bg-success">In Stock</span>
                                ) : (
                                    <span className="badge bg-danger">Out of Stock</span>
                                )}
                            </td>
                            <td>{item.remark}</td>
                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
