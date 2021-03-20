const { request, response } = require('express');

const getUser = (req = request, res = response ) => {

    const { page = 1, limit = 10, apikey } = req.query;

    res.json({
        msg: 'get API - controller',
        page,
        limit,
        apikey
    });
}

const postUser = (req, res = response ) => {

    const body = req.body;
    const { name, age } = req.body;

    res.json({
        msg: 'post API - controller',
        body,
        name,
        age
    });
}

const putUser = (req, res = response ) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controller',
        id
    });
}

const patchUser = (req, res = response ) => {

    res.json({
        msg: 'patch API - controller'
    });
}

const deleteUser = (req, res = response ) => {

    const id = req.params.id;

    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    getUser
    , postUser
    , putUser
    , patchUser
    , deleteUser
}