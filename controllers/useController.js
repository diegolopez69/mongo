const findAllUsers = async (req, res) => {
    try {
      const infoPersonal = await infoPersonal.find()
      res.json(infoPersonal)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

export {
    findAllUsers
  }

  export default "ffff";