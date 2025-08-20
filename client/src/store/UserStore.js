import { create } from 'zustand';
import axios from "axios";
import { getEmail, setEmail, unauthorized } from "../utility/utility.js";
import Cookies from "js-cookie";
const UserStore = create((set) => ({

    isLogin: () => {
        return !!Cookies.get('token');
    },

    LoginFormData: { email: "", password: "" },
    LoginFormOnChange: (name, value) => {
        set((state) => ({
            LoginFormData: {
                ...state.LoginFormData,
                [name]: value
            }
        }))
    },
    UserLoginRequest: async (email, password) => {
        set({ isFormSubmit: true })
        let res = await axios.post(`/api/v1/login`, {
            email: email,
            password: password
        });
        setEmail(email);
        set({ isFormSubmit: false })
        return res.data['status'] === "success";
    },


    UserLogoutRequest: async () => {
        set({ isFormSubmit: true })
        let res = await axios.get(`/api/v1/UserLogout`);
        set({ isFormSubmit: false })
        return res.data['status'] === "success";
    },



    RegisterFormData: { name: "", email: "", password: "" },
    RegisterFormOnChange: (name, value) => {
        set((state) => ({
            RegisterFormData: {
                ...state.RegisterFormData,
                [name]: value
            }
        }))
    },
    UserRegisterRequest: async (name, email, password) => {
        set({ isFormSubmit: true })
        let res = await axios.post(`/api/v1/register-user`, {
            name: name,
            email: email,
            password: password
        });
        set({ isFormSubmit: false })
        return res.data['status'] === "success";
    },
    isFormSubmit: false,






    ProfileForm: { cus_add: "", cus_city: "", cus_country: "", cus_fax: "", cus_name: "", cus_phone: "", cus_postcode: "", cus_state: "", ship_add: "", ship_city: "", ship_country: "", ship_name: "", ship_phone: "", ship_postcode: "", ship_state: "" },
    ProfileFormChange: (name, value) => {
        set((state) => ({
            ProfileForm: {
                ...state.ProfileForm,
                [name]: value
            }
        }))
    },


    ProfileDetails: null,
    ProfileDetailsRequest: async () => {
        try {
            let res = await axios.get(`/api/v1/ReadProfile`);
            if (res.data['data'].length > 0) {
                set({ ProfileDetails: res.data['data'][0] })
                set({ ProfileForm: res.data['data'][0] })
            } else {
                set({ ProfileDetails: [] })
            }
        } catch (e) {
            unauthorized(e.response.status)
        }
    },

    ProfileSaveRequest: async (PostBody) => {
        try {
            set({ ProfileDetails: null })
            let res = await axios.post(`/api/v1/UpdateProfile`, PostBody);
            return res.data['status'] === "success";
        } catch (e) {
            unauthorized(e.response.status)
        }
    }


}))

export default UserStore;