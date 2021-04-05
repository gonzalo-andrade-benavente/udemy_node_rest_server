const { response } = require("express");

const validateRole = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'se requiere validar el role sin validar el token primero'
        });
    }

    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${ name } no tiene es Admin `
        });
    }

    next();

}

const haveRole = ( ...roles ) => {

    return ( req, res = response, next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'se requiere validar el role sin validar el token primero'
            });
        }

        if ( !roles.includes(req.user.role) ) {
            return res.status(401).json({
                msg: `El usuario ${ name } no tiene cumple alguno de los roles ${ roles } `
            });
        }
        next();
    }

}

module.exports = { validateRole, haveRole };