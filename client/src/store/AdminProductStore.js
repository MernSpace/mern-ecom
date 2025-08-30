import { create } from 'zustand';
import axios from "axios";

const AdminProductStore = create((set) => ({
    ProductList: null,
    ProductListRequest: async () => {
        let res = await axios.get(`/api/v1/get-product`);
        if (res.data['status'] === "success") {
            console.log(res)
            set({ ProductList: res.data['data'] })
        }
    },
    ProductDetail: null,
    ProductDetailRequest: async (Id) => {
        let res = await axios.get(`/api/v1/get-product-detail/${Id}`);
        if (res.data['status'] === "success") {
            console.log(res)
            set({ ProductDetail: res.data['data'] })
        }
    }
}))

export default AdminProductStore;