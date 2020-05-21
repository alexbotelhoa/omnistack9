const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const users = await User.find().sort('-createdAt')
        return res.json(users)
     },

    async create(req, res) {
        const { email } = req.body

        let user = await User.findOne({ email })
        if (!user) user = await User.create({ email })

        return res.json(user)
    }
}
