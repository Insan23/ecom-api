const {MongoClient, ObjectId} = require('mongodb');

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
         * SQL      |   noSQL (mongodb)
         * Tabel    |   collection
         * row data |   document
         */

        const query = {nama: 'bagus'};

        const satuUser = await userCollection.findOne(query)

        const satuAtauBanyakUser = await userCollection.find({nama: 'bagus'});

        //syntax untuk update collection
        /*
        const updateUser = await userCollection.updateOne(
            {_id: new ObjectId('68fccedc0f69cd3fee26f402')},
            {$set: { nama: "aldi", alamat: "surabaya" }},
            {upsert: true}, // update or insert
        );
         */
        //syntax untuk insert
        // const insertData = await userCollection.insertOne(
        //     {nama: 'bagus', alamat: 'magetan'}
        // );
        // const insertData = await userCollection.insertMany([
        //     {nama: 'bagus', alamat: 'magetan'},
        //     {nama: 'aldi', alamat: 'jabar'},
        //     {nama: 'faruq', alamat: 'jateng'}
        // ]);

        //syntax untuk delete
        const deleteData = await userCollection.deleteMany({alamat: 'magetan'});

        // for await (const sat of satuAtauBanyakUser) {
            // console.log(sat);
        //     console.log(sat['_id']);
        // }
        // console.log(satuUser);
        // console.log(updateUser);
        console.log(deleteData);
    } finally {
        await dbServer.close();
    }
}

runGetStarted().catch(console.dir);