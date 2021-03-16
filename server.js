require('dotenv').config() //Nos conecta con el .env

const express = require('express')  //Da la libreria de express
const mongoose = require('mongoose') //Pedimos la libreria mongoose
const app = express()


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error)) //Si la conexión falla nos da el error
db.once('open', () => console.log('--> Conectado a la base de datos exitosamente')) //Si la conexión es exitosa nos dice que funcionó

app.use(express.json())

const infoPersonalRouter = require('./routes/infoPersonal')
app.use('/infoPersonal', infoPersonalRouter)

app.listen(3000, () => console.log('--> El servidor inicio exitosamente'))   //El puerto en el que correremos el proyecto