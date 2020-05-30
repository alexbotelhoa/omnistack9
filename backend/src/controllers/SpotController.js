const Spot = require('../models/Spot')
const User = require('../models/User')

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
    },

    async delete(req, res) {
        const { spot_id } = req.params;
        const user_id = req.headers.authorization;

        await Spot.deleteOne({ 
            _id: spot_id,
            user: user_id
         }, function (err) {
            if (err) return handleError(err);
          });

        return res.status(204).send();
    }
}