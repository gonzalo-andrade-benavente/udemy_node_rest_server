const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }, 
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    }, 
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    }, 
    image: {
        type: String
    }, 
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }, 
    state: {
        type: Boolean,
        default: true
    }, 
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() { //Función normal.
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema );