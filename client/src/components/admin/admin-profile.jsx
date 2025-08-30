import React, { useEffect, useRef } from "react";
import { ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile } from "../../utility/FormHelper.js";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../utility/SessionHelper.js";
import AdminStore from "../../store/AdminStore.js";

const AdminProfile = () => {
    const navigate = useNavigate();

    // ✅ Zustand store functions & state
    const {
        AdminRegisterFormData,
        AdminRegisterFormOnChange,
        AdminProfileUpdateRequest,
    } = AdminStore();

    // ✅ Logged in user data
    const ProfileData = getUserDetails();

    // ✅ Ref for image input and initialization tracking
    const userImgRef = useRef();
    const userImgView = useRef();
    const isInitialized = useRef(false);

    // ✅ Initialize form with profile data on component mount
    useEffect(() => {
        if (ProfileData && !isInitialized.current) {
            AdminRegisterFormOnChange("email", ProfileData.email || "");
            AdminRegisterFormOnChange("name", ProfileData.name || "");
            AdminRegisterFormOnChange("phone", ProfileData.phone || "");
            AdminRegisterFormOnChange("photo", ProfileData.photo || "");
            isInitialized.current = true;
        }
    }, [ProfileData]); // Removed AdminRegisterFormOnChange from dependencies

    const PreviewImage = () => {
        const ImgFile = userImgRef.current.files[0];
        if (ImgFile) {
            getBase64(ImgFile).then((base64Img) => {
                userImgView.current.src = base64Img;
                AdminRegisterFormOnChange("photo", base64Img); // ✅ Save to store
            }).catch((error) => {
                ErrorToast("Error processing image file");
                console.error("Image processing error:", error);
            });
        }
    };

    const UpdateMyProfile = async () => {
        const { email, name, phone, photo } = AdminRegisterFormData;

        // ✅ Validation
        if (IsEmpty(email)) {
            ErrorToast("Valid Email Address Required!");
        }
        else if (IsEmpty(name)) {
            ErrorToast("Name Required!");
        } else if (!IsMobile(phone)) {
            ErrorToast("Valid Mobile Required!");
        } else {
            try {
                let res = await AdminProfileUpdateRequest(
                    ProfileData._id,
                    name,
                    email,
                    phone,
                    photo
                );
                if (res) {
                    navigate("/dashboard");
                }
            } catch (error) {
                ErrorToast("Error updating profile. Please try again.");
                console.error("Profile update error:", error);
            }
        }
    };

    // ✅ Add loading state check
    if (!ProfileData) {
        return <div className="container">Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img
                                    ref={userImgView}
                                    className="icon-nav-img-lg"
                                    src={AdminRegisterFormData?.photo || ProfileData?.photo || "/default-avatar.png"}
                                    alt="Profile"
                                    onError={(e) => {
                                        e.target.src = "/default-avatar.png";
                                    }}
                                />
                                <hr />
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input
                                            onChange={PreviewImage}
                                            ref={userImgRef}
                                            className="form-control animated fadeInUp"
                                            type="file"
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input
                                            value={AdminRegisterFormData?.email || ""}
                                            onChange={(e) =>
                                                AdminRegisterFormOnChange("email", e.target.value)
                                            }
                                            className="form-control animated fadeInUp"
                                            type="email"
                                        />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Name</label>
                                        <input
                                            value={AdminRegisterFormData?.name || ""}
                                            onChange={(e) =>
                                                AdminRegisterFormOnChange("name", e.target.value)
                                            }
                                            className="form-control animated fadeInUp"
                                            type="text"
                                        />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Phone</label>
                                        <input
                                            value={AdminRegisterFormData?.phone || ""}
                                            onChange={(e) =>
                                                AdminRegisterFormOnChange("phone", e.target.value)
                                            }
                                            className="form-control animated fadeInUp"
                                            type="text"
                                        />
                                    </div>
                                    <div className="col-4 p-2">
                                        <button
                                            onClick={UpdateMyProfile}
                                            className="w-100 btn btn-success"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;