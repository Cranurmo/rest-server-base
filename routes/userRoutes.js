const { Router } = require('express');
const {check} = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido } = require('../helpers/db-validators')

const { usersGet,
     usersPut,
     usersPost,
     usersDelete,
     usersPatch } = require('../controllers/userController');

const router = Router();

router.get('/', usersGet);        

router.put('/:id', usersPut );   

router.post('/',
 
    [
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('password', 'El password es obligatorio y más de 6 letras').isLength({min:6}),
     check('correo', 'El correo no es valido').isEmail(),
     // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE', 'VENTAS_ROLE']),
     check('rol').custom( esRoleValido ),
     validarCampos
]
, usersPost);      

router.delete('/', usersDelete );  

router.patch('/', usersPatch);          


module.exports = router;

