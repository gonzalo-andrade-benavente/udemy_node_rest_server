const { response } = require("express")
const bcriptjs = require('bcryptjs');

const User = require('../models/user');
const generateJWT = require('../helpers/generateJWT');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne( { email: correo } );
        if ( !user ) {
            // Bad request.
            return res.status(400).json({
                msg: 'Usuario / Password incorrecto - correo'
            });
        }
        // Verificar si el usuario esta activo en la BBDD
        if ( user.status === false ) {
            return res.status(404).json({ 
                msg: 'Usuario / Password incorrecto - estado === false'
            });
        }
        // Validar el pass
        const validPass = bcriptjs.compareSync( password, user.password);
        if ( !validPass ) {
            return res.status(404).json({ 
                msg: 'Usuario / Password incorrecto - password'
            });

        }
        // Enviar el JWT
        const jwt = await generateJWT( user._id);

        res.json({
            msg: 'login ok',
            user,
            jwt
        });

    } catch (err) {
        console.log('Algo salio mal! ', err);
        // Error
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login
}