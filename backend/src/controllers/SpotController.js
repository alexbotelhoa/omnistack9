const Spot = require('../models/Spot')
const User = require('../models/User')
// const sharp = require('sharp')
// const path = require('path')
// const fs = require('fs')

module.exports = {
    async index(req, res) {
        const { tech } = req.query

        const spots = await Spot.find({ techs: tech })

        return res.json(spots)
    },

    async store(req, res) {
        const { company, price, techs } = req.body
        const { filename } = req.file
        const { user_id } = req.headers

        // await sharp(req.file.path)
        //     .resize(500)
        //     .jpeg({ quality: 70 })
        //     .toFile(
        //         path.resolve(req.file.destination, filename)
        //     )
        // fs.unlinkSync(req.file.path)

        const userExist = await User.findById(user_id)
        !userExist && res.status(400).json({ error: 'User not exist!!!' })

        const spot = await Spot.create({
            thumbnail: filename,
            company, 
            price, 
            techs: techs.split(',').map(tech => tech.trim()),
            user: user_id,
         })

        return res.json(spot)
    }
}