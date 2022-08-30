const { response } = require('express')

const usersGet = (req, res = response) => {

    const { q, nombre='noname', apikey, page = 10, limit } = req.query;

    res.json({
        msg: 'Get API from controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
  }

const usersPut = (req, res = response) => {
    const { id } = req.params

    res.status(400).json({
        msg: 'PUT API from controller',
        id
    });
  }

const usersPost =  (req, res = response) => {
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'POST API from controller',
        body:{
            nombre,
            edad
        }
    });
  }

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API from controller'
    });
  }

const usersPatch =  (req, res = response) => {
    res.json({
        msg: 'patch API from controller'
    });
  }

  module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
  }

