import express from 'express';
import User from '../model/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) { //jika email pass kosong, nanti dicek juga di aplikasi
        res.status(404).send({})
    }
    const result = await User.findOne({ $and:
            [{ email: email }, { password: password }]
    });
    if (!result) {
        return res.status(404).send({'status': 'user not found'});
    } else {
        return res.status(200).send(result);
    }
});

// ambil semua data user (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const users = await User.find();
    return res.status(200).send(users);
    // res.json(users);
});

// buat user baru, register
router.post('/', async (req, res) => {
    const { username, password, email } = req.body;
    console.log(req.body);
    const userInsert = new User({
        username: username,
        password: password,
        email: email,
    });
    const insert = await userInsert.save();
    console.log(insert);
    return res.status(200).send(insert);
    // res.json(insert);
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