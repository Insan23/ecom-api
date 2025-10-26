import {MongoClient, ObjectId} from 'mongodb';

async function runGetStarted() {
    const dbServer = new MongoClient('mongodb://localhost:27017');
    try {
        const db = dbServer.db('testing-db');
        //di SQL namanya tabel
        const userCollection = db.collection('user');

        // await userCollection.insertOne({
        //     nama: "bagus",
        //     alamat: "magetan",
        //     umur: 20
        // });
        /**
         * SQL          |   noSQL (mongodb)
         * Tabel        |   collection
         * baris data   |   document
         */

            //query adalah untuk memfilter data yang akan di ambil(query), dihapus(delete), atau diubah(update)
        const query = {nama: 'bagus'};

        //syntax untuk membaca satu data
        const satuUser = await userCollection.findOne(query);

        //syntax untuk membaca (banyak) data
        const satuAtauBanyakUser = await userCollection.find({nama: 'bagus'});
        //lalu untuk menampilkan data, pakai looping
        for await (const perData of satuAtauBanyakUser) {
            console.log(perData); //satu dokumen
            console.log(perData['_id']); //satu kolom
            console.log(perData['nama']); //satu kolom
            console.log(perData['alamat']); //satu kolom
        }

        //syntax untuk update data
        //hanya akan mengupdate satu data, meskipun data yang di filter akan menampilkan banyak data
        const updateUser = await userCollection.updateOne(
            {alamat: "magetan"},
            {$set: {nama: "aldi", alamat: "surabaya"}},
            {upsert: true}, // update or insert, parameter opsional, boleh kosong
            //upsert akan mengupdate data, jika data yang di-filter terdapat
            //di database, jika tidak ada, maka insert data
        );
        console.log(updateUser); //output status operasi updateOne
        //juga tersedia update many
        // userCollection.updateMany()

        //syntax untuk insert
        const insertSatuData = await userCollection.insertOne(
            {nama: 'bagus', alamat: 'magetan'}
        );
        console.log(insertSatuData); //output status operasi insertOne
        const insertBanyakData = await userCollection.insertMany([
            {nama: 'bagus', alamat: 'magetan'},
            {nama: 'aldi', alamat: 'jabar'},
            {nama: 'faruq', alamat: 'jateng'}
        ]);
        console.log(insertBanyakData); //output status operasi insert many

        //syntax untuk delete
        const deleteData = await userCollection.deleteMany({alamat: 'magetan'});
        console.log(deleteData); //output status operasi delete
    } catch (e) {
    } finally {
        await dbServer.close();
    }
}

runGetStarted().catch(console.dir);