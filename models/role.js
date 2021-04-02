const { Schema, model } = require('mongoose');

const roleSchema = Schema({

    role: {
        type: String,
        required: [true, 'El nrole es obligatorio']
    }

});

module.exports = model( 'Role', roleSchema );