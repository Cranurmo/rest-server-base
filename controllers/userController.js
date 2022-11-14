const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario.js')

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

const usersPost =  async (req, res = response) => {


  const { nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol} );

  //Verificar si el correo existe
  const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
      return res.status(400).json({
        msg: 'Este correo ya está registrado'
      })
    }


  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt)

  // Guardar en BD
  await usuario.save();

  res.json({
    usuario
  })
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

