const express = require('express')  //Llama a express en la app
const router = express.Router()     //Llama al router en la app
const infoPersonal = require('../models/infoPersonal')

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const infoPersonals = await infoPersonal.find()
    res.json(infoPersonals)
  } catch (err) {
    res.status(500).json({ message: err.message })  //El código 500 significa que hay un error en el
  }
})

// Obtener un usuario en específico
router.get('/:id', getInfoPersonal, (req, res) => {
  res.json(res.InfoPersonal)
})

// Crear un usuario
router.post('/', async (req, res) => {
  const InfoPersonal = new infoPersonal({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    edad: req.body.edad,
    trabajo: req.body.trabajo,
    direccion: req.body.direccion
  })
  try {
    const newSubscriber = await InfoPersonal.save()
    res.status(201).json(newSubscriber) //El código 201 signidica objeto creado exitosamente.
  } catch (err) {
    res.status(400).json({ message: err.message }) //El código 400 significa que el usuario nos dio
  }
})

// Actualizar un usuario en específico
router.patch('/:id', getInfoPersonal, async (req, res) => {
  if (req.body.nombre != null) {
    res.InfoPersonal.nombre = req.body.nombre
  }
  if (req.body.apellidos != null) {
    res.InfoPersonal.apellidos = req.body.apellidos
  }
  if (req.body.edad != null) {
    res.InfoPersonal.edad = req.body.edad
  }
  if (req.body.trabajo != null) {
    res.InfoPersonal.trabajo = req.body.trabajo
  }
  if (req.body.direccion != null) {
    res.InfoPersonal.direccion = req.body.direccion
  }
  try {
    const updatedSubscriber = await res.InfoPersonal.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message }) //El código 400 significa que no se pudo encontrar algo
  }
})

// Eliminar un usuario específico
router.delete('/:id', getInfoPersonal, async (req, res) => {
  try {
    await res.InfoPersonal.remove()
    res.json({ message: 'Deleted infoPersonal' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Se mueve al siguiente pedazo de código
async function getInfoPersonal(req, res, next) {
  let InfoPersonal
  try {
    InfoPersonal = await infoPersonal.findById(req.params.id)
    if (InfoPersonal == null) {
      return res.status(404).json({ message: 'Cannot find InfoPersonal' }) //El código 400 significa que no se pudo encontrar algo
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }) //Algo mal ocurrió con nuestro servidor
  }

  res.InfoPersonal = InfoPersonal
  next()
}

module.exports = router