const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5050; // Change to your desired port
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDB')
// User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String // Note: Store passwords as plain text (not secure)
});

const User = mongoose.model('User', userSchema);

// Route for registration
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({ name, email, password }); // Store password as plain text
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if the password matches (simple comparison)
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const orderSchema = new mongoose.Schema({
    customerName: String,
    customerAddress: String,
    items: Array,
    totalAmount: Number,
    orderDate: String,
    orderId: Number
});

const Order = mongoose.model('Order', orderSchema);

// API to confirm payment
app.post('/api/confirm-payment', (req, res) => {
    const orderData = req.body;

    const newOrder = new Order({
        customerName: orderData.customerName,
        customerAddress: orderData.customerAddress,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        orderDate: orderData.orderDate,
        orderId: orderData.orderId
    });

    newOrder.save()
        .then(() => res.status(200).json({ message: 'Order confirmed!' }))
        .catch((error) => res.status(500).json({ error: 'Failed to confirm order.' }));
});



// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
