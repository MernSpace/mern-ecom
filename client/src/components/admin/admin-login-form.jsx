import React from 'react';
import UserSubmitButton from "../user/UserSubmitButton.jsx";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AdminStore from '../../store/AdminStore.js'
const AdminLoginForm = () => {
    let navigate = useNavigate();
    let { adminLoginFormData, adminLoginFormOnChange, AdminLoginRequest } = AdminStore();

    const onFormSubmit = async () => {
        if (!ValidationHelper.IsEmail(adminLoginFormData.email)) {
            toast.error("Valid Email Address Required");
        } else if (!adminLoginFormData.password) {
            toast.error("Password is required!");
        } else {
            let res = await AdminLoginRequest(adminLoginFormData.email, adminLoginFormData.password);
            if (res) {
                toast.success("Login Success!");
                navigate("/dashboard"); // Redirect user after successful login
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        }
    };

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card p-4 shadow-sm">
                        <h4 className="text-center mb-4">Login to Your Account</h4>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                value={adminLoginFormData.email}
                                onChange={(e) => { adminLoginFormOnChange("email", e.target.value) }}
                                placeholder="Enter your email"
                                type="email"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                value={adminLoginFormData.password}
                                onChange={(e) => { adminLoginFormOnChange("password", e.target.value) }}
                                placeholder="********"
                                type="password"
                                className="form-control"
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <UserSubmitButton
                                onClick={onFormSubmit}
                                className="btn btn-success"
                                text="Login"
                            />
                        </div>

                        <div className="mt-3 text-center">
                            <p className="small text-muted">Don't have an account? <Link to="/register">Register here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginForm;
