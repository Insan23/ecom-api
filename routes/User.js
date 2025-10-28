import express from 'express';
import User from '../model/User.js';

const router = express.Router();

// ambil semua data user (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// buat user baru, register
router.post('/', async (req, res) => {
    const { username, name, password, email, address } = req.body;
    const userInsert = new User({
        username: username,
        name: name,
        password: password,
        email: email,
        address: address
    });
    const insert = await userInsert.save();
    res.json(insert);
});

// ambil satu data user, untuk login, mencocokkan user pw dengan data di database
router.get('/:id', async (req, res) => {
    const users = await User.findById(req.params.id);
    res.status(200).send({
        'status': true,
        'data': users
    });
});

// update data user
router.put('/:id', async (req, res) => {
    const users = await User.findByIdAndUpdate(req.params.id, req.body,{})
    res.status(200).send({
        'status': true,
        'data': users
    });
});

export default router;