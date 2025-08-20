import React from 'react';
import UserSubmitButton from "./UserSubmitButton.jsx";
import UserStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
    let { RegisterFormData, RegisterFormOnChange, UserRegisterRequest } = UserStore();
    let navigate = useNavigate();

    const onFormSubmit = async () => {
        if (ValidationHelper.IsEmpty(RegisterFormData.name)) {
            toast.error("Name is Required!");
        } else if (ValidationHelper.IsEmpty(RegisterFormData.email)) {
            toast.error("Email is required!");
        } else if (ValidationHelper.IsEmpty(RegisterFormData.password)) {
            toast.error("Password is required!");
        } else {
            let res = await UserRegisterRequest(RegisterFormData.name, RegisterFormData.email, RegisterFormData.password);
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
                                value={RegisterFormData.name}
                                onChange={(e) => { RegisterFormOnChange("name", e.target.value) }}
                                placeholder="Enter your name"
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                value={RegisterFormData.email}
                                onChange={(e) => { RegisterFormOnChange("email", e.target.value) }}
                                placeholder="Enter your email"
                                type="email"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                value={RegisterFormData.password}
                                onChange={(e) => { RegisterFormOnChange("password", e.target.value) }}
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

export default RegisterForm;
