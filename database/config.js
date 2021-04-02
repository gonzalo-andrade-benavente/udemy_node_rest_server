const mongoose = require('mongoose');

const dbConnection = async () => {
    
    try {

        await mongoose.connect( process.env.HOST_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online');

    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de inicar la BD');
    }
    
}


module.exports = {
    dbConnection
}