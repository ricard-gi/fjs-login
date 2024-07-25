const express = require('express');

//bcrypt es un modulo que nos permite encriptar en una dirección
const bcrypt = require('bcrypt');

const model = require('../models/index');
const Usuari = model.Usuari;

const jsonwebtoken = require('jsonwebtoken');
const Config = require('./config');

const { secretKey, expiredAfter } = Config;

const router = express.Router();

//get de tots els formats
router.get('/', (req, res, next) => {
  Usuari.findAll()
    .then(lista => res.status(200).json({ ok: true, data: lista }))
    .catch(err => res.status(400).json({ ok: false, error: err.parent.sqlMessage }));
});


router.post('/login', (req, res) => {
	const response = {};
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ ok: false, msg: "email o password no rebuts" });
  }

  Usuari.findOne({ where: { email } })
    .then((usuari) => {

      if (usuari && bcrypt.compareSync(password, usuari.password)) {
        return usuari;
      } else {
        throw "usuari/password invalids";
      }
    })
    .then(usuari => {
        response.token = jsonwebtoken.sign(
          {
            expiredAt: new Date().getTime() + expiredAfter,
            email,
            nom:usuari.nom,
            id: usuari.id,
          },
          secretKey
        );
        response.ok=true;
    res.json(response);
	})
  .catch(err => res.status(400).json({ ok: false, msg: err }))
	
});




/* POST registro de usuario */
router.post('/registre', function (req, res, next) {
  console.log("aqui estan les coses", req.body)
  
  const hash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hash;
  Usuari.create(req.body)
    .then(item => res.json({ ok: true, data: item }))
    .catch((error) => res.json({ ok: false, error }))
});




//obtener un registro
router.delete('/:id', (req, res, next) => {
  const idABuscar = req.params.id;

  Usuari.destroy({
    where: {
      id: idABuscar
    }
  })
    .then(lista => res.status(200).json({ ok: true }))
    .catch(err => res.status(400).json({ ok: false, error: err.parent.sqlMessage }));
});



module.exports = router;

