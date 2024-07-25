//importamos/requerimos express
const express = require('express');
const cors = require('cors');

//importamos los controladores que contienen las definiciones de las rutas
const usuariController = require('./routes/usuari-controller');
const indexController = require('./routes/index-controller');

//creamos una nueva aplicación express
const app = express();


app.use(express.json()); //necesario para poder recibir datos en json
app.use(cors()); //evita problemas al conectar desde otro servidor

//ruta estática para imágenes
app.use("/img", express.static('uploads'));


app.get('/', function (req, res, next) {
    res.send("Login API")
});

//las ruta "/" se gestiona en indexController
app.use('/api', indexController);
app.use('/api/usuari', usuariController);

//arranque del servidor
const port = 3030
app.listen(port, () => console.log(`Express en puerto ${port}!`))
