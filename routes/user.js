const { Router } = require('express');

const router = Router();

const { getUser, putUser, postUser, patchUser, deleteUser } = require('../controller/user');

router.get('/', getUser );

router.put('/:id', putUser );

router.post('/', postUser );

router.patch('/', patchUser );

router.delete('/:id', deleteUser );

module.exports = router;