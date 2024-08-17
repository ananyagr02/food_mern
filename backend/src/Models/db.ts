import mongoose from 'mongoose';

const mongo_url = process.env.MONGO_CONN as string;

mongoose.connect(mongo_url) // returns a promise
    .then(() => {
        console.log('mongodb connected');
    }).catch((err: Error) => {
        console.log('mongo connection error ', err);
    });
