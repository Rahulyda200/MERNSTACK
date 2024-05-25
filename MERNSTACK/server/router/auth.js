const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send('HELLO WORLD r');
});

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: 'Please register complete details' });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: 'Email already exists' });
        } else if (password !== cpassword) {
            return res.status(422).json({ message: 'Passwords do not match' });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to register' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please fill in the data' });
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            });

            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            } else {
                return res.status(200).json({ message: 'User signed in successfully' });
            }
        } else {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/about', authenticate, (req, res) => {
    console.log('Hello, my about');
    res.send(req.rootUser);
});

router.get('/getdata', authenticate, (req, res) => {
    console.log('Hello, my about');
    res.send(req.rootUser);
});

router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log('Error in contact form: Missing required fields');
            return res.status(400).json({ error: 'Please fill in all the contact form fields' });
        }

        const userContact = await User.findById(req.rootUser._id);

        if (!userContact) {
            console.log('Error in contact form: User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const userMessage = await userContact.addMessage(name, email, phone, message);
        await userContact.save();

        res.status(201).json({ message: 'User contact successful' });
    } catch (err) {
        console.error('Error in contact form:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/save-profile', authenticate, async (req, res) => {
    try {
        const { name, email, phone, work } = req.body;

        if (!name || !email || !phone || !work) {
            return res.status(422).json({ error: 'Please provide complete details' });
        }

        const user = await User.findById(req.rootUser._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.phone = phone;
        user.work = work;
        

        await user.save();

        res.status(200).json({ message: 'Profile saved successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/logout', (req, res) => {
    console.log('Hello, my logout page');
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User logged out');
});

module.exports = router;
