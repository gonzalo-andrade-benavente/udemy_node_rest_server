const Role = require('../models/role');
const User = require('../models/user');

const validateRol = async ( role = '' ) => {

    const existsRole = await Role.findOne({ role });
        if ( !existsRole ) {
            throw new Error(`EL role ${ role } no esta registrado`)
        }

}

const validateEmail = async ( email = '' ) => {

    // Validar correo
    const existsEmail = await User.findOne({ email });

    if ( existsEmail ) {
        throw new Error(`EL correo ${ email } ya esta registrado`)
    } 

}

const validateUserById = async ( id = '' ) => {

    // Validar usuario
    const existsUser = await User.findById(id);

    if ( !existsUser ) {
        throw new Error(`EL usuario ${ id } no esta registrado`)
    } 

}

module.exports = { validateRol, validateEmail, validateUserById };
