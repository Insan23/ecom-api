import express from 'express';
import User from '../model/User.js';

const router = express.Router();

// ambil semua data user (untuk admin sepertinya)
router.get('/', async(req, res) => {
    const users = await User.find();
    res.json(users);
});

// buat user baru, register
router.post('/', async(req, res) => {
    //TODO LOGIKA TAMBAH USER BARU
});

// ambil satu data user, untuk login, mencocokkan user pw dengan data di database
router.get('/:id', async(req, res) => {
    //TODO LOGIKA LOGIN
});

// update data user
router.put('/:id', async(req, res) => {
    //TODO LOGIKA UPDATE USER
});

export default router;