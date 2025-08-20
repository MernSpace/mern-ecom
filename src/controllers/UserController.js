const UserModel = require("../models/UserModel");
const { UserOTPService, VerifyOTPService, SaveProfileService, ReadProfileService } = require("../services/UserServices");
const bcrypt = require('bcrypt');
const { EncodeToken } = require("../utility/TokenHelper");


exports.RegisterUser = async (req, res) => {
    try {
        let { email, name, password } = req.body;
        if (!email || !name || !password) {
            res.status(400).json({ status: "fail", message: "All Field are required!" })
        }

        let existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            res.status(400).json({ status: "fail", message: "User already exist with this email!" })
        }

        // Hash password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        let newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        // Respond success
        res.status(201).json({ status: "success", message: "User registered successfully!" });

    } catch (e) {
        res.status(400).json({ status: "Fail", message: "Something went wrong!" })
    }
}

exports.login = async (req, res) => {
    try {

        // Step 1: Extract email and password from the body
        let { email, password } = req.body;

        // Step 2: Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({ status: "fail", message: "Email and password are required!" });
        }

        // Step 3: Find the user in the database by email
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found!" });
        }

        // Step 4: Check if the password is correct (you can use bcrypt here for hashing comparison)
        // Assuming password is stored hashed, so we use bcrypt.compare to check
        const bcrypt = require('bcrypt');
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ status: "fail", message: "Invalid password!" });
        }

        // Step 6: OTP is valid, create a token
        let user_id = user._id.toString();
        let token = EncodeToken(email, user_id);

        // Step 8: Set the token in a cookie (optional settings for the cookie)
        let cookieOption = { expires: new Date(Date.now() + 24 * 6060 * 1000), httpOnly: false };
        res.cookie('token', token, cookieOption);

        // Return success with the token
        return res.status(200).json({ status: "success", message: "OTP verified successfully", token: token });

    } catch (e) {
        res.status(400).json({ status: "Fail", message: "Something went wrong!" })
    }
}


exports.UserOTP = async (req, res) => {
    let result = await UserOTPService(req)
    return res.status(200).json(result)
}


exports.VerifyLogin = async (req, res) => {
    let result = await VerifyOTPService(req)

    if (result['status'] === "success") {

        // Cookies Option
        let cookieOption = { expires: new Date(Date.now() + 24 * 6060 * 1000), httpOnly: false }

        // Set Cookies With Response
        res.cookie('token', result['token'], cookieOption)
        return res.status(200).json(result)

    } else {
        return res.status(200).json(result)
    }
}


exports.UserLogout = async (req, res) => {
    let cookieOption = { expires: new Date(Date.now() - 24 * 6060 * 1000), httpOnly: false }
    res.cookie('token', "", cookieOption)
    return res.status(200).json({ status: "success" })
}


exports.CreateProfile = async (req, res) => {
    let result = await SaveProfileService(req)
    return res.status(200).json(result)
}


exports.UpdateProfile = async (req, res) => {
    let result = await SaveProfileService(req)
    return res.status(200).json(result)
}


exports.ReadProfile = async (req, res) => {
    let result = await ReadProfileService(req)
    return res.status(200).json(result)
}

