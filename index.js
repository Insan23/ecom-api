import 'dotenv/config';
import mongoose from 'mongoose';
import express, {response} from 'express'; // kalo import library tanpa ketik .js
import userRoutes from './routes/User.js'; // kalo import file js dari milik sendiri, ketik .js nya

// inisialisasi express app, untuk REST API, yang berhubungan dengan operasi http request
const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

// middleware untuk parsing/mengelola json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// koneksi ke mongodb server
mongoose.connect(`${uri}/${dbName}`)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// ketik semua api endpoint disini
app.use('/api/user', userRoutes);

// testing api endpoint, bisa dicek di browser (atau aplikasi postman)
// dan ketik localhost:4000/api/status
app.get('/api/status', async (req, res) => {
    res.send({
        "status": "koneksi berhasil",
    });
});
// contoh kirim data dengan http status code (https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
app.get('/api/status-v2', async (req, res) => {
    res.status(500).send({
        "status": "koneksi berhasil dengan status 500",
    });
});

// inisiasi REST API server
app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
});