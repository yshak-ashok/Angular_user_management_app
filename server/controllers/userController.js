const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//userRegister
const userRegistration = async (req, res) => {
    try {
        console.log('registration here');
        const { name, email,phone,password } = req.body;
        const user = await User({
            name: name,
            email: email,
            phone:phone,
            password: password,
        });
        user.save();
        res.json(user);
    } catch (err) {
        console.error(err);
    }
};

//userLogin
const userLogin = async (req, res) => {
    try {
        console.log('login server');
        const { email, password } = req.body;
        const user = { email: email };
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        // Checking the user is avaliable
        const userData = await User.find({ email: email, password: password });
        if (userData && userData.length > 0) {
            const userInfo = {
                _id: userData[0]._id,
                name: userData[0].name,
                email: userData[0].email,
                role: userData[0].role,
                image: userData[0].image,
            };
            res.status(200).json([userInfo,token]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
    }
};


const uploadImage = async (req, res) => {
    try {
        console.log('user here image',req?.user);
        const { id } = req.body;
        console.log('userid',id);
        const imgName = req.file.originalname;
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    image: `http://localhost:5000/${imgName}`,
                },
            },
            { new: true },
        );
        if (user) {
            console.log(user);
            const profileImage = user.image;
            res.status(200).json(profileImage);
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};


// Duplicate Email while registering
const duplicateEmail = async (req, res) => {
    try {
        console.log('haiii duplicate email');
        const email = req.query.email;
        console.log(email);
        const userExists = await User.find({ email: email });
        res.json(userExists);
    } catch (error) {
        console.log(error.message);
    }
};
module.exports = { userRegistration, userLogin,uploadImage,duplicateEmail };
