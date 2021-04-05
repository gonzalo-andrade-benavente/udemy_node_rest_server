const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth');
const { validateFields } = require('../middlewares/validateField');

const router = Router();

router.post('/login', [
    check( 'correo', 'El correo es obligatorio').isEmail(),
    check( 'password', 'La contraseña es obligatorio').not().isEmpty(),
    validateFields 
] , login );

module.exports = router;