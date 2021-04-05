const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateField');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateRole, haveRole } = require('../middlewares/validateRol');
const { validateRol, validateEmail, validateUserById } = require('../helpers/dbValidators');
const router = Router();

const { getUser, putUser, postUser, patchUser, deleteUser } = require('../controller/user');

router.get('/', getUser );

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( validateUserById ),
    validateFields
],putUser );

router.post('/', [ 
    check('name', 'El nombre no debe estar vacío').not().isEmpty(),
    check('password', 'El password debe ser al menos de 6 letras/números').isLength({ min:6 }),
    check('email', 'El correo no es válido').isEmail(),
    //check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom( validateEmail ), // == (role) => validateRol(rol)
    check('role').custom( validateRol ), // == (role) => validateRol(rol)
    validateFields
] ,postUser );

router.patch('/', patchUser );

router.delete('/:id', [
    validateJWT,
    //validateRole, 
    haveRole('ADMIN_ROLE', 'PRUEBA_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( validateUserById )
], deleteUser );

module.exports = router;