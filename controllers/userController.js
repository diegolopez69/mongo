 const findAllUsers = async (req, res) => {
    try {
      const subscribers = await infoPersonal.find()
      res.json(subscribers)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

export {
    findAllUsers
  }

  export default "ffff";


  