import React from 'react';
import UserSubmitButton from "../user/UserSubmitButton.jsx";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AdminStore from '../../store/AdminStore.js';

const AdminRegisterForm = () => {
    let { AdminRegisterFormData, AdminRegisterFormOnChange, AdminRegisterRequest } = AdminStore();
    let navigate = useNavigate();

    const onFormSubmit = async () => {
        if (ValidationHelper.IsEmpty(AdminRegisterFormData.name)) {
            toast.error("Name is Required!");
        } else if (ValidationHelper.IsEmpty(AdminRegisterFormData.email)) {
            toast.error("Email is required!");
        } else if (ValidationHelper.IsEmpty(AdminRegisterFormData.password)) {
            toast.error("Password is required!");
        } else {
            let res = await AdminRegisterRequest(AdminRegisterFormData.name, AdminRegisterFormData.email, AdminRegisterFormData.password, AdminRegisterFormData.phone);
            if (res) {
                toast.success("Register Success!");
                navigate("/");
            }
        }
    };

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card p-4 shadow-sm">
                        <h4 className="text-center mb-4">Register</h4>
                        <p className="text-center mb-4">Create a new account</p>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                id="name"
                                value={AdminRegisterFormData.name}
                                onChange={(e) => { AdminRegisterFormOnChange("name", e.target.value) }}
                                placeholder="Enter your name"
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                value={AdminRegisterFormData.email}
                                onChange={(e) => { AdminRegisterFormOnChange("email", e.target.value) }}
                                placeholder="Enter your email"
                                type="email"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Phone</label>
                            <input
                                id="phone"
                                value={AdminRegisterFormData.phone}
                                onChange={(e) => { AdminRegisterFormOnChange("phone", e.target.value) }}
                                placeholder="Enter your Phone"
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                value={AdminRegisterFormData.password}
                                onChange={(e) => { AdminRegisterFormOnChange("password", e.target.value) }}
                                placeholder="********"
                                type="password"
                                className="form-control"
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <UserSubmitButton
                                onClick={onFormSubmit}
                                submit={false}
                                className="btn btn-success"
                                text="Register"
                            />
                        </div>

                        <div className="mt-3 text-center">
                            <p className="small text-muted">Already have an account? <Link to="/login">Login here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegisterForm;
