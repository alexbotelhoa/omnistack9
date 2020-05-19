module.exports = {
    index(req, res) {
        const teste = {
            teste: 'teste'
        }

        return res.json(teste)
    }
}