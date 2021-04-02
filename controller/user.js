const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUser = async (req = request, res = response ) => {


    const { page = 1, limit = 10, apikey, from = 0 } = req.query;

    const query = { state: true };

    /*
    const usuarios = await User.find( query )
        .skip( Number( from ) )
        .limit( Number( limit) );

    const total = await User.countDocuments( query );
    */
    const [ total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( from ) )
            .limit( Number( limit) )
    ]);

    res.json({
        total, 
        users
    });
}

const postUser = async (req, res = response ) => {

    const { name, email, password, role } = req.body;    
    const user = new User({ name, email, password, role });

    // Encriptar passwrod
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    await user.save();

    res.json({
        user
    });

}

const putUser = async (req, res = response ) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...rest } = req.body;

    // Validar contra BBDD
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const userDB = await User.findByIdAndUpdate( id, rest) ;

    res.json({
        userDB
    });
}

const patchUser = (req, res = response ) => {

    res.json({
        msg: 'patch API - controller'
    });
}

const deleteUser = async (req, res = response ) => {

    const id = req.params.id;

    //const userDB = await User.findByIdAndDelete(id); // Elimina físicamente. 

    const userDB = await User.findByIdAndUpdate( id, { state: false } );

    res.json(
        userDB
    );
}

module.exports = {
    getUser
    , postUser
    , putUser
    , patchUser
    , deleteUser
}