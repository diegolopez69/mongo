import express  from "express";
import {findAllUsers}  from "./../controllers/userController";
const router = express.Router()
const infoPersonal = require('../models/infoPersonal')


// Getting all
router.get('/', findAllUsers)

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

// Creating one
router.post('/', async (req, res) => {
  const subscriber = new infoPersonal({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    edad: req.body.edad
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.nombre != null) {
    res.subscriber.nombre = req.body.nombre
  }
  if (req.body.apellidos != null) {
    res.subscriber.apellidos = req.body.apellidos
  }
  if (req.body.edad != null) {
    res.subscriber.edad = req.body.edad
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = router